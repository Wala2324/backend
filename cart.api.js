import axios from './axios'; 

export const fetchCartFromServer = async (token) => {
  const res = await axios.get('/api/cart', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const syncCartToServer = async (cartItems, token) => {
  await axios.post('/api/cart', { items: cartItems }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const clearCartFromServer = async (token) => {
  await axios.delete('/api/cart', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCartItem = async (productId, token, data = {}) => {
    await axios.patch(`/api/cart/${productId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
