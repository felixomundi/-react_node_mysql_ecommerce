import {
  createAsyncThunk,
createSlice,
//createAsyncThunk
} from '@reduxjs/toolkit'
//import cartItems from '../../cartItem'
//import axios from 'axios'
import { toast } from 'react-toastify';
//const url = 'https://course-api.com/react-useReducer-cart-project';
// const cart = JSON.parse(localStorage.getItem('cart'))
// const address = JSON.parse(localStorage.getItem("address"))
import axios from "axios";

const initialState= {
cartItems:localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): [],
  billing: localStorage.getItem('billing') ? JSON.parse(localStorage.getItem('billing')) : {},
  payment_mode:localStorage.getItem('payment_mode') ? JSON.parse(localStorage.getItem('payment_mode')): {},
// cartItems: cart ? cart : [],
amount: 0,
total: 0,
isLoading:false,
}

// export const getCartItems = createAsyncThunk('cart/getCartItems',
// async () => {
// try {
// const resp = await axios(url)
// // console.log(resp.data)
// return resp.data

// } catch (error) {

// }});

export const placeOrder = createAsyncThunk(
  "cart/placeorder",
  async (_,thunkAPI) => {
    try {
      const response = await axios.post("")
      if (response.data) {
        
      }
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      const message = error.response.data;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);

    }
  
})
const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
clearCart: (state) => {
state.cartItems = [];
localStorage.setItem("cart", JSON.stringify(state.cartItems));
toast.error("Cart cleared", { position: "top-right" });
  },
  
addToCart: (state, action) => {
const itemIndex = state.cartItems.findIndex(
(item) => item._id === action.payload._id);
if(itemIndex >= 0) {
state.cartItems[itemIndex].amount += 1;
toast.info(`Increased ${action.payload.name} quantity`, {
position: "top-right",
});

} else{
const tempProduct = { ...action.payload, amount: 1 };
state.cartItems.push(tempProduct);
toast.success(`${action.payload.name} Added product to cart`,
{
position:"top-right",
})
}
localStorage.setItem('cart', JSON.stringify(state.cartItems))
},

decrease(state, action) {
const itemIndex = state.cartItems.findIndex(
(item) => item._id === action.payload._id
);
if (state.cartItems[itemIndex].amount > 1) {
state.cartItems[itemIndex].amount -= 1;

toast.info(`Decreased ${action.payload.name} quantity`, {
position: "top-right",
});
} else if (state.cartItems[itemIndex].amount === 1) {
const nextCartItems = state.cartItems.filter(
(item) => item._id !== action.payload._id
);
state.cartItems = nextCartItems;

toast.error(`${action.payload.name} removed from cart`, {
position: "top-right",
});
}

localStorage.setItem("cart", JSON.stringify(state.cartItems));
},


removeItem: (state, action) => {
const itemId = action.payload._id
state.cartItems = state.cartItems.filter((item) =>
item._id !== itemId);
localStorage.setItem('cart', JSON.stringify(state.cartItems))
toast.error(`${action.payload.name} removed from your cart`, {
position: "top-right",
});
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
  setUserAddress: (state, action) => {
    state.billing = action.payload;
  },
  setUserPaymentMode: (state, action) => {
    state.payment_mode = action.payload;
},
},
extraReducers: (builder) => {
    builder
    .addCase(placeOrder.pending,(state, action) => {
      state.isLoading = true;
    })
    .addCase(placeOrder.fulfilled,(state, action) => {
      state.isLoading = false;
    })
    .addCase(placeOrder.rejected,(state, action) => {
      state.isLoading = false;
    })
  
// [getCartItems.pending]: (state) => {
// state.isLoading = true;
// },
// [getCartItems.fulfilled]: (state, action) => {
// //   console.log(action)
// state.isLoading = false;
// state.cartItems = action.payload;
// },
// [getCartItems.rejected]: (state) => {
// state.isLoading = false;
// },
}
})

//console.log(cartSlice)

export const { clearCart,addToCart,removeItem, decrease,calculateTotals,setUserAddress,setUserPaymentMode } = cartSlice.actions;

export default cartSlice.reducer


