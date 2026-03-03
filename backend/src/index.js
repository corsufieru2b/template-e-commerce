/**
 * BACKEND SERVER - Express.js Server Entry Point
 * 
 * Architecture Modulaire :
 * - Connexion à la base de données MongoDB
 * - Configuration CORS pour le frontend
 * - Chargement des routes API
 * - Gestion des erreurs globales
 * - Variables d'environnement centralisées
 * 
 * Sécurité :
 * - CORS limité au frontend
 * - Headers de sécurité
 * - Validation des requêtes
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import adminRoutes from './routes/admin.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';

// Charger les variables d'environnement
dotenv.config();

// Initialiser Express
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================

// Logger toutes les requêtes
app.use(requestLogger);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS - Configuration pour le frontend
const corsOptions = process.env.NODE_ENV === 'development' ? {
  origin: true, // allow any origin in development (for LAN testing)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
} : {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Headers de sécurité
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// ==================== ROUTES ====================

// Routes publiques
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Routes admin (protégées)
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// ==================== ERROR HANDLING ====================

// Route 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint non trouvé',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use(errorHandler);

// ==================== SERVER STARTUP ====================

/**
 * Démarrer le serveur avec connexion à la base de données
 * 
 * Logique :
 * 1. Connecter MongoDB
 * 2. Écouter sur le port
 * 3. Logs de démarrage
 */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════╗
    ║   🚀 ECOMMERCE API RUNNING            ║
    ║   Port: ${PORT}                          ║
    ║   Environment: ${process.env.NODE_ENV}           ║
    ║   URL: http://localhost:${PORT}       ║
    ╚═══════════════════════════════════════╝
    `);
  });
}).catch((err) => {
  console.error('Erreur au démarrage du serveur:', err);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutdown service gracieusement...');
  process.exit(0);
});

export default app;
