/**
 * NEW ARRIVALS SECTION
 *
 * Affiche les dernières nouveautés.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';
import { useInView } from '../../hooks/useInView';
import '../../styles/Home.css';

const NewArrivalsSection = ({ products = [], loading }) => {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section className={`home-section home-section--alt ${inView ? 'is-visible' : ''}`} ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Nouveautés</h2>
          <p className="section-subtitle">Découvrez les derniers ajouts à notre collection.</p>
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
            Voir les nouveautés
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
