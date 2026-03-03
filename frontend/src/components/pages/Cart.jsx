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
import '../../styles/Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

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
                  <tr key={item.productId}>
                    <td>
                      <div className="item-name">
                        {item.image && <img src={item.image} alt={item.name} />}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{item.price?.toFixed(2)} €</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                      />
                    </td>
                    <td>{(item.price * item.quantity)?.toFixed(2)} €</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="btn-remove"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h2>Résumé</h2>
            <div className="summary-row">
              <span>Sous-total</span>
              <span>{getTotal()} €</span>
            </div>
            <div className="summary-row">
              <span>Frais de port</span>
              <span>9.99 €</span>
            </div>
            <div className="summary-row">
              <span>TVA (20%)</span>
              <span>{(getTotal() * 0.2)?.toFixed(2)} €</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{(parseFloat(getTotal()) * 1.2 + 9.99)?.toFixed(2)} €</span>
            </div>

            <button onClick={handleCheckout} className="btn btn-primary btn-checkout">
              Procéder à la commande
            </button>

            <Link to="/products" className="btn btn-secondary">
              Continuer vos achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
