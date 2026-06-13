/**
 * ORDERS ROUTES
 * 
 * POST /api/orders      - Créer une commande
 * GET  /api/orders      - Mes commandes (user)
 * GET  /api/orders/:id  - Détail d'une commande
 */

import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * GET MY ORDERS
 * Requiert : Bearer token
 */
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const orders = await Order
      .find({ 'customer.userId': req.user.userId })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      orders,
      total: orders.length
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET ORDER DETAIL
 */
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: 'Commande non trouvée'
      });
    }

    // Vérifier que l'utilisateur est propriétaire de la commande
    if (order.customer.userId.toString() !== req.user.userId) {
      return res.status(403).json({
        error: 'Accès refusé'
      });
    }

    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
});

/**
 * CREATE ORDER
 * 
 * Body:
 * {
 *   items: [{ productId, quantity }],
 *   shippingAddress: { street, zipCode, city, country },
 *   paymentMethod: 'credit_card'
 * }
 */
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Validations
    if (!items || items.length === 0) {
      return res.status(400).json({
        error: 'Panier vide'
      });
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({
        error: 'Adresse de livraison incomplète'
      });
    }

    // Vérifier que les produits existent et sont en stock
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product || !product.isActive) {
        return res.status(404).json({
          error: `Produit non trouvé: ${item.productId}`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Stock insuffisant pour ${product.name}`
        });
      }

      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;

      orderItems.push({
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        selectedOptions: item.selectedOptions || null,
        subtotal: itemSubtotal
      });
    }

    // Calculs taxes et frais
    const shippingCost = 9.99;
    const taxRate = 0.20; // TVA 20%
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount + shippingCost;

    // Récupérer l'utilisateur
    const user = await require('../models/User.js').default.findById(req.user.userId);

    // Générer numéro de commande
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(5, '0');
    const orderNumber = `CMD-${dateStr}-${randomNum}`;

    // Créer la commande
    const order = new Order({
      orderNumber,
      customer: {
        userId: req.user.userId,
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
      paymentMethod,
      status: 'pending'
    });

    await order.save();

    // Réduire le stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } }
      );
    }

    res.status(201).json({
      message: 'Commande créée avec succès',
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
