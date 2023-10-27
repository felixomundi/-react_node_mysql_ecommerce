import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/home/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Profile from './auth/Profile'
import { Fragment, useEffect } from 'react'
import Contact from './pages/contact/Contact'
import Cart from './pages/Cart'
import ProductDetail from './pages/productdetail/Detail'
import Footer from './components/Footer'
import Shipping from './pages/Shipping'
import Products from './admin/products/Products'
import AddProduct from './admin/products/AddProduct'
import EditProduct from './admin/products/EditProduct'
import Users from './admin/users/Users'
import UserDetail from './admin/users/UserDetail'
import NewUser from './admin/users/NewUser'
import Payment from './pages/Payment'
import Placeorder from './pages/Placeorder'
import Subscribe from './components/Subscribe'
import { useDispatch, useSelector } from 'react-redux'
import { cartTotal, getCartItems, totalItems } from './features/cart/cartSlice'
import CartItems from './admin/carts/CartItems'
import Coupons from './admin/coupons/Coupons'
import CreateCoupon from "./admin/coupons/Create";
import Order from "./pages/order/Order"
import OrderDetail from './pages/order/OrderDetail'
import NotFoundPage from "./pages/NotFoundPage.js";
function App() { 
  const dispatch = useDispatch();  
  const  user  = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {     
      dispatch(getCartItems());
      dispatch(totalItems());
      dispatch(cartTotal());
    }
 },[dispatch, user])
  return (
    <Fragment>
      <Router>
        <div>        
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart />} />           
            <Route path='/detail/:id' element={<ProductDetail />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<EditProduct />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<UserDetail />} />
            <Route path='/add-user' element={<NewUser />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/placeorder' element={<Placeorder />} />
            <Route path='/orders' element={<Order />}></Route>
            <Route path='/orders/:id' element={<OrderDetail/>}></Route>
            <Route path='/admin/cartItems' element={<CartItems />} />
            <Route path='/admin/coupons' element={<Coupons />} />
            <Route path='/admin/coupons/create' element={<CreateCoupon />} />
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
          <Subscribe/>
          <Footer/>
        </div>
      </Router>
      <ToastContainer  />
    </Fragment>
  )
}
export default App
