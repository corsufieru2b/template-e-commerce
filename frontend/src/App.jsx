/**
 * MAIN APP COMPONENT - Routing principal
 * 
 * Structure:
 * - Layout (Header, Footer)
 * - Routes publiques (Accueil, Produits, etc.)
 * - Routes protégées (Panier, Commandes)
 * - Routes admin
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import ProductDetail from './components/pages/ProductDetail';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import OrderConfirmation from './components/pages/OrderConfirmation';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import LegalNotice from './components/pages/LegalNotice';
import Terms from './components/pages/Terms';
import Privacy from './components/pages/Privacy';
import Contact from './components/pages/Contact';
import ShippingReturnsFaq from './components/pages/ShippingReturnsFaq';
import AdminDashboard from './components/admin/Dashboard';
import AdminProducts from './components/admin/Products';
import AdminOrders from './components/admin/Orders';
import { Navigate } from 'react-router-dom';
import './styles/App.css';
import brandingConfig from './config/branding.json';

function App() {
  useEffect(() => {
    // Appliquer le branding global
    document.documentElement.style.setProperty('--primary-color', brandingConfig.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', brandingConfig.colors.secondary);
    document.documentElement.style.setProperty('--accent-color', brandingConfig.colors.accent);
    document.title = brandingConfig.storeName;
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/mentions-legales" element={<LegalNotice />} />
                <Route path="/cgv" element={<Terms />} />
                <Route path="/confidentialite" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/livraison-retours-faq" element={<ShippingReturnsFaq />} />

                {/* Compatibilité anciennes URLs */}
                <Route path="/terms" element={<Navigate to="/cgv" replace />} />
                <Route path="/privacy" element={<Navigate to="/confidentialite" replace />} />
                <Route path="/faq" element={<Navigate to="/livraison-retours-faq" replace />} />

                {/* Routes admin */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
