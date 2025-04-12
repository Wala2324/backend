import { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";
import axios from '../api/axios';
import { updateCartItem } from "../api/cart.api"
export const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    console.error("Error");
    throw new Error("Error");
  }
  return context;
};

// Context provider component
const CartContextProvider = ({ children }) => {
    const { user, token, authReady } = useAuth()
    const [cart, setCart] = useState([])
    
    const getStorageKey = useCallback(() => `cart_${user?.id || "guest"}`, [user]);
  

    const resetCart = useCallback(() => {
      const savedCart = localStorage.getItem(getStorageKey());
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }, [getStorageKey]);
    
    const handleSave = async (productId, newQuantity) => {
      try {
        await updateCartItem(productId, token, { quantity: newQuantity });
      } catch (err) {
        console.error('Failed to update item quantity:', err);
      }
    };
    
    

    useEffect(() => {
      const loadCart = async () => {
        if (!authReady ||!user || !user.token) return;
        try {
          const serverCart = await fetchCartFromServer(user.token);
          setCart(serverCart);
          localStorage.removeItem('cart_guest');
        } catch (err) {
          console.error("Failed to fetch cart from server", err);
        }
      };
      loadCart();
    }, [authReady, user]);

    useEffect(() => {
      const saveCart = async () => {
        if (!authReady || !user || !user.token) return;
        try {
          await syncCartToServer(cart, user.token);
        } catch (err) {
          console.error("Failed to sync cart", err);
        }
      };
      saveCart();
    }, [cart, authReady, user]);
    
    

  // Add a product to the cart
  const addToCart = (product) => {
    const productId = product.id || product._id;
    if (!productId) {
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product._id === productId || item.product.id === productId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.product._id === productId || item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  // Remove one unit of a product from the cart
  const removeOne = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product._id === productId || item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  // Remove an item completely from the cart
  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId && item.product.id !== productId));
  };

  const clearCart = async () => {
      setCart([]);
      try {
        if (user?.token) {
          await clearCartFromServer(user.token);
        }
      } catch (err) {
        console.error("Failed to clear server cart", err);
    }
  };
  

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({ cart, addToCart, removeOne, removeItem, clearCart, resetCart,handleSave }),
    [cart, resetCart]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
