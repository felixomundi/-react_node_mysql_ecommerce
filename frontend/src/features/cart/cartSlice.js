import {  createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import axios from "axios";
const BASE_URL = `http://localhost:5000/api/v1/cart`
const initialState= {
  cartItems: [],
  billing: localStorage.getItem('billing') ? JSON.parse(localStorage.getItem('billing')) : {},
  payment_mode:localStorage.getItem('payment_mode') ? JSON.parse(localStorage.getItem('payment_mode')): {}, 
  total: 0,
  isLoading: false,
  cartItem: {}, 
  message: "",
  totalcartItems: 0,
  isError: null,
  quantity: 1,
  $cartItems: [],
  discount: 0,
  discounted_price:0,
}


export const getCartItems = createAsyncThunk('cart/Items',
async (_,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
              const config = {
          headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type" : "application/json",
          },
        }
       const response = await axios.get(BASE_URL,config);
        return response.data;

    } catch (error) {
    }
    });

export const placeOrder = createAsyncThunk(
  "cart/placeorder",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post("")
      return response.data;
    } catch (error) {
      const message = error.response.data;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  });

export const addToCart = createAsyncThunk("cart/add", async (cartData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    const response = await axios.post(`${BASE_URL}/add-to-cart`, cartData, config);
    return response.data;
  } catch (error) {   
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
   
  }
});

export const totalItems = createAsyncThunk("cart/totalItems", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    const response = await axios.get(`${BASE_URL}/total-items`, config);   
    return response.data;
  } catch (error) {
    console.log(error)
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);   
  }
});
export const deleteCartItems = createAsyncThunk("cart/deleteCartItem", async (cartId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }    

    const response = await axios.post(`${BASE_URL}/`,{cartId:cartId}, config);     
    if (response.data) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      let _message = '';
      if (error.response.status === 404) {
        _message = error.response.data.message;
        toast.error(_message);
        return thunkAPI.rejectWithValue(_message);         
      }
      if (error.response.status === 400) {
        _message = error.response.data.message;
        toast.error(_message);
        return thunkAPI.rejectWithValue(_message);   
    }
  }  
    
  }
});
export const cartTotal = createAsyncThunk("cart/cartTotal", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    const response = await axios.get(`${BASE_URL}/cart-total`, config);   
    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);   
  }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    const response = await axios.get(`${BASE_URL}/clear-cart`, config);
    return response.data;
  } catch (error) {
    let message;
    if (error.response) {
      if (error.response.status === 500) {
        message = error.response.data.message;
        toast.error(message);
      }
    }
    return thunkAPI.rejectWithValue(message);

  }
});

export const incrementCartItem = createAsyncThunk('cart/increment', async (form, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept:"application/json"
      },
    }
   
    const response = await axios.put(`${BASE_URL}/increment`, {productId:form},config);
      if (response.status === 200) {
        toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    let message;
    if (error.response) {
      if (error.response.status === 500) {
        message = error.response.data.message;
        toast.error(message);
      }
      if (error.response.status === 400) {
        message = error.response.data.message;
        toast.error(message);
      }
      if (error.response.status === 404) {
        message = error.response.data.message;
        toast.error(message);
      }
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const decrementCartItem = createAsyncThunk('cart/decrement', async (form, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept:"application/json"
      },
    }
   
    const response = await axios.put(`${BASE_URL}/decrement`, {productId:form},config);
      if (response.status === 200) {
        toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    let message;
    if (error.response) {
      if (error.response.status === 500) {
        message = error.response.data.message;
        toast.error(message);
      }
      if (error.response.status === 400) {
        message = error.response.data.message;
        toast.error(message);
      }
      if (error.response.status === 404) {
        message = error.response.data.message;
        toast.error(message);
      }
    }
    return thunkAPI.rejectWithValue(message);
  }
});

export const getUserCartItems = createAsyncThunk('cart/getUserCartItems', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`${BASE_URL}/admin/cartItems`, config);
    return response.data;
  } catch (error) {
    let message;
    if (error.response) {
      if (error.response.status === 500) {
        message = error.response.data.message;
        toast.error(message);
      }
    }
    return thunkAPI.rejectWithValue(message);

  }
});

export const deleteCartItemByAdmin = createAsyncThunk("cart/deleteCartItemByAdmin", async (cartId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }    

    const response = await axios.post(`${BASE_URL}/admin/delete-cart-item`,{cartId:cartId}, config);     
    if (response.data) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    let _message;
    if (error.response) {      
      if (error.response.status === 404) {
        _message = error.response.data.message;
        toast.error(_message);
               
      }
      if (error.response.status === 400) {
        _message = error.response.data.message;
        toast.error(_message);
         
      }
      if (error.response.status === 500) {
        _message = error.response.data.message;
        toast.error(_message);
         
    }
    }  
    return thunkAPI.rejectWithValue(_message);  
    
  }
});
export const applyCouponCode = createAsyncThunk("cart/applyCouponCode", async (data, thunkAPI) => {
  try {
    let url = `${BASE_URL}/applycode`;
    const token = thunkAPI.getState().auth.user.token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }   
    
    const response = await axios.post(url, { coupon_code:data.coupon_code, cartTotal:data.cartTotal }, config);    
    return response.data;
    
  } catch (error) {
    let message
    if (error.response) {
      if (error.response.status === 400) {
        message = error.response.data.message
        toast.error(message)
      }
      if (error.response.status === 404) {
        message = error.response.data.message
        toast.warning(message)
      }
      if (error.response.status === 500) {
        message = error.response.data.error
        toast.error(message)
      }
    }
    
    return thunkAPI.rejectWithValue(message);
  }
  
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setUserAddress: (state, action) => {
      state.billing = action.payload;
    },
    setUserPaymentMode: (state, action) => {
      state.payment_mode = action.payload;
    },
    incrementProduct: (state, action) => {
      state.quantity += 1;
    },
    decrementProduct: (state, action) => {
      const minCount = 1;
      if (state.quantity > minCount) {
        state.quantity -= 1;
      }
    },
    deleteDiscount: (state,action) => {
      state.discount = 0
      state.discounted_price = 0
    },
    reset: (state,action)=>{
      state.totalcartItems = 0
      },
  },

  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getCartItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItem = action.payload;
        state.message = action.payload.message;
        toast.success(state.message, { position: "top-right" });
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
      })  
      .addCase(totalItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(totalItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalcartItems = action.payload;
      })
      .addCase(totalItems.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteCartItems.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(cartTotal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartTotal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.total = action.payload.total;
      })
      .addCase(cartTotal.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(incrementCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(incrementCartItem.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(decrementCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(decrementCartItem.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getUserCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.$cartItems = action.payload.carts;
      })
      .addCase(getUserCartItems.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(applyCouponCode.pending, (state, action) => {
        state.isLoading = true 
      })
      .addCase(applyCouponCode.fulfilled, (state, action) => {
        state.isLoading = false
        state.discount = action.payload.discount
        state.discounted_price = action.payload.total
      })     
      .addCase(applyCouponCode.rejected, (state, action) => {
        state.isLoading = false
      })
   
  }
});
export const {  setUserAddress, setUserPaymentMode, incrementProduct, decrementProduct,deleteDiscount,reset } = cartSlice.actions;

export default cartSlice.reducer


