/**
 * CHECKOUT PAGE
 * 
 * Tunnel de commande:
 * - Adresse de livraison
 * - Récapitulatif du panier
 * - Confirmation et paiement (stub)
 */

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { apiClient } from '../../utils/apiClient';
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

    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingAddress,
        paymentMethod
      };

      await apiClient.createOrder(orderData);
      clearCart();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const total = getTotal();
  const shippingCost = 9.99;
  const taxAmount = total * 0.2;
  const grandTotal = (parseFloat(total) * 1.2 + shippingCost).toFixed(2);

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
              💳 Payment processing is in stub mode for demonstration. Complete your order to continue.
            </p>

            <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
              {loading ? 'Traitement...' : 'Confirmer la commande'}
            </button>
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
                <span>{shippingCost} €</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
