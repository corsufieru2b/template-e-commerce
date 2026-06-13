/**
 * HEADER COMPONENT
 * 
 * Navigation principale
 * - Logo/Branding
 * - Menu de navigation
 * - Icône panier
 * - Lien login/profil
 */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import CartDrawer from './CartDrawer';
import CartToast from './CartToast';
import '../../styles/Header.css';
import brandingConfig from '../../config/branding.json';

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const { getTotalQuantity, toggleCart } = useContext(CartContext);

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>{brandingConfig.storeName}</h1>
          </Link>

          {/* Navigation */}
          <nav className="nav">
            <Link to="/products">Produits</Link>
            <Link to="/livraison-retours-faq">Livraison & retours</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {/* Panier */}
            <button type="button" className="cart-link" onClick={toggleCart}>
              <span aria-hidden="true">🛒</span>
              <span className="cart-link__label">Panier</span>
              {getTotalQuantity() > 0 && (
                <span className="cart-badge">{getTotalQuantity()}</span>
              )}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">{user?.firstName}</span>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="admin-link">Admin</Link>
                )}
                <button onClick={logout} className="logout-btn">Déconnexion</button>
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="btn-secondary">Connexion</Link>
                <Link to="/register" className="btn-primary">Inscription</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <CartDrawer />
      <CartToast />
    </>
  );
};

export default Header;
