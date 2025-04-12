import { configureStore } from "@reduxjs/toolkit";
import ProductListSlice from './ProductSlice';
import shoppingCartReducer from "./CartSlice";  //Import as default export
import userReducer from "./userSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const store = configureStore({
  reducer: {
    productList: ProductListSlice,
    shoppingCart: shoppingCartReducer,  
    user: userReducer,
  },
});
