/**
 * HOME PAGE
 * 
 * Page d'accueil avec:
 * - Hero section
 * - Produits en vedette
 * - CTA
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../utils/apiClient';
import '../../styles/Home.css';
import brandingConfig from '../../config/branding.json';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await apiClient.getProducts({ limit: 6 });
        setFeaturedProducts(data.products.slice(0, 6));
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero" style={{
        backgroundColor: brandingConfig.colors.primary
      }}>
        <div className="hero-content">
          <h1>Bienvenue chez {brandingConfig.storeName}</h1>
          <p>{brandingConfig.storeName_subtitle}</p>
          <Link to="/products" className="btn btn-light">
            Découvrir nos produits
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Produits en vedette</h2>
          
          {loading ? (
            <p className="loading">Chargement...</p>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="product-card"
                >
                  <img
                    src={product.images?.[0]?.url || '/placeholder.png'}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3>{product.name}</h3>
                  <p className="price">{product.price?.toFixed(2)} €</p>
                  <p className="category">{product.category}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{
        backgroundColor: brandingConfig.colors.secondary
      }}>
        <h2>Prêt à acheter?</h2>
        <p>Parcourez notre collection complète</p>
        <Link to="/products" className="btn btn-primary">
          Voir tous les produits
        </Link>
      </section>
    </div>
  );
};

export default Home;
