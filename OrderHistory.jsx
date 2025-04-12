import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import '@/Components/Styles/Home.css';
import axios from "../api/axios";
import { useAuth } from '../Components/AuthContext';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/order', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(res.data);
    } catch (err) {
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    try {
      const res = await axios.post('/api/order', {
        products: [
          { product: 'yourValidProductIdHere', quantity: 1 }
        ]
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status === 201) {
        getOrders(); // Refresh after creating
      }
    } catch (err) {
      setError("Failed to create test order");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Order History</h1>

      <button className="btn btn-outline-secondary mb-3" onClick={getOrders}>
        Refresh Order History
      </button>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : orders.length > 0 ? (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Order Number: {order._id}</h5>
                  <p className="card-text">Total Products: <strong>{order.totalQuantity}</strong></p>
                  <p className="card-text">Total Price: <strong>{order.totalPrice} kr</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">You have no previous orders.</p>
      )}

      <Link to="/" className="btn btn-primary mt-4">Back to Home</Link>
    </div>
  );
};

export default OrderHistory;
