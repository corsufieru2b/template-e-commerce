/**
 * ADMIN ROUTES - Dashboard Admin
 * 
 * Toutes les routes sont protégées (authMiddleware + adminMiddleware)
 * 
 * PRODUITS:
 * POST   /api/admin/products      - Créer
 * GET    /api/admin/products      - Tous
 * PUT    /api/admin/products/:id  - Modifier
 * DELETE /api/admin/products/:id  - Supprimer
 * 
 * COMMANDES:
 * GET    /api/admin/orders        - Toutes les commandes
 * PUT    /api/admin/orders/:id    - Modifier le statut
 * 
 * STATISTIQUES:
 * GET    /api/admin/stats         - Statistiques de vente
 */

import express from 'express';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Appliquer les middlewares d'auth et admin à toutes les routes
router.use(authMiddleware);
router.use(adminMiddleware);

// ==================== PRODUCTS ====================

/**
 * CREATE PRODUCT
 */
router.post('/products', async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      message: 'Produit créé',
      product
    });
  } catch (error) {
    next(error);
  }
});

/**
 * CREATE USER (Admin only)
 * POST /api/admin/users
 */
router.post('/users', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role = 'user' } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Role invalide' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    const user = new User({ email, password, firstName, lastName, role });
    await user.save();

    res.status(201).json({
      message: 'Utilisateur créé',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET ALL PRODUCTS (Admin view)
 */
router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      products,
      total: products.length
    });
  } catch (error) {
    next(error);
  }
});

/**
 * UPDATE PRODUCT
 */
router.put('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        error: 'Produit non trouvé'
      });
    }

    res.status(200).json({
      message: 'Produit mis à jour',
      product
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE PRODUCT
 */
router.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: 'Produit non trouvé'
      });
    }

    res.status(200).json({
      message: 'Produit supprimé'
    });
  } catch (error) {
    next(error);
  }
});

// ==================== ORDERS ====================

/**
 * GET ALL ORDERS
 */
router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Order
      .find({})
      .sort({ createdAt: -1 })
      .populate('items.productId', 'name');

    res.status(200).json({
      orders,
      total: orders.length
    });
  } catch (error) {
    next(error);
  }
});

/**
 * UPDATE ORDER STATUS
 * Body: { status: 'shipped' }
 */
router.put('/orders/:id', async (req, res, next) => {
  try {
    const { status, notes, trackingNumber } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status,
        ...(notes && { notes }),
        ...(trackingNumber && { trackingNumber })
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        error: 'Commande non trouvée'
      });
    }

    res.status(200).json({
      message: 'Commande mise à jour',
      order
    });
  } catch (error) {
    next(error);
  }
});

// ==================== STATISTICS ====================

/**
 * GET DASHBOARD STATISTICS
 */
router.get('/stats', async (req, res, next) => {
  try {
    // Total des commandes
    const totalOrders = await Order.countDocuments();

    // Commandes du mois
    const currentMonth = new Date();
    currentMonth.setDate(1);
    const ordersThisMonth = await Order.countDocuments({
      createdAt: { $gte: currentMonth }
    });

    // Chiffre d'affaires total
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$pricing.total' }
        }
      }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // Commandes par statut
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Top produits vendus
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.subtotal' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      totalOrders,
      ordersThisMonth,
      totalRevenue: totalRevenue.toFixed(2),
      ordersByStatus,
      topProducts
    });
  } catch (error) {
    next(error);
  }
});

export default router;
