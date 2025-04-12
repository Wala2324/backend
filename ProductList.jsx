import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "../api/axios"
import { useCart } from './CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addToCart } = useCart();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong while fetching the products.');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
    );
  }, [searchTerm, products]);

  const categoryFilteredProducts = useMemo(() => {
    return selectedCategory
      ? filteredProducts.filter(product => product.category === selectedCategory)
      : filteredProducts;
  }, [selectedCategory, filteredProducts]);

  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category).filter(Boolean))];
  }, [products]);

  const handleAddToCart = (product) => {
    addToCart(product); 
  };

  return (
    <div className="container mt-4">
      {/* Category Dropdown */}
      <div className="d-flex justify-content-center mb-4">
        <select 
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="form-select w-auto"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Show Loading or Error Message */}
      {loading && <p className="text-center text-primary fw-bold">Loading products...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Product List */}
      <div className="row">
        {categoryFilteredProducts.length > 0 ? (
          categoryFilteredProducts.map((product) => (
            <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                  <img 
                    src={product.images?.[0] || 'https://via.placeholder.com/200'} 
                    alt={product.name} 
                    className="card-img-top img-fluid p-3 rounded"
                    style={{ height: "250px", objectFit: "contain" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text fw-bold text-primary">${product.price}</p>
                    <p className="card-text"><small className="text-muted">{product.category}</small></p>
                    <button 
                      onClick={() => handleAddToCart(product)} 
                      className="btn btn-outline-primary w-100"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No products found.</p>
        )}
      </div>

      {/* Back to Home Button */}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary px-4 py-2">Back to Home</Link>
      </div>
    </div>
  );
};

export default ProductList;
