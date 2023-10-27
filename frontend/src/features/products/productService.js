import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1/products/'


// Create new product
const createProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      // Accept:"application/json",
    },
  }

  const response = await axios.post(API_URL, productData, config)

  return response.data
}

const homeProducts = async() => {
  const response = await axios.get(API_URL, )
  return response.data
}


// Get admin products
const getProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// Delete admin product
const deleteProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + productId, config)

  return response.data
}

//Get Single Product by admin
// Get a Product
const getProduct = async (id, token ) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + id, config);
  return response.data;
};

// Update Product by admin
const updateProduct = async (updatedProductData,id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + id, updatedProductData,config);
  return response.data;
  
};

// Get a Product
const fetchProductDetail = async (id) => {
  
  const response = await axios.get(`${API_URL}products/` + id);
  return response.data;
};

const getProductsByAdmin = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}all-products`, config );
  return response.data;
}

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  homeProducts,
  fetchProductDetail,
  getProductsByAdmin,
}

export default productService;
