/**
 * PRODUCTS ROUTES - Front Office (Public)
 * 
 * GET /api/products           - Tous les produits (avec filtres)
 * GET /api/products/:id       - Un produit en détail
 * GET /api/products/search    - Recherche produits
 */

import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

/**
 * GET ALL PRODUCTS avec filtres
 * 
 * Query params:
 * - category: string
 * - priceMin: number
 * - priceMax: number
 * - page: number (default: 1)
 * - limit: number (default: 12)
 * - sort: string (default: -createdAt)
 */
router.get('/', async (req, res, next) => {
  try {
    const {
      category,
      priceMin,
      priceMax,
      q,
      page = 1,
      limit = 12,
      sort = 'newest'
    } = req.query;

    // Construire le filtre
    const filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = parseFloat(priceMin);
      if (priceMax) filter.price.$lte = parseFloat(priceMax);
    }

    if (q && String(q).trim().length >= 2) {
      filter.$text = { $search: String(q).trim() };
    }

    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating_desc: { 'ratings.average': -1 },
      best_sellers: { isFeatured: -1, 'ratings.count': -1 }
    };

    const safeSort = sortMap[sort] || sortMap.newest;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Requête
    const products = await Product
      .find(filter)
      .sort(safeSort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-specifications -seoKeywords'); // Exclure les champs volumineux

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      pagination: {
        current: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * SEARCH PRODUCTS
 * Query: q=string
 */
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({
        error: 'Requête de recherche trop courte (min: 2 caractères)'
      });
    }

    const products = await Product
      .find({ $text: { $search: q }, isActive: true })
      .select('-specifications')
      .limit(20);

    res.status(200).json({
      query: q,
      results: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET SINGLE PRODUCT
 */
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({
        error: 'Produit non trouvé'
      });
    }

    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
});

export default router;
