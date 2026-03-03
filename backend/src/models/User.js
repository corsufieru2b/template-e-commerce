/**
 * USER MODEL - Schéma Mongoose
 * 
 * Données utilisateur stockées dans MongoDB
 * - Email unique
 * - Mot de passe hashé (bcrypt)
 * - Rôle (user/admin)
 * - Adresses de livraison
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide']
  },

  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Minimum 6 caractères'],
    select: false // N'inclure le password que si explicitement demandé
  },

  firstName: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true
  },

  lastName: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  phone: {
    type: String,
    default: null
  },

  addresses: [{
    type: String,
    name: String, // "Domicile", "Bureau", etc.
    street: String,
    zipCode: String,
    city: String,
    country: { type: String, default: 'France' },
    isDefault: { type: Boolean, default: false }
  }],

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

/**
 * Middleware Mongoose - Hash le mot de passe avant save
 * Exécuté uniquement quand le mot de passe est modifié
 */
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Méthode d'instance - Comparer les mots de passe
 * Utilisée lors de la connexion
 */
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
