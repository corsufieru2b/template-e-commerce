/**
 * PRODUCTS PAGE
 * 
 * Catalogue avec:
 * - Filtres (catégorie, prix)
 * - Pagination
 * - Grille de produits
 */

import React, { useState, useEffect } from 'react';
import { apiClient } from '../../utils/apiClient';
import ProductCard from '../common/ProductCard';
import { mockProducts } from '../../data/mockProducts';
import '../../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const filters = {
          category: category || undefined,
          priceMin: priceMin || undefined,
          priceMax: priceMax || undefined,
          page,
          limit: 12
        };

        // Nettoyer les valeurs undefined
        Object.keys(filters).forEach(
          (key) => filters[key] === undefined && delete filters[key]
        );

        const data = await apiClient.getProducts(filters);
        setProducts(data.products);
        setTotalPages(data.pagination.pages);
      } catch (error) {
        console.error('Erreur:', error);
        // Si l'API est indisponible, on utilise un jeu de données local pour développement
        setProducts(mockProducts);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, priceMin, priceMax, page]);

  const handleFilterChange = () => {
    setPage(1);
  };

  return (
    <div className="products-page">
      <div className="container">
        <h1>Catalogue produits</h1>

        <div className="products-container">
          {/* Filtres */}
          <aside className="filters">
            <h3>Filtres</h3>

            <div className="filter-group">
              <label>Catégorie</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  handleFilterChange();
                }}
              >
                <option value="">-- Tous --</option>
                <option value="électronique">Électronique</option>
                <option value="vêtements">Vêtements</option>
                <option value="maison">Maison</option>
                <option value="beauté">Beauté</option>
                <option value="sport">Sport</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Prix (€)</label>
              <input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => {
                  setPriceMin(e.target.value);
                  handleFilterChange();
                }}
              />
              <input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => {
                  setPriceMax(e.target.value);
                  handleFilterChange();
                }}
              />
            </div>
          </aside>

          {/* Produits */}
          <div className="products-content">
            {loading ? (
              <p>Chargement...</p>
            ) : products.length === 0 ? (
              <p>Aucun produit trouvé</p>
            ) : (
              <>
                <div className="products-grid">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} to={`/products/${product._id}`} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Précédent
                  </button>
                  <span>Page {page} / {totalPages}</span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Suivant
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
