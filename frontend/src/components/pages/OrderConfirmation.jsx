import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import brandingConfig from '../../config/branding.json';
import '../../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const stateOrder = location.state?.order;
  const savedOrder = localStorage.getItem('lastOrder');
  const fallbackOrder = savedOrder ? JSON.parse(savedOrder) : null;
  const order = stateOrder || fallbackOrder;

  return (
    <div className="order-confirmation">
      <div className="order-confirmation__container">
        <article className="order-confirmation__card">
          <div className="order-confirmation__status">
            <div className="order-confirmation__badge">OK</div>
            <div>
              <h1 className="order-confirmation__title">Commande confirmee</h1>
              <p className="order-confirmation__subtitle">
                Merci pour votre confiance. Votre commande est bien enregistree.
              </p>
            </div>
          </div>

          <section className="order-confirmation__summary">
            <div className="order-confirmation__row">
              <span>Numero de commande</span>
              <strong>{order?.orderNumber || 'En cours de generation'}</strong>
            </div>
            <div className="order-confirmation__row">
              <span>Total</span>
              <strong>{order?.total?.toFixed ? order.total.toFixed(2) : order?.total || '--'} EUR</strong>
            </div>
            <div className="order-confirmation__row">
              <span>Statut</span>
              <strong>{order?.status || 'pending'}</strong>
            </div>
            <div className="order-confirmation__row">
              <span>Support client</span>
              <strong>{brandingConfig.contact.email}</strong>
            </div>
          </section>

          <section className="order-confirmation__next">
            <h2>Prochaines etapes</h2>
            <ul>
              <li>Vous recevez un email de confirmation avec le recapitulatif.</li>
              <li>Un email de suivi est envoye a l'expedition du colis.</li>
              <li>Besoin d'aide ? Notre support est disponible du lundi au vendredi.</li>
            </ul>
          </section>

          <div className="order-confirmation__actions">
            <Link className="btn btn-primary" to="/products">Continuer mes achats</Link>
            <Link className="btn btn-secondary" to="/contact">Contacter le support</Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderConfirmation;
