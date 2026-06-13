/**
 * CART DRAWER
 *
 * Overlay affichant le mini-panier avec résumé et actions.
 */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import '../../styles/CartDrawer.css';

const CartDrawer = () => {
  const {
    items,
    getTotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart
  } = useContext(CartContext);

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer">
      <div className="cart-drawer__backdrop" onClick={closeCart} />

      <aside className="cart-drawer__panel">
        <header className="cart-drawer__header">
          <h3>Votre panier</h3>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Fermer le panier">
            ✕
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Votre panier est vide pour le moment.</p>
            <Link to="/products" className="btn btn-primary" onClick={closeCart}>
              Voir les produits
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <li key={item.itemKey || item.productId} className="cart-drawer__item">
                  <img
                    className="cart-drawer__item-image"
                    src={item.image || '/images/products/placeholder-product.svg'}
                    alt={item.name}
                  />
                  <div className="cart-drawer__item-info">
                    <p className="cart-drawer__item-name">{item.name}</p>
                    {item.selectedOptions && (
                      <p className="cart-drawer__item-options">
                        {Object.entries(item.selectedOptions)
                          .filter(([, value]) => value)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(' | ')}
                      </p>
                    )}
                    <div className="cart-drawer__item-meta">
                      <span className="cart-drawer__item-price">{item.price.toFixed(2)} €</span>
                      <div className="cart-drawer__qty">
                        <button
                          className="cart-drawer__qty-btn"
                          onClick={() => updateQuantity(item.itemKey || item.productId, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="cart-drawer__qty-value">{item.quantity}</span>
                        <button
                          className="cart-drawer__qty-btn"
                          onClick={() => updateQuantity(item.itemKey || item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="cart-drawer__remove"
                    onClick={() => removeFromCart(item.itemKey || item.productId)}
                    aria-label="Supprimer"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__summary">
              <div className="cart-drawer__total">
                <span>Sous-total</span>
                <span className="cart-drawer__total-value">{getTotal()} €</span>
              </div>

              <div className="cart-drawer__actions">
                <Link to="/cart" className="btn btn-secondary" onClick={closeCart}>
                  Voir le panier
                </Link>
                <Link to="/checkout" className="btn btn-primary" onClick={closeCart}>
                  Commander
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
