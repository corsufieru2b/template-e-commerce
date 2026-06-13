import express from 'express';
import Stripe from 'stripe';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';
import { sendEmail } from '../utils/mailer.js';

const router = express.Router();

const getStripeClient = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};

const buildOrderNumber = () => {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(5, '0');
  return `CMD-${dateStr}-${randomNum}`;
};

router.post('/stripe/checkout-session', authMiddleware, async (req, res, next) => {
  try {
    const stripe = getStripeClient();
    if (!stripe) {
      return res.status(500).json({
        error: 'Stripe non configure. Ajoutez STRIPE_SECRET_KEY.'
      });
    }

    const { items, shippingAddress } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Panier vide' });
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.zipCode) {
      return res.status(400).json({ error: 'Adresse de livraison incomplete' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouve' });
    }

    let subtotal = 0;
    const orderItems = [];
    const stripeLineItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || !product.isActive) {
        return res.status(404).json({ error: `Produit non trouve: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Stock insuffisant pour ${product.name}` });
      }

      const quantity = Number(item.quantity || 0);
      const unitAmount = Math.round(product.price * 100);
      const itemSubtotal = product.price * quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity,
        selectedOptions: item.selectedOptions || null,
        subtotal: itemSubtotal
      });

      stripeLineItems.push({
        price_data: {
          currency: 'eur',
          unit_amount: unitAmount,
          product_data: {
            name: product.name
          }
        },
        quantity
      });
    }

    const shippingCost = 9.99;
    const taxAmount = subtotal * 0.2;
    const total = subtotal + shippingCost + taxAmount;

    const order = await Order.create({
      orderNumber: buildOrderNumber(),
      customer: {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      },
      items: orderItems,
      shippingAddress,
      pricing: {
        subtotal,
        shippingCost,
        taxAmount,
        total
      },
      paymentMethod: 'credit_card',
      paymentProvider: 'stripe',
      paymentStatus: 'pending',
      status: 'pending'
    });

    if (shippingCost > 0) {
      stripeLineItems.push({
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(shippingCost * 100),
          product_data: { name: 'Frais de livraison' }
        },
        quantity: 1
      });
    }

    if (taxAmount > 0) {
      stripeLineItems.push({
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(taxAmount * 100),
          product_data: { name: 'TVA (20%)' }
        },
        quantity: 1
      });
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      line_items: stripeLineItems,
      success_url: `${frontendUrl}/order-confirmation?orderId=${order._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/checkout?payment=cancelled`,
      metadata: {
        orderId: String(order._id),
        userId: String(user._id)
      }
    });

    order.paymentSessionId = session.id;
    await order.save();

    res.status(200).json({
      checkoutUrl: session.url,
      sessionId: session.id,
      orderId: order._id
    });
  } catch (error) {
    next(error);
  }
});

router.post('/stripe/confirm', authMiddleware, async (req, res, next) => {
  try {
    const stripe = getStripeClient();
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe non configure' });
    }

    const { orderId, sessionId } = req.body;

    if (!orderId || !sessionId) {
      return res.status(400).json({ error: 'orderId et sessionId sont requis' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Commande non trouvee' });
    }

    if (String(order.customer.userId) !== req.user.userId) {
      return res.status(403).json({ error: 'Acces refuse' });
    }

    if (order.paymentStatus === 'confirmed') {
      return res.status(200).json({
        message: 'Paiement deja confirme',
        order: {
          id: order._id,
          orderNumber: order.orderNumber,
          status: order.status,
          total: order.pricing.total
        }
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Paiement non confirme' });
    }

    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (!product || !product.isActive) {
        return res.status(400).json({ error: `Produit indisponible: ${item.productName}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Stock insuffisant pour ${item.productName}` });
      }
    }

    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
    }

    order.paymentStatus = 'confirmed';
    order.status = 'confirmed';
    await order.save();

    await sendEmail({
      to: order.customer.email,
      subject: `Commande confirmee ${order.orderNumber}`,
      text: `Merci pour votre commande ${order.orderNumber}. Montant: ${order.pricing.total.toFixed(2)} EUR.`,
      html: `<p>Merci pour votre commande <strong>${order.orderNumber}</strong>.</p><p>Montant total: <strong>${order.pricing.total.toFixed(2)} EUR</strong>.</p>`
    });

    res.status(200).json({
      message: 'Paiement confirme',
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.pricing.total
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
