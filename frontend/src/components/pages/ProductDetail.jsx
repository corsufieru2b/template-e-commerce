/**
 * PRODUCT DETAIL PAGE
 * 
 * Affiche:
 * - Images du produit
 * - Description complète
 * - Spécifications
 * - Bouton ajouter au panier
 */

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { apiClient } from '../../utils/apiClient';
import '../../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiClient.getProduct(id);
        setProduct(data.product);
        setSelectedImageIndex(0);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getVariantOptions = (keyName) => {
    if (!product?.specifications) return [];
    return product.specifications
      .filter((spec) => spec.key?.toLowerCase() === keyName.toLowerCase())
      .map((spec) => spec.value)
      .filter(Boolean);
  };

  const colorOptions = getVariantOptions('Couleur');
  const sizeOptions = getVariantOptions('Taille');

  const handleSelectOption = (key, value) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, { selectedOptions, open: true, toast: true });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const ratingsAverage = product.ratings?.average || 0;
  const ratingsCount = product.ratings?.count || 0;
  const currentImage = product.images?.[selectedImageIndex]?.url || product.images?.[0]?.url || '/images/products/placeholder-product.svg';

  if (loading) return <div className="container"><p>Chargement...</p></div>;
  if (!product) return <div className="container"><p>Produit non trouvé</p></div>;

  return (
    <div className="product-detail">
      <div className="container">
        <div className="detail-container">
          {/* Images */}
          <div className="product-images">
            <img
              src={currentImage}
              alt={product.name}
              className="main-image"
            />
            <div className="thumbnails">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`${product.name} ${idx}`}
                  className={`thumbnail ${selectedImageIndex === idx ? 'thumbnail--active' : ''}`}
                  onClick={() => setSelectedImageIndex(idx)}
                />
              ))}
            </div>
          </div>

          {/* Infos */}
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="category">{product.category}</p>

            <div className="pricing">
              <span className="price">{product.price?.toFixed(2)} €</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">{product.originalPrice?.toFixed(2)} €</span>
                  <span className="discount-badge">-{product.discount}%</span>
                </>
              )}
            </div>

            <div className="ratings">
              ⭐ {ratingsAverage.toFixed(1)} ({ratingsCount} avis)
            </div>

            <p className="description">{product.description}</p>

            {/* Spécifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="specifications">
                <h3>Spécifications</h3>
                <ul>
                  {product.specifications.map((spec, idx) => (
                    <li key={idx}>
                      <strong>{spec.key}:</strong> {spec.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock */}
            <div className="stock-info">
              {product.stock > 0 ? (
                <span className="in-stock">✅ En stock ({product.stock})</span>
              ) : (
                <span className="out-of-stock">❌ Rupture de stock</span>
              )}
            </div>

            {(colorOptions.length > 0 || sizeOptions.length > 0) && (
              <div className="variant-pickers">
                {colorOptions.length > 0 && (
                  <div className="variant-row">
                    <span>Couleur</span>
                    <div className="variant-values">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`variant-chip ${selectedOptions.Couleur === color ? 'variant-chip--active' : ''}`}
                          onClick={() => handleSelectOption('Couleur', color)}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {sizeOptions.length > 0 && (
                  <div className="variant-row">
                    <span>Taille</span>
                    <div className="variant-values">
                      {sizeOptions.map((size) => (
                        <button
                          key={size}
                          type="button"
                          className={`variant-chip ${selectedOptions.Taille === size ? 'variant-chip--active' : ''}`}
                          onClick={() => handleSelectOption('Taille', size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="product-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn btn-primary btn-add-cart"
              >
                {addedToCart ? 'Ajoute au panier' : 'Ajouter au panier'}
              </button>
            </div>

            <div className="product-meta-lines">
              <p>SKU: {product.sku || 'N/A'}</p>
              <p>Livraison estimee: 2 a 5 jours ouvres</p>
              <p>Paiement securise et retours sous 14 jours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
