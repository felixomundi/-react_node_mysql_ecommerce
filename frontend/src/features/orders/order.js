import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
const BASE_URL = `http://localhost:5000/api/v1/orders/`
const initialState = {
  isLoading: false,
  orders: [],
  order:{},
}

export const createOrder = createAsyncThunk("orders/createOrder", async (data, thunkAPI)=>{
    try {
      let url = `${BASE_URL}create`;
      const token = thunkAPI.getState().auth.user.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }       
        const response = await axios.post(url, data, config); 
        if (response.status === 200) {            
                toast.success(response.data.message);            
      }  
      return response.data;
      
    } catch (error) {
        let message;
        if (error.response) {
            if (error.response.status === 400) {
                message = error.response.data.message;
                toast.error(message);
            }
            if (error.response.status === 401) {
                message = error.response.data.message;
                toast.error(message);
          }
          if (error.response.status === 500) {
            message = error.response.data.message;
            toast.error(message);
        }
        }
        return thunkAPI.rejectWithValue(message);
    }
  }) 
export const userOrders = createAsyncThunk("orders/userOrders", async (_,thunkAPI) => {
  try {
    let URL = `${BASE_URL}user/orders`;
    const token = thunkAPI.getState().auth.user.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }       
    const response = await axios.get(URL, config);
    return response.data;
  } catch (error) {
    let message
    if (error.response) {
      if (error.response.status === 500) {
        message = error.response.data.message
        toast.error(message)
      }
      
    }
    return thunkAPI.rejectWithValue(message)
  }
})  
export const getOrder = createAsyncThunk("orders/getOrder", async (id, thunkAPI) => {
  try {
    let URL = `${BASE_URL}user/orders/findById/${id}`;
    const token = thunkAPI.getState().auth.user.token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }       
    const response = await axios.get(URL, config);
    return response.data;
  } catch (error) {
    console.log(error);
    let message 
    if (error.response) {
      if (error.response.status === 404) {
        message = error.response.data.message
        toast.warning(message)
      }
      if (error.response.status === 500) {
        message = error.response.data.message
        toast.error(message)
      }
    }
    return thunkAPI.rejectWithValue(message)
  }
})
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state, action)=> {
                state.isLoading =true
            })
            .addCase(createOrder.fulfilled, (state, action)=> {
                state.isLoading =false
            })
            .addCase(createOrder.rejected, (state, action)=> {
                state.isLoading =false
            })
           .addCase(userOrders.pending, (state, action) => {
            state.isLoading = true
           })
           .addCase(userOrders.fulfilled, (state, action) => {
             state.isLoading = false;
             state.orders = action.payload.orders;
           })
           .addCase(userOrders.rejected, (state, action) => {
             state.isLoading = false
             state.orders = [];
           })
           .addCase(getOrder.pending, (state, action) => {
            state.isLoading = true
           })
           .addCase(getOrder.fulfilled, (state, action) => {
             state.isLoading = false;
             state.order = action.payload.order;
           })
           .addCase(getOrder.rejected, (state, action) => {
             state.isLoading = false
             state.order = {};
           })
    }
})

export const selectOrder = state=>state.order.order

export default orderSlice.reducer