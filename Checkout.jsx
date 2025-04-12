import { useCart } from "./CartContext";
import ShoppingCart from "./ShoppingCart";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../Components/AuthContext";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handlePurchase = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before proceeding.");
      return;
    }

    const orderPayload = {
      products: cart.map(item => ({
        product: item.product._id || item.product.id,
        quantity: item.quantity,
      }))
    };

    try {
      const res = await axios.post('/api/order', orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 201) {
        alert("Thank you for your purchase! Your order has been placed.");
        clearCart();
        navigate("/order-history");
      } else {
        alert("Something went wrong while placing your order.");
      }
    } catch (err) {
      console.error("Order placement failed:", err);
      alert("Error: Unable to complete your purchase.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg text-center">
        <h2 className="mb-4">Checkout</h2>

        <ShoppingCart isCheckout />

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-danger px-4 py-2" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="btn btn-success px-4 py-2 fw-bold shadow-sm" onClick={handlePurchase}>
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
