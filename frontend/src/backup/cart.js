import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const URL = process.env.REACT_APP_BACKEND_URL;
const BASE_URL  = `${URL}/api/cart`

const initialState= {
cartItems: [],
amount: 0,
total: 0,
isLoading:true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems',
async (thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

    const response = await axios.get(BASE_URL,config);
console.log(response.data)
return response.data

} catch (error) {
console.log(error)
}
});
const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
clearCart: (state) => {
state.cartItems = [];

},
removeItem: (state, action) => {
//console.log(action)
const itemId = action.payload
state.cartItems = state.cartItems.filter((item) =>
item.id !== itemId
);
},
increase: (state, { payload }) => {
const cartItem = state.cartItems.find((item) => item.id === payload.id)
cartItem.amount = cartItem.amount + 1;
},
decrease: (state, { payload }) => {
const cartItem = state.cartItems.find((item) => item.id === payload.id)
cartItem.amount = cartItem.amount - 1;
},
calculateTotals: (state) => {
let amount = 0;
let total = 0;
state.cartItems.forEach((item) => {
amount += item.amount;
total += item.amount * item.price;
});
state.amount = amount;
state.total = total;
},
},
extraReducers: {
[getCartItems.pending]: (state) => {
state.isLoading = true;
},
[getCartItems.fulfilled]: (state, action) => {
state.isLoading = false;
state.cartItems = action.payload;
},
[getCartItems.rejected]: (state) => {
state.isLoading = false;
},
}
})


export const { clearCart,removeItem,increase, decrease,calculateTotals } = cartSlice.actions;

export default cartSlice.reducer


