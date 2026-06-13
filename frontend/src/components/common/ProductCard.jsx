/**
 * PRODUCT CARD
 * 
 * Composant réutilisable pour afficher un produit dans une grille.
 * Affiche badge (Nouveau / Promo / Best seller), image, nom, prix,
 * et un bouton ajouter au panier.
 */

import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import brandingConfig from '../../config/branding.json';
import '../../styles/ProductCard.css';

const getProductBadge = (product) => {
  if (!product) return null;

  const isOnSale = product.discount && product.discount > 0;
  const createdAt = product.createdAt ? new Date(product.createdAt) : null;
  const now = new Date();
  const daysOld = createdAt ? (now - createdAt) / (1000 * 60 * 60 * 24) : null;
  const isNew = daysOld !== null && daysOld <= 30;
  const isBestSeller = product.ratings?.count >= 15;

  if (isOnSale) return { label: brandingConfig.badges?.sale || 'Promo', type: 'sale' };
  if (isNew) return { label: brandingConfig.badges?.new || 'Nouveau', type: 'new' };
  if (isBestSeller) return { label: brandingConfig.badges?.bestseller || 'Best seller', type: 'bestseller' };

  return null;
};

const formatPrice = (price) => {
  if (typeof price !== 'number') return '-';
  return `${price.toFixed(2)} €`;
};

const ProductCard = ({ product, to, showAddButton = true, onAdd }) => {
  const { addToCart } = useContext(CartContext);
  const badge = useMemo(() => getProductBadge(product), [product]);

  const handleAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onAdd) {
      onAdd(product);
      return;
    }

    // Ajoute au panier et ouvre le drawer
    addToCart(product, 1, { open: true, toast: true });
  };

  const imageUrl = product.images?.[0]?.url || '/images/products/placeholder-product.svg';

  const CardWrapper = to ? Link : 'div';
  const cardProps = to ? { to } : {};

  return (
    <CardWrapper className="product-card" {...cardProps}>
      <div className="product-card__media">
        <img
          src={imageUrl}
          alt={product.name}
          className="product-card__image"
        />
        {badge && (
          <span className={`product-card__badge product-card__badge--${badge.type}`}>
            {badge.label}
          </span>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>

        <div className="product-card__pricing">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="product-card__original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {showAddButton && (
          <button
            type="button"
            className="btn btn-primary product-card__button"
            onClick={handleAdd}
          >
            Ajouter au panier
          </button>
        )}
      </div>
    </CardWrapper>
  );
};

export default ProductCard;
