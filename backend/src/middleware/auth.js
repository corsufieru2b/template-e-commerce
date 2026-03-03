/**
 * AUTHENTICATION MIDDLEWARE
 * 
 * Protège les routes qui nécessitent une authentification
 * - Extraction du JWT du header Authorization
 * - Vérification de la signature
 * - Injection de l'utilisateur dans req.user
 */

import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Authentification requise',
        message: 'Token manquant'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token invalide ou expiré',
      message: error.message
    });
  }
};

/**
 * ADMIN MIDDLEWARE
 * 
 * Protège les routes admin
 * Doit être utilisé APRÈS authMiddleware
 */
export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Accès refusé',
      message: 'Vous n\'avez pas les droits administrateur'
    });
  }
  next();
};

/**
 * OPTIONAL AUTH MIDDLEWARE
 * 
 * Charge l'utilisateur s'il est authentifié, sinon continue
 * Utile pour les routes publiques mais avec données perso si connecté
 */
export const optionalAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    }
  } catch (error) {
    // Ignorer les erreurs et continuer sans utilisateur
  }
  next();
};
