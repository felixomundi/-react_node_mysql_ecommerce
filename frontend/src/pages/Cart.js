
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { cartTotal, clearCart, decrementCartItem, deleteCartItems, getCartItems, incrementCartItem, totalItems } from '../features/cart/cartSlice';
import Spinner from '../components/Spinner';
function Cart() {
const user = useSelector(state => state.auth.user);
const cart = useSelector(state => state.cart);
const navigate = useNavigate();
const { isLoading } = useSelector(state => state.cart);
const dispatch = useDispatch();
function imageSrc() {
return process.env.REACT_APP_BACKEND_URL + "/";
}
const deleteCartItem = async (cartItem) => {        
await dispatch(deleteCartItems(cartItem.id));
await dispatch(getCartItems());
await dispatch(totalItems());
await dispatch(cartTotal());
}
useEffect(() => {
if (!user) {
navigate("/login")
}
if (user) {
dispatch(getCartItems())
    dispatch(cartTotal());
    dispatch(cartTotal());
}

},[dispatch,user, navigate])
if (isLoading) {
return <Spinner></Spinner>
}
const clearuserCart = async () => {
await dispatch(clearCart());
await dispatch(getCartItems());
await dispatch(totalItems());
await dispatch(cartTotal());
}

const increment = async (cartItem) => {  
await dispatch(incrementCartItem(cartItem));
await dispatch(getCartItems());
await dispatch(totalItems());
await dispatch(cartTotal());
}
const decrement = async (cartItem) => {
await dispatch(decrementCartItem(cartItem));
await dispatch(getCartItems());
await dispatch(totalItems());
await dispatch(cartTotal()); 
}
const redirectHome = () => {
navigate("/")
}
const redirectShipping = () => {
navigate("/shipping")
}
return (

<div className="cart h-100" style={{backgroundColor: "#eee"}}>
<div className="container h-100 py-5">
<div className="row d-flex justify-content-center align-items-center h-100">
<div className="col-md-12">
<div className="d-flex justify-content-between align-items-center mb-4">
<h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
<div>

</div>
</div>


{cart.cartItems.length ===0 ? (

<div className='card rounded-3 mb-4'>
<div className="card-body">
<h2>Your cart is empty</h2>
<Link to="/" className='btn btn-primary'><i className='fa fa-backward'> </i> Continue Shopping</Link>
</div>
</div>

) : (
<div className='row'>{
cart.cartItems?.map(cartItem =>
(


<div className="col-lg-12" key={cartItem.id}>
<div className="card rounded-3 mb-4">
<div className="card-body p-4">
<div className="row d-flex justify-content-between align-items-center">
<div className="col-md-2 col-lg-2 col-xl-2">
{cartItem.Product.image && (
<img
src={imageSrc() + cartItem.Product.image }
className="img-fluid rounded-3" alt={ cartItem.Product.name} />
)}
</div>
<div className="col-md-3 col-lg-3 col-xl-3">
<p className="lead fw-normal mb-2">{cartItem.Product.name}</p>
<p><span className="text-muted">Price: </span>{cartItem.Product.price} </p>
</div>
<div className="col-md-3 col-lg-3 col-xl-2 d-flex">
<button className="btn btn-link px-2" onClick={()=>decrement(cartItem.Product.id)}>
<i className="fas fa-minus"></i>
</button>

<input readOnly defaultValue={cartItem.quantity}  type="number"
className="form-control form-control-sm" />

<button className="btn btn-link px-2" onClick={()=>increment(cartItem.Product.id)}>                 
<i className="fas fa-plus"></i>
</button>
</div>
<div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
<h5 className="mb-0">Total Ksh.{ cartItem.total}</h5>
</div>
<div className="col-md-1 col-lg-1 col-xl-1 text-end">
<button onClick={() =>deleteCartItem(cartItem)} className='btn-dangers'><i className="fas fa-trash fa-lg text-danger"></i></button>
</div>
</div>
</div>
</div>
</div>


))}

<div className="row">
<div className="col-md-12">
<div className="card rounded-3 p-3">
<div className="card-body">
<div className="row">
<div className="col-md-6">
<div><h4>Cart Summary</h4></div>
<p className='cart-items'>Cart Items: {cart.totalcartItems }</p>
<p className='cart-total'>Cart Total : Ksh.{cart.total}</p>
</div>
<div className="col-md-6">
<div className="mb-3">
<button className="checkout w-50" onClick={redirectShipping}> <Link  to='#'>Checkout</Link></button>
</div>
<div className="mb-4">
<button className='home w-50' onClick={redirectHome}><Link  to="#">Continue Shopping</Link></button>
</div>    
<div className="mb-3">
<button className="btn btn-danger w-50" onClick={ clearuserCart}> Clear Cart </button>
</div>   
</div>
</div>                          
</div>
</div>
</div>
</div>
</div>

)} 


</div>
</div>
</div>
</div>
)
}

export default Cart