import { Link } from 'react-router-dom'
import {Row} from 'react-bootstrap'
import paypal from '../assets/images/paypal.png'
import {  useDispatch,useSelector} from 'react-redux'
import { addToCart, decrease, removeItem,calculateTotals, clearCart } from '../features/cart/cartSlice'
import { useEffect } from 'react'
const Cart = () => {
 const dispatch = useDispatch();  
const  cart = useSelector((state)=>state.cart)
  useEffect(()=> {
      dispatch(calculateTotals())
  }, [cart,dispatch])


return (

<div className="container py-5">
<div className="row d-flex justify-content-center align-items-center">
<div className="col-md-8">
<div className="card mb-4">
<div className="card-header py-3">
<h5 className="mb-0">Your Cart</h5>
</div>
<div className="card-body">
{cart.cartItems.length === 0 ? (<div>
<section>
<header>

<h2>Your cart is empty</h2>
<Link to="/"><button className='btn btn-info'><i className='fa fa-reply'> Back Home</i></button></Link>
</header>
</section>
</div>
) : (
<div>{
cart.cartItems?.map(cartItem =>
(

  <Row key={cartItem._id}>
<div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
<div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
<img src={cartItem.image}
className="w-100" alt={cartItem.name} />
<Link to="#">
<div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
</Link>
</div>

</div>

<div className="col-lg-5 col-md-6 mb-4 mb-lg-0">

<p><strong>{cartItem.name}</strong></p>
      <p>Price:{ cartItem.price}</p>
<button type="button" className="btn btn-primary btn-sm me-1 mb-2" onClick={() =>dispatch(removeItem(cartItem))} data-bs-toggle="tooltip"
title="Remove item">
<i className="fas fa-trash"></i>
</button>             

<button type="button" className="btn btn-danger btn-sm mb-2" data-bs-toggle="tooltip"
title="Move to the wish list">
<i className="fas fa-heart"></i>
</button>

</div>

<div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
<div className="input-group quantity mx-auto" style={{ width: '120px' }}>
<div className="input-group-btn">

<button className="btn btn-sm btn-primary btn-minus me-2" onClick={() => dispatch(decrease(cartItem))}>
<i className="fa fa-minus"></i>
                    </button>


</div>
  
  <p  className="form-control bg-light d-flex border-0 text-center text-dark">{cartItem.amount}</p>
<div className="input-group-btn">
<button className="btn btn-sm btn-primary btn-minus me-2" 
 onClick={                             
 () => {
dispatch(addToCart(cartItem ))
}}
>
<i className="fa fa-plus"></i>
</button>
</div>
</div>

<p className="text-start text-md-center">Sub-Total
        <strong className='ml-1'>${cartItem.price * cartItem.amount}</strong>
</p>

</div>
<hr className="my-4" />
</Row>         
))}
</div>
)} 


{/* Another Item */}
</div>
</div>
<div className="card mb-4">
<div className="card-body">
<p><strong>Expected shipping delivery</strong></p>
<p className="mb-0">12.10.2020 - 14.10.2020</p>
</div>
</div>
<div className="card mb-4 mb-lg-0">
<div className="card-body">
<p><strong>We accept</strong></p>
<img className="me-2" style={{ width:"45px" }}
src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
alt="Visa" />
<img className="me-2" width="45px"
src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
alt="American Express" />
<img className="me-2" style={{ width:"45px" }}
src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
alt="Mastercard" />
<img className="me-2" style={{ width:"45px" }}
src={paypal}
alt="PayPal acceptance mark" />
</div>
</div>
</div>
<div className="col-md-4">
<div className="card mb-4">
<div className="card-header py-3">
<h5 className="mb-0">Summary</h5>
</div>
<div className="card-body">
<ul className="list-group list-group-flush">
<li
className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
Products
<span>$53.98</span>
</li>
<li className="list-group-item d-flex justify-content-between align-items-center px-0">
Shipping
<span>Gratis</span>
</li>
<li
className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
<div>
<strong>Total amount</strong>
<strong>
<p className="mb-0">(including VAT)</p>
</strong>
</div>
<span><strong>${cart.total.toFixed(2)}</strong></span>
<span>total</span>
</li>
</ul>

<Link to="/shipping" >
<button className="btn btn-primary mb-3 me-3">Go to checkout</button>
</Link>
<button className='btn btn-danger' onClick={() =>dispatch(clearCart())}>Clear Cart</button>
</div>
</div>
</div>
</div>
</div>
)
}

export default Cart