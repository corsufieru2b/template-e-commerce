/**
 * CART CONTEXT - Gestion globale du panier
 * 
 * Fournit:
 * - items: Produits dans le panier
 * - addToCart(product, quantity)
 * - removeFromCart(productId)
 * - updateQuantity(productId, quantity)
 * - clearCart()
 * - getTotal()
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    // Charger le panier depuis localStorage
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const showToast = useCallback((message, duration = 2400) => {
    setToast({ message, id: Date.now() });
    window.setTimeout(() => setToast(null), duration);
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((open) => !open);

  const getVariantKey = (selectedOptions = null) => {
    if (!selectedOptions || typeof selectedOptions !== 'object') return '';
    return Object.entries(selectedOptions)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
  };

  const matchesItem = (item, identifier) => {
    return item.itemKey === identifier || item.productId === identifier;
  };

  const addToCart = (product, quantity = 1, options = {}) => {
    const opts = typeof options === 'boolean' ? { open: options } : options;
    const {
      open = false,
      toast: toastMessage = true,
      selectedOptions = null
    } = opts;

    const variantKey = getVariantKey(selectedOptions);
    const itemKey = `${product._id}::${variantKey || 'default'}`;

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.itemKey === itemKey);

      if (existingItem) {
        return prevItems.map((item) =>
          item.itemKey === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const selectedOptionsLabel = selectedOptions
        ? Object.values(selectedOptions).filter(Boolean).join(' / ')
        : '';

      return [
        ...prevItems,
        {
          itemKey,
          productId: product._id,
          name: selectedOptionsLabel ? `${product.name} (${selectedOptionsLabel})` : product.name,
          price: product.price,
          image: product.images?.[0]?.url,
          quantity,
          selectedOptions
        }
      ];
    });

    if (open) openCart();
    if (toastMessage) showToast(`${product.name} ajouté au panier`);
  };

  const removeFromCart = (productId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !matchesItem(item, productId))
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        matchesItem(item, productId)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalQuantity = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      getTotalQuantity,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      toast,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};
