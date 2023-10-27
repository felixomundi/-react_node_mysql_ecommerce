import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartSlice'
import productReducer from '../features/products/productSlice'
import contactReducer from '../features/contact/contactSlice'
import couponReducer from '../features/coupons/couponSlice'
import  orderReducer  from '../features/orders/order'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    contact: contactReducer,
    coupon: couponReducer,
    order:orderReducer,
    
  
  },
})
