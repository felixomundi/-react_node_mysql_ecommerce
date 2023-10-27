import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import CheckOutSteps from './CheckOutSteps'
import { applyCouponCode, cartTotal, deleteDiscount, getCartItems, reset} from '../features/cart/cartSlice';
import  Spinner  from '../components/Spinner';
import { createOrder } from '../features/orders/order';
function Placeorder() {
  const navigate = useNavigate("");
  const { payment_mode, billing } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const cart = useSelector((state) => state.cart);
  const {isLoading }= useSelector((state) => state.cart);
  const [code, setCode] = useState("");
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=placeorder");
    }
    if (!payment_mode.paymentMethodName) {
      toast.error("you have not selected a payment method")
      navigate("/payment")
    }   
   
   
  }, [payment_mode, navigate, user, dispatch])
   


  const applyCode = async (e) => {
    e.preventDefault();
    if (!code) {
      toast.warning("Enter a valid coupon");
    }
    else {
      const data = {
        coupon_code:code,
        cartTotal:cart?.total
      }
      await dispatch(applyCouponCode(data));
    }   
  }
 
  if (isLoading) {
    return <Spinner></Spinner>
  }

  const deleteCouponCode = async(e) => {
    e.preventDefault();
    await dispatch(deleteDiscount());
  }

  let data; 
  data = {
    address: billing?.address,
    shipcode: billing?.shipcode,
    payment_mode: payment_mode?.paymentMethodName,
    total: cart?.total,
    discount:cart?.discount !== 0 ? cart?.discount : 0,
    discounted_total:cart?.discounted_price !== 0 ? cart?.discounted_price : 0,
    coupon_code:cart?.discounted_price !== 0 ? code : ""
  }
  
  const placeOrder = async () => {
    await dispatch(createOrder(data));
    await dispatch(getCartItems());
    await dispatch(cartTotal());
    await dispatch(getCartItems());
    dispatch(reset())
  }

  return (
    <div className="container py-5">
    <div className="row d-flex justify-content-center align-items-center h-100">
    
        <div className="card">
          <div className="card-body p-4">

            <div className="row">

                <div className="col-lg-7">
                <div className='mb-2'><CheckOutSteps step1 step2 step3/></div>
                  <h5 className="mb-3">
                    <span  className="text-body">Preview Your Order
                    </span>
                  </h5>
                            
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                       
                        <div className="ms-3">
                          <h5>Billing address</h5>
                            <p className="small mb-0">{billing?.address}, { billing?.shipcode}</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                         
                                                    <Link to="/shipping"> <i className="fa fa-pencil"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-3 mb-lg-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                       
                        <div className="ms-3">
                          <h5>Payment Mode</h5>
                          <p className="small mb-0">{payment_mode?.paymentMethodName}</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                       
                                                    <Link to="/payment"><i className="fa fa-pencil"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>                  

              </div>
              <div className="col-lg-5">
                <div className="card bg-primary text-white rounded-3">
                  <div className="card-body">
                   
                    <div className="d-flex justify-content-between">
                      {cart.discount === 0 && (
                        <>
                        <div className="input-group mb-3">
                            <input type="text" value={code} className="form-control" onChange = {(e)=>setCode(e.target.value)} placeholder="Enter Coupon Code"/>
                            <button className="btn btn-warning  text-light" onClick={applyCode} >Apply Code</button>
                       </div>
                        </>
                      )}
                  
                    </div>

                    <p className="small">Cart Summary</p>
                  

                    <hr className="my-2"/>

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Items Total</p>
                      <p className="mb-2">{cart?.totalcartItems}</p>
                    </div>
                    <hr className="my-2" />
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Sub Total</p>
                      <p className="mb-2">Ksh. {cart?.total}</p>
                    </div>
                    <hr className="my-2" />

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Discount
                        {cart.discount !== 0 && (
                          <>
                          <i className="fa fa-trash text-danger" onClick={deleteCouponCode}></i>
                          </>
                      )}
                      </p>
                      <p className="mb-2">-Ksh. {cart.discount} </p>
                    </div>
                    <hr className="my-2" />

                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Total</p>
                      <p className="mb-2">Ksh.
                       {cart.discounted_price !== 0 ? cart?.discounted_price : cart?.total}
                      
                      </p>
                    </div>
                    <hr className="my-2" />

                      <button type="button" onClick={()=>placeOrder()} className="btn btn-info btn-block">
                           Place Order
                    </button>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
 
  )
}

export default Placeorder