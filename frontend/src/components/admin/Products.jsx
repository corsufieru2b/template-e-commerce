/**
 * ADMIN PRODUCTS PAGE
 * 
 * Gestion CRUD des produits:
 * - Liste des produits
 * - Créer/Éditer
 * - Supprimer
 */

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { apiClient } from '../../utils/apiClient';
import '../../styles/Admin.css';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    category: 'électronique',
    stock: ''
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchProducts = async () => {
      try {
        const data = await apiClient.getAdminProducts();
        setProducts(data.products);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, navigate]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await apiClient.createProduct(formData);
      // Refresh
      const data = await apiClient.getAdminProducts();
      setProducts(data.products);
      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        sku: '',
        category: 'électronique',
        stock: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr?')) {
      try {
        await apiClient.deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h3>Admin Panel</h3>
          <nav className="admin-nav">
            <Link to="/admin" className="nav-link">Dashboard</Link>
            <Link to="/admin/products" className="nav-link active">Produits</Link>
            <Link to="/admin/orders" className="nav-link">Commandes</Link>
          </nav>
        </aside>

        <main className="admin-content">
          <h1>Gestion des produits</h1>

          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
            {showForm ? 'Annuler' : '+ Ajouter un produit'}
          </button>

          {showForm && (
            <form onSubmit={handleCreateProduct} className="admin-form">
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prix (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Créer le produit</button>
            </form>
          )}

          {loading ? (
            <p>Chargement...</p>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>SKU</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.price?.toFixed(2)} €</td>
                    <td>{product.stock}</td>
                    <td>
                      <button className="btn-edit">✏️</button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn-delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminProducts;
