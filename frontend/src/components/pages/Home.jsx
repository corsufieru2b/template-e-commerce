/**
 * HOME PAGE
 * 
 * Page d'accueil avec:
 * - Hero premium
 * - Produits populaires
 * - Nouveautés
 * - Avantages
 * - Avis clients
 */

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../utils/apiClient';
import HeroSection from '../home/HeroSection';
import PopularProductsSection from '../home/PopularProductsSection';
import NewArrivalsSection from '../home/NewArrivalsSection';
import FeaturesSection from '../home/FeaturesSection';
import TestimonialsSection from '../home/TestimonialsSection';
import { mockProducts } from '../../data/mockProducts';
import '../../styles/Home.css';

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const [popularData, newData] = await Promise.all([
          apiClient.getProducts({ limit: 6, sort: '-ratings.count' }),
          apiClient.getProducts({ limit: 6, sort: '-createdAt' })
        ]);

        setPopularProducts(popularData.products);
        setNewArrivals(newData.products);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="home">
      <HeroSection />
      <PopularProductsSection products={popularProducts.length ? popularProducts : mockProducts} loading={loading} />
      <NewArrivalsSection products={newArrivals.length ? newArrivals : mockProducts} loading={loading} />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
