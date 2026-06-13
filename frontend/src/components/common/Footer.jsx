/**
 * FOOTER COMPONENT
 * 
 * Pied de page
 * - Infos de contact
 * - Liens légaux
 * - Réseaux sociaux
 * - Copyright
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';
import brandingConfig from '../../config/branding.json';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>A propos</h3>
          <p>{brandingConfig.storeName}</p>
          <p>{brandingConfig.contact.address}</p>
          <p>{brandingConfig.contact.email}</p>
          <p>{brandingConfig.contact.phone}</p>
        </div>

        <div className="footer-section">
          <h3>Boutique</h3>
          <ul>
            <li>
              <Link to="/products">Produits</Link>
            </li>
            <li>
              <Link to="/cart">Panier</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Aide client</h3>
          <ul>
            <li>
              <Link to="/livraison-retours-faq">Livraison, retours, FAQ</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/cgv">CGV</Link>
            </li>
            <li>
              <Link to="/confidentialite">Confidentialite</Link>
            </li>
            <li>
              <Link to="/mentions-legales">Mentions legales</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Confiance</h3>
          <ul className="trust-list">
            <li>Paiement securise SSL</li>
            <li>Livraison suivie</li>
            <li>Retours sous 14 jours</li>
            <li>Support client reactif</li>
          </ul>

          <h3 className="social-title">Nous suivre</h3>
          <div className="social-links">
            <a href={brandingConfig.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={brandingConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={brandingConfig.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {brandingConfig.storeName}. Tous droits reserves.
          SIRET: {brandingConfig.companyInfo?.siret || 'A renseigner'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
