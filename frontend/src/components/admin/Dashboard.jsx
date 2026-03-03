/**
 * ADMIN DASHBOARD
 * 
 * Vue d'ensemble:
 * - Statistiques de vente
 * - Graphiques de revenus
 * - Commandes récentes
 * - Navigation admin
 */

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { apiClient } from '../../utils/apiClient';
import '../../styles/Admin.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const data = await apiClient.getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <h3>Admin Panel</h3>
          <nav className="admin-nav">
            <Link to="/admin" className="nav-link active">Dashboard</Link>
            <Link to="/admin/products" className="nav-link">Produits</Link>
            <Link to="/admin/orders" className="nav-link">Commandes</Link>
          </nav>
        </aside>

        {/* Contenu */}
        <main className="admin-content">
          <h1>Dashboard Administrateur</h1>

          {loading ? (
            <p>Chargement des statistiques...</p>
          ) : stats ? (
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Commandes totales</h3>
                <p className="stat-value">{stats.totalOrders}</p>
              </div>

              <div className="stat-card">
                <h3>Commandes ce mois</h3>
                <p className="stat-value">{stats.ordersThisMonth}</p>
              </div>

              <div className="stat-card">
                <h3>Chiffre d'affaires</h3>
                <p className="stat-value">{stats.totalRevenue} €</p>
              </div>

              <div className="stat-card">
                <h3>Statut des commandes</h3>
                <ul>
                  {stats.ordersByStatus?.map((item) => (
                    <li key={item._id}>
                      {item._id}: {item.count}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
