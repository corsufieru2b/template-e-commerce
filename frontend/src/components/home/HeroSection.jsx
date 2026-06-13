/**
 * HERO SECTION
 *
 * Section d'accueil premium avec titre marketing et CTA.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import brandingConfig from '../../config/branding.json';
import '../../styles/Home.css';

const HeroSection = () => {
  return (
    <section className="hero hero--premium">
      <div className="container hero__content">
        <div className="hero__text">
          <p className="hero__eyebrow">{brandingConfig.storeName}</p>
          <h1 className="hero__title">{brandingConfig.storeName} - {brandingConfig.storeName_subtitle}</h1>
          <p className="hero__subtitle">
            Découvrez notre sélection de produits premium, pensés pour allier qualité, confort et style.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn btn-primary">
              Voir la collection
            </Link>
            <Link to="/products" className="btn btn-secondary">
              Meilleures ventes
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__cards">
            <div className="hero__card">✨ Nouveau</div>
            <div className="hero__card">🔥 Promo</div>
            <div className="hero__card">⭐ Best seller</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
