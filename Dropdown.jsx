import React, { useState, useEffect, useRef } from 'react';
import ShoppingCart from './ShoppingCart';
import { useAuth } from './AuthContext';
import axios from '../api/axios';
import { useCart } from './CartContext';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { token, user, authReady } = useAuth();
  const { cart } = useCart();

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

 

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div ref={dropdownRef} className="position-relative d-inline-block me-3">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn-link position-relative"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <i className="fa-solid fa-cart-shopping"></i>
             {totalQuantity > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalQuantity}
              </span>
            
        )}
      </button>

      {isOpen && (
        <div className="position-relative end-0 mt-2 bg-white rounded shadow-lg p-3" style={{ width: '450px', zIndex: 1000 }}>
          <ShoppingCart setIsOpen={setIsOpen} />
            </div>
      )}
    </div>
  );
};

export default Dropdown;

export const updateCartItem = async (id, token, data = {}) => {
  if (!token) throw new Error("No auth token provided")
  try {
    const res = await axios.patch(`/api/ShoppingCart/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to update cart item:", error);
    throw error;
  }
};
  

  