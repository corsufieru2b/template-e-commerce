/**
 * JWT UTILITIES
 * 
 * Génération et gestion des JWT (JSON Web Tokens)
 * Utilisés pour l'authentification stateless
 */

import jwt from 'jsonwebtoken';

/**
 * Générer un JWT
 * @param {Object} payload - Données à encoder (userId, role, email)
 * @returns {string} Token JWT
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

/**
 * Vérifier un JWT
 * @param {string} token - Token à vérifier
 * @returns {Object} Payload décodé
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error(`Token invalide: ${error.message}`);
  }
};
