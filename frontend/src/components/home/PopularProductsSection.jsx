/**
 * POPULAR PRODUCTS SECTION
 *
 * Affiche les produits les plus populaires (plus d'avis / best sellers).
 */

import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import { useInView } from '../../hooks/useInView';
import '../../styles/Home.css';

const PopularProductsSection = ({ products = [], loading }) => {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section className={`home-section ${inView ? 'is-visible' : ''}`} ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Produits populaires</h2>
          <p className="section-subtitle">Les produits les plus appréciés par nos clients.</p>
        </div>

        {loading ? (
          <p className="loading">Chargement...</p>
        ) : (
          <div className="products-grid">
            {products.slice(0, 6).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                to={`/products/${product._id}`}
              />
            ))}
          </div>
        )}

        <div className="section-cta">
          <Link to="/products" className="btn btn-light">
            Voir tous les best-sellers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProductsSection;
