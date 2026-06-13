/**
 * TESTIMONIALS SECTION
 *
 * Petits témoignages clients pour renforcer la confiance.
 */

import React from 'react';
import { testimonials } from '../../data/testimonials';
import { useInView } from '../../hooks/useInView';
import '../../styles/Home.css';

const buildStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    stars.push(
      <span key={i} className={`testimonial-star ${i <= rating ? 'filled' : ''}`}>
        ★
      </span>
    );
  }
  return stars;
};

const TestimonialsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section className={`home-section home-section--testimonials ${inView ? 'is-visible' : ''}`} ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Avis de nos clients</h2>
          <p className="section-subtitle">Ce que nos clients disent de leurs achats.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="testimonial-rating">{buildStars(item.rating)}</div>
              <p className="testimonial-message">“{item.message}”</p>
              <div className="testimonial-author">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
