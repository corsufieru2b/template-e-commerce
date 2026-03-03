/**
 * ADMIN ORDERS PAGE
 * 
 * Gestion des commandes:
 * - Liste des commandes
 * - Modification du statut
 * - Détails de la commande
 */

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { apiClient } from '../../utils/apiClient';
import '../../styles/Admin.css';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await apiClient.getAdminOrders();
        setOrders(data.orders);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiClient.updateOrderStatus(orderId, { status: newStatus });
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h3>Admin Panel</h3>
          <nav className="admin-nav">
            <Link to="/admin" className="nav-link">Dashboard</Link>
            <Link to="/admin/products" className="nav-link">Produits</Link>
            <Link to="/admin/orders" className="nav-link active">Commandes</Link>
          </nav>
        </aside>

        <main className="admin-content">
          <h1>Gestion des commandes</h1>

          {loading ? (
            <p>Chargement...</p>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Numéro</th>
                  <th>Client</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.customer.firstName} {order.customer.lastName}</td>
                    <td>{order.pricing.total?.toFixed(2)} €</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmée</option>
                        <option value="processing">En traitement</option>
                        <option value="shipped">Expédiée</option>
                        <option value="delivered">Livrée</option>
                        <option value="cancelled">Annulée</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn-view">👁️</button>
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

export default AdminOrders;
