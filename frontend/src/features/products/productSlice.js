import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'
import {toast} from 'react-toastify'

const initialState = {
  product: {},
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  $products:[],
}

//Create new product by admin
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token 
     return await productService.createProduct(productData, token);
      
    } catch (error) {      
      let message;
      if (error.response) {
        if (error.response.status === 400) {
          message = error.response.data.message
          toast.error(message)
        }      
      }
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const homeProducts = createAsyncThunk('products/homeProducts',async(_,thunkAPI) => {
  try {
  
    return await productService.homeProducts()
  } catch (error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    
  }
})

// Delete user products
export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.deleteProduct(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
//Get Single Product
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await productService.getProduct(id,token);
    } catch (error) {
      let message;
      if (error.response) {
        if (error.response.status === 500) {
          message = error.response.data.message
        }
        else if (error.response.status === 404) {
          message = error.response.data.message;
        }
        toast.error(message);
      }       
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk('products/updateProduct',
  async ({ id, updatedProductData}, thunkAPI ) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await productService.updateProduct(updatedProductData, id, token)
    } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
}
)
//fetch productDetail
export const productDetail = createAsyncThunk("products/fetchProductDetail",async(id, thunkAPI) => {
  try {
   return await productService.fetchProductDetail(id);
  } catch (error) {
    var _message
    if (error.response) {
      if (error.response.status === 404) {
        _message = error.response.data.message;     
         toast.warn(_message);  
      }
    }    
    return thunkAPI.rejectWithValue(_message);
    
  }
});

export const getProductsByAdmin = createAsyncThunk("products/getProductsByAdmin", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await productService.getProductsByAdmin(token);
  } catch (error) {
    let message;
    if (error.response) {
      if (error.response.status === 500) {
        message = error.response.data.error; 
        toast.error(message)
      }
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export  const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;       
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false        
        state.message = action.payload.message
        toast.success(state.message);
        state.products.push(action.payload);      
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true        
      })           
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        )
        toast.success("Product deleted successfully")
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

    // get single product
    .addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload.product;      
    })
    .addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    })
    //homePage Products
    .addCase(homeProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(homeProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.products = action.payload
    })
    .addCase(homeProducts.rejected, (state, action) => {
      state.isLoading = false;
      // state.isError = true;
      state.message = action.payload;
      // toast.error(action.payload);
    })

    .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
       state.products = state.products.map((item) =>
          item.id === action.payload.iid ? action.payload : item
        );
        toast.success('Product update Success')
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })    
      .addCase(productDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(productDetail.fulfilled, (state, action) => {
        state.isLoading = false;  
        state.product = action.payload.product;
      })
      .addCase(productDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.product = null;
      })
      .addCase(getProductsByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;  
        state.products = action.payload.products;
      })
      .addCase(getProductsByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
        state.products = [];
      });
    

  },
})

export const { reset } = productSlice.actions;
export default productSlice.reducer
