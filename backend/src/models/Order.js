/**
 * ORDER MODEL - Schéma Mongoose
 * 
 * Commandes passées par les clients
 * Statuts : pending, confirmed, shipped, delivered, cancelled
 * Traçabilité complète du panier et prix
 */

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
    // Généré automatiquement: "CMD-20260303-00001"
  },

  customer: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: String
  },

  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    selectedOptions: {
      type: Object,
      default: null
    },
    subtotal: Number
  }],

  shippingAddress: {
    street: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, default: 'France', required: true }
  },

  pricing: {
    subtotal: { type: Number, required: true },
    shippingCost: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },

  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer'],
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending'
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },

  notes: String,
  trackingNumber: String,

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
