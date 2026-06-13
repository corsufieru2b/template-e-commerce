/**
 * CART TOAST
 *
 * Affiche une notification de confirmation lors de l'ajout d'un produit.
 */

import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import '../../styles/CartToast.css';

const CartToast = () => {
  const { toast } = useContext(CartContext);

  if (!toast) return null;

  return (
    <div className="cart-toast" role="status" aria-live="polite">
      <p>{toast.message}</p>
    </div>
  );
};

export default CartToast;
