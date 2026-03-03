/**
 * DATABASE CONFIGURATION
 * 
 * Gère la connexion à MongoDB
 * Support de MongoDB local et MongoDB Atlas (cloud)
 * Reconnexion automatique et gestion d'erreurs
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    console.log('✅ MongoDB connecté avec succès');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    
    // Retry après 5 secondes
    setTimeout(() => {
      console.log('🔄 Tentative de reconnexion...');
      connectDB();
    }, 5000);
    
    throw error;
  }
};

export default connectDB;
