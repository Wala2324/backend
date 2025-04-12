import { useCart } from "./CartContext"
import CartItem from "./CartItem"
import { Link } from "react-router-dom"
import './Styles/ShoppingCart.css'
import axios from '../api/axios'
import { useAuth } from "./AuthContext"


const ShoppingCart = ({ setIsOpen, isCheckout }) => {
  const { cart, clearCart } = useCart()
  const { token } = useAuth()
  

  const validCartItems = cart.filter(item => item && item.product)

  const totalPrice = validCartItems.reduce((total, item) => {
    const price = typeof item.product.price === 'number' ? item.product.price : 0
    return total + price * item.quantity
  }, 0);

  const handlePlaceOrder = async () => {
    try {
      await axios.post('/api/order', {
        products: cart.map(item => ({
          product: item.product._id || item.product.id,
          quantity: item.quantity
        }))
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      clearCart();
      alert("Order Placed Successfully!")

    } catch (err) {
      console.error('Failed to place order:', err)
      alert("Something went wrong while placing your order.")
    }
  };

  const handleNavClick = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: true
      });
      bsCollapse.hide();
    }
  };
  

  return (
    <div className="shoppingcart-container text-dark cart-scroll">
      <div>
        {validCartItems.length === 0 ? (
          <div className="p-3 text-center alert alert-info">
            <p>Your cart is empty</p>
          </div>
        ) : (
          validCartItems.map((item) => (
            <CartItem key={`cart_${item.product._id || item.product.id}`} item={item} />
          ))
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center p-3 border-top mt-4">
        <div>
          <p className="fs-5 fw-semibold mb-1">Total: {totalPrice.toLocaleString()} SEK</p>
          <p className="text-muted small">(incl. tax)</p>
        </div>

        {isCheckout ? (
          <button
          onClick={handlePlaceOrder}
          className="btn btn-success px-4 py-2"
        >
            Place Order
          </button>
        ) : (
          <Link
          onClick={() => {
            if (setIsOpen) setIsOpen(false);
            handleNavClick();
          }}
          to="/checkout"
          className="btn btn-dark px-4 py-2"
        >
          Checkout
        </Link>
        
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
