/**
 * CART PAGE
 * 
 * Affiche:
 * - Panier complet
 * - Résumé du total
 * - Bouton Checkout
 */

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import brandingConfig from '../../config/branding.json';
import '../../styles/Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const subtotal = Number(getTotal());
  const freeShippingThreshold = brandingConfig.shipping?.freeShippingThreshold || 100;
  const defaultShipping = brandingConfig.shipping?.defaultCost || 9.99;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : defaultShipping;
  const taxAmount = subtotal * 0.2;
  const totalWithTaxAndShipping = subtotal + taxAmount + shippingCost;

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Votre Panier</h1>
          <div className="empty-cart">
            <p>Votre panier est vide</p>
            <Link to="/products" className="btn btn-primary">
              Continuer vos achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Votre Panier</h1>

        <div className="cart-container">
          {/* Items */}
          <div className="cart-items">
            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Sous-total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.itemKey || item.productId}>
                    <td>
                      <div className="item-name">
                        {item.image && <img src={item.image} alt={item.name} />}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{item.price?.toFixed(2)} €</td>
                    <td>
                      <div className="cart-qty-control">
                        <button type="button" onClick={() => updateQuantity(item.itemKey || item.productId, item.quantity - 1)}>-</button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.itemKey || item.productId, parseInt(e.target.value, 10) || 1)}
                        />
                        <button type="button" onClick={() => updateQuantity(item.itemKey || item.productId, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td>{(item.price * item.quantity)?.toFixed(2)} €</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.itemKey || item.productId)}
                        className="btn-remove"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-items-actions">
              <button type="button" className="btn btn-secondary" onClick={clearCart}>
                Vider le panier
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h2>Résumé</h2>
            <p className="shipping-helper">
              Livraison {shippingCost === 0 ? 'offerte' : `offerte des ${freeShippingThreshold.toFixed(2)} €`}
            </p>
            <div className="summary-row">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="summary-row">
              <span>Frais de port</span>
              <span>{shippingCost.toFixed(2)} €</span>
            </div>
            <div className="summary-row">
              <span>TVA (20%)</span>
              <span>{taxAmount.toFixed(2)} €</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{totalWithTaxAndShipping.toFixed(2)} €</span>
            </div>

            <button onClick={handleCheckout} className="btn btn-primary btn-checkout">
              Finaliser ma commande
            </button>

            <Link to="/products" className="btn btn-secondary">
              Continuer vos achats
            </Link>

            <div className="cart-trust-points">
              <p>Paiement securise</p>
              <p>Retours sous 14 jours</p>
              <p>Support client dedie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
