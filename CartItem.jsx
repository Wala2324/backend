import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa6';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';


const CartItem = ({ item }) => {
  const { addToCart, removeOne, removeItem,  handleSave} = useCart();
  const { user } = useAuth();

  if (!item || !item.product) return null;

  const productId = item.product._id || item.product.id;



  const addOneToCart = () => {
    addToCart(item.product);
    handleSave(productId, item.quantity + 1);
  };

  const removeOneFromCart = () => {
    removeOne(productId);
    handleSave(productId, item.quantity - 1);
  };

  const deleteItem = () => {
    removeItem(productId);
    handleSave(productId, 0);
  };

  return (
    <div className="p-3 border-bottom bg-light rounded">
    <div className="d-flex gap-3 align-items-start flex-wrap">
      <div className="rounded overflow-hidden" style={{ width: '60px', height: '60px', flexShrink: 0 }}>
        <img
          src={item.product.images?.[0]}
          className="img-fluid rounded"
          alt={item.product.name || 'Product'}
        />
      </div>

      <div className="flex-grow-1" style={{  minWidth: 0, maxWidth: '100%'}}>
        <p className="fw-bold mb-1 text-truncate">{item.product.name || "Unknown Product"}</p>
        <p className="text-muted small mb-1 text-truncate">{item.product.description || "No description available."}</p>
        <p className="text-muted small mb-0">
          {item.quantity} x {item.product.price?.toLocaleString() || "0.00"} SEK
        </p>
        <p className="text-muted small mb-2">Category: {item.product.category || "N/A"}</p>

        <div className="d-flex gap-2 flex-wrap">
          <button onClick={removeOneFromCart} className="btn btn-outline-secondary btn-sm">
            <FaMinus size={15} />
          </button>
          <button onClick={addOneToCart} className="btn btn-outline-primary btn-sm">
            <FaPlus size={15} />
          </button>
          <button onClick={deleteItem} className="btn btn-danger btn-sm" aria-label="Remove item from cart">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  </div>
);
};


export default CartItem;
