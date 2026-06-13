import React from 'react';
import { Link } from 'react-router-dom';
import brandingConfig from '../../config/branding.json';
import '../../styles/InfoPages.css';

const ShippingReturnsFaq = () => {
  return (
    <div className="info-page">
      <div className="info-page__container">
        <header className="info-page__header">
          <h1 className="info-page__title">Livraison, retours et FAQ</h1>
          <p className="info-page__intro">
            Toutes les informations pratiques pour commander sereinement.
          </p>
        </header>

        <article className="info-page__card">
          <section className="info-page__section">
            <h2>Livraison</h2>
            <ul className="info-page__list">
              <li>Livraison standard a partir de {brandingConfig.shipping?.defaultCost || 9.99} EUR.</li>
              <li>Livraison offerte des {brandingConfig.shipping?.freeShippingThreshold || 100} EUR d'achat.</li>
              <li>Preparation sous 24h a 48h ouvrees.</li>
            </ul>
          </section>

          <section className="info-page__section">
            <h2>Retours</h2>
            <ul className="info-page__list">
              <li>Delai de retour de 14 jours apres reception.</li>
              <li>Produit non utilise, dans son emballage d'origine.</li>
              <li>Remboursement sous 5 a 10 jours apres validation.</li>
            </ul>
          </section>

          <section className="info-page__section">
            <h2>FAQ</h2>
            <ul className="info-page__list">
              <li>Comment suivre ma commande ? Un email de suivi est envoye apres expedition.</li>
              <li>Puis-je modifier ma commande ? Oui, tant qu'elle n'est pas preparee.</li>
              <li>Quels moyens de paiement sont acceptes ? Carte, PayPal et virement.</li>
            </ul>
          </section>

          <div className="info-page__actions">
            <Link className="btn btn-primary" to="/contact">Contacter le support</Link>
            <Link className="btn btn-secondary" to="/cgv">Voir les CGV</Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ShippingReturnsFaq;
