import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

import "./Styles/ProductCard.css";

const ProductCard = ({ product }) => {

  const { addToCart } = useCart();

  return (
    <div className="card shadow-sm border-0">
      <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
        <div className="position-relative">
          <img
            src={product.images?.[0] || 'placeholder.jpg'}
            className="card-img-top img-fluid rounded-top"
            alt={product.name || "Product Image"}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title mb-2 fw-bold">{product.name || "No Name Available"}</h5>
          <p className="card-text text-muted mb-2">
            {product.price ? `${product.price} :- SEK` : "Price Unavailable"}
          </p>
        </div>
      </Link>
      <div className="card-footer bg-white border-0 p-3">
    <button className="btn btn-primary w-100" onClick={() => addToCart(product)}>
      Add To Cart
    </button>
  </div>
    </div>
  );
};

export default ProductCard;
