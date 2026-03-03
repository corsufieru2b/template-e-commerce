/**
 * PRODUCT MODEL - Schéma Mongoose
 * 
 * Produits commercialisés dans la boutique
 * - Informations de base (nom, description, prix)
 * - Gestion du stock
 * - Images et catégories
 * - SEO et métadonnées
 */

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom du produit est requis'],
    trim: true,
    maxlength: [100, 'Maximum 100 caractères']
  },

  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true
  },

  price: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: [0, 'Le prix minimum est 0'],
    // Format: 9.99 ou 99.99
    set: function(value) {
      return parseFloat(value.toFixed(2));
    }
  },

  originalPrice: {
    type: Number,
    default: null,
    set: function(value) {
      return value ? parseFloat(value.toFixed(2)) : null;
    }
  },

  discount: {
    type: Number,
    default: 0,
    // Pourcentage de réduction
    min: 0,
    max: 100
  },

  sku: {
    type: String,
    unique: true,
    sparse: true,
    required: [true, 'Le SKU est requis']
  },

  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['électronique', 'vêtements', 'maison', 'beauté', 'sport', 'livres', 'autre']
  },

  stock: {
    type: Number,
    required: [true, 'Le stock est requis'],
    min: [0, 'Le stock ne peut pas être négatif'],
    default: 0
  },

  images: [{
    url: { type: String, required: true },
    alt: { type: String, default: null },
    isPrimary: { type: Boolean, default: false }
  }],

  specifications: [{
    key: String,
    value: String
  }],

  ratings: {
    average: { type: Number, min: 0, max: 5, default: 0 },
    count: { type: Number, default: 0 }
  },

  isActive: {
    type: Boolean,
    default: true
  },

  isFeatured: {
    type: Boolean,
    default: false
  },

  // SEO
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index pour la recherche
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ sku: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
