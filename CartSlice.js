import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
  totalQuantity: 0,
}

const getTotalPrice = (cart) =>
  cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

const getTotalQuantity = (cart) =>
  cart.reduce((total, item) => total + item.quantity, 0);

export const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.product._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ product, quantity: 1 });
      }

      state.totalPrice = getTotalPrice(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },

    removeOne: (state, action) => {
      const productId = action.payload;
      const existingItem = state.cart.find((item) => item.product._id === productId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.product._id !== productId);
        }
      }

      state.totalPrice = getTotalPrice(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },

    removeItem: (state, action) => {
      const productId = action.payload;
      console.log("Removing product ID:", productId);

      const index = state.cart.findIndex((item) => item.product._id === productId);

      if (index !== -1) {
        state.cart.splice(index, 1);
      }

      state.totalPrice = getTotalPrice(state.cart);
      state.totalQuantity = getTotalQuantity(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});


export const { addToCart, removeOne, removeItem, clearCart } = cartSlice.actions;


export default cartSlice.reducer;
