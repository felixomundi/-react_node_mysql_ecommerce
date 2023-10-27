import React, { useEffect } from 'react'
import { useState } from 'react'
import{ Form,Button} from "react-bootstrap"
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
import { setUserPaymentMode } from '../features/cart/cartSlice'
import { toast } from 'react-toastify'
function Payment() {
const [paymentMethodName, setPaymentMethodName] = useState("");
    const { billing } = useSelector(state => state.cart);
    const user = useSelector(state => state.auth.user);

const navigate = useNavigate();
const dispatch = useDispatch();
    useEffect(() => {
if (!user) {
    navigate("/login");
}
if (!billing.address) {
navigate("/shipping");
}    
},[user, billing,navigate])
const onSelectPayment = (e) => {
    e.preventDefault(); 
    if (!paymentMethodName) {
        toast.error("Select Payment Method");
    } else {
    dispatch(setUserPaymentMode({ paymentMethodName }))
    localStorage.setItem("payment_mode", JSON.stringify({ paymentMethodName }));
    navigate("/placeorder");
    }

}
return (
<div className='container-fluid p-5' style={{minHeight: "80vh"}}>
<div className="row justify-content-center align-items-center">
<div className="col-md-8 col-sm-12">
<div className='mb-2'><CheckOutSteps step1 step2/></div>
<div className="card p-4">
<Form>
<div className="mb-2">
                            <div className="form-group">
                                <label htmlFor="payment_mode">Payment Mode</label>
                                <select name="payment_mode" className='form-control'  onChange={(e)=>setPaymentMethodName(e.target.value)}>
                                    <option value="">Select</option>
<option value="mpesa">Mpesa</option>
<option value="paypal">Pay Pal</option>
<option value="cod">COD</option>
</select>
</div>
</div>

<Form.Group className="mb-3">
<Button type="submit" className='btn btn-primary'  onClick={onSelectPayment}>PlaceOrder</Button>
</Form.Group>
</Form>
</div>
</div>
</div>
</div>
)
}

export default Payment