/**
 * AUTHENTICATION ROUTES
 * 
 * POST /api/auth/register - Créer un compte
 * POST /api/auth/login    - Connexion
 * POST /api/auth/logout   - Déconnexion (frontend)
 * GET  /api/auth/me       - Données utilisateur actuel
 */

import express from 'express';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * REGISTER - Créer un nouvel utilisateur
 * 
 * Logique :
 * 1. Valider les données
 * 2. Créer l'utilisateur (mot de passe hashé auto)
 * 3. Générer JWT
 * 4. Retourner token
 */
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, passwordConfirm, firstName, lastName } = req.body;

    // Validations
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        error: 'Tous les champs sont requis'
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        error: 'Les mots de passe ne correspondent pas'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Minimum 6 caractères pour le mot de passe'
      });
    }

    // Créer l'utilisateur - FORCER le rôle 'user' pour les enregistrements publics
    // Ne pas permettre la création d'admins via ce endpoint public
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      role: 'user'
    });

    await user.save();

    // Générer token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    res.status(201).json({
      message: 'Compte créé avec succès',
      token,
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
 * LOGIN - Connexion utilisateur
 * 
 * Logique :
 * 1. Vérifier email/password
 * 2. Générer JWT
 * 3. Retourner token
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email et mot de passe requis'
      });
    }

    // Fetch user avec password (field: select: false par défaut)
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        error: 'Email ou mot de passe incorrect'
      });
    }

    // Comparer passwords
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Email ou mot de passe incorrect'
      });
    }

    // Générer token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    res.status(200).json({
      message: 'Connexion réussie',
      token,
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
 * GET ME - Récupérer les données de l'utilisateur connecté
 * Requiert : Bearer token
 */
router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        error: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        addresses: user.addresses,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
