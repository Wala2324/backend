import axios from "axios";

let cachedProducts = null;

const getAll = async () => {
  if (cachedProducts) {
    return cachedProducts;
  }

  try {
    const response = await axios.get('api/products');

    // Validate the response format
    if (Array.isArray(response.data)) {
      cachedProducts = response.data; // Cache the products
      return cachedProducts;
    } else {
      console.error("Unexpected API response format", response.data);
      throw new Error("Invalid response format");
    }
  } catch (error) {
    if (error.response) {
      console.error("API Fetch Error: ", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error during API call:", error.message);
    }
    throw error;
  }
};

export default {
  getAll
};
