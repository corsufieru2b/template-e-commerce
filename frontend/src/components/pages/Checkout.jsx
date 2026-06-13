/**
 * CHECKOUT PAGE
 * 
 * Tunnel de commande:
 * - Adresse de livraison
 * - Récapitulatif du panier
 * - Confirmation et paiement (stub)
 */

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { apiClient } from '../../utils/apiClient';
import brandingConfig from '../../config/branding.json';
import '../../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useContext(CartContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    zipCode: '',
    city: '',
    country: 'France'
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [consent, setConsent] = useState(false);

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isAuthenticated) {
      setError('Vous devez être connecté pour commander');
      setLoading(false);
      return;
    }

    if (items.length === 0) {
      setError('Votre panier est vide');
      setLoading(false);
      return;
    }

    if (!consent) {
      setError('Vous devez accepter les conditions de vente et la politique de confidentialite');
      setLoading(false);
      return;
    }

    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          selectedOptions: item.selectedOptions || null
        })),
        shippingAddress,
        paymentMethod
      };

      if (paymentMethod === 'credit_card') {
        const paymentSession = await apiClient.createStripeCheckoutSession({
          items: orderData.items,
          shippingAddress: orderData.shippingAddress
        });

        if (!paymentSession.checkoutUrl) {
          throw new Error('Impossible d initialiser le paiement Stripe');
        }

        window.location.href = paymentSession.checkoutUrl;
        return;
      }

      const response = await apiClient.createOrder(orderData);
      localStorage.setItem('lastOrder', JSON.stringify(response.order));
      clearCart();
      navigate('/order-confirmation', {
        state: {
          order: response.order,
          shippingAddress,
          paymentMethod
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const total = Number(getTotal());
  const freeShippingThreshold = brandingConfig.shipping?.freeShippingThreshold || 100;
  const shippingCost = total >= freeShippingThreshold ? 0 : (brandingConfig.shipping?.defaultCost || 9.99);
  const taxAmount = total * 0.2;
  const grandTotal = (total + taxAmount + shippingCost).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h1>Finaliser votre commande</h1>
          <div className="empty-checkout">
            <p>Votre panier est vide. Ajoutez des produits avant de passer commande.</p>
            <Link to="/products" className="btn btn-primary">Voir les produits</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Finaliser votre commande</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="checkout-container">
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Adresse de livraison</h2>

            <div className="form-group">
              <label>Rue</label>
              <input
                type="text"
                name="street"
                value={shippingAddress.street}
                onChange={handleAddressChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Code postal</label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleAddressChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ville</label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>

            <h2>Méthode de paiement</h2>

            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Carte bancaire
              </label>

              <label>
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal
              </label>

              <label>
                <input
                  type="radio"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Virement bancaire
              </label>
            </div>

            <p className="payment-note">
              Paiement en mode demonstration. Vous pouvez connecter Stripe ou PayPal ensuite sans changer ce tunnel.
            </p>

            <label className="checkout-consent" htmlFor="checkout-consent">
              <input
                id="checkout-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                J'accepte les <Link to="/cgv">CGV</Link> et la <Link to="/confidentialite">politique de confidentialite</Link>.
              </span>
            </label>

            <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
              {loading ? 'Traitement...' : 'Confirmer la commande'}
            </button>

            {!isAuthenticated && (
              <p className="checkout-login-note">
                Vous avez deja un compte ? <Link to="/login">Connectez-vous</Link> pour finaliser plus vite.
              </p>
            )}
          </form>

          {/* Résumé */}
          <div className="checkout-summary">
            <h2>Résumé du panier</h2>

            <div className="summary-items">
              {items.map((item) => (
                <div key={item.productId} className="summary-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{(item.price * item.quantity)?.toFixed(2)} €</span>
                </div>
              ))}
            </div>

            <div className="summary-breakdown">
              <div className="breakdown-row">
                <span>Sous-total</span>
                <span>{total} €</span>
              </div>
              <div className="breakdown-row">
                <span>Frais de port</span>
                <span>{shippingCost.toFixed(2)} €</span>
              </div>
              <div className="breakdown-row">
                <span>TVA (20%)</span>
                <span>{taxAmount?.toFixed(2)} €</span>
              </div>
              <div className="breakdown-row total">
                <span>TOTAL</span>
                <span>{grandTotal} €</span>
              </div>
            </div>

            <div className="checkout-trust">
              <p>Livraison offerte des {freeShippingThreshold.toFixed(2)} €</p>
              <p>Retours sous 14 jours</p>
              <p>Support client 5j/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
