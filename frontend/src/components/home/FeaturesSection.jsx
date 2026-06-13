/**
 * FEATURES SECTION
 *
 * Met en avant les principaux avantages du e-commerce.
 */

import React from 'react';
import brandingConfig from '../../config/branding.json';
import { homeFeatures } from '../../data/homeFeatures';
import { useInView } from '../../hooks/useInView';
import '../../styles/Home.css';

const FeaturesSection = () => {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <section className={`home-section home-section--features ${inView ? 'is-visible' : ''}`} ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Pourquoi choisir {brandingConfig.storeName} ?</h2>
          <p className="section-subtitle">Une expérience d’achat fluide, sécurisée et rapide.</p>
        </div>

        <div className="features-grid">
          {homeFeatures.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-card__icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
