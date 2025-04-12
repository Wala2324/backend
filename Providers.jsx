import { Provider } from "react-redux";
import { store } from "../Store"; 
import CartContextProvider from "./CartContext";
import AuthContextProvider from "./AuthContext";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>  {/*Wrap Redux store */}

   <AuthContextProvider> 
       <CartContextProvider>
        {children}
       </CartContextProvider>
    </AuthContextProvider>
     </Provider> 
  );
};

export default Providers;
