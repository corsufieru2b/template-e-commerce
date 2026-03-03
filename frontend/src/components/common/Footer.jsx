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
import '../../styles/Footer.css';
import brandingConfig from '../../config/branding.json';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>À Propos</h3>
          <p>{brandingConfig.storeName}</p>
          <p>{brandingConfig.contact.address}</p>
          <p>{brandingConfig.contact.email}</p>
        </div>

        <div className="footer-section">
          <h3>Liens Utiles</h3>
          <ul>
            <li><a href="#produits">Produits</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#conditions">Conditions d'utilisation</a></li>
            <li><a href="#privacy">Politique de confidentialité</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Nous Suivre</h3>
          <div className="social-links">
            <a href={brandingConfig.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={brandingConfig.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={brandingConfig.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {brandingConfig.storeName}. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
