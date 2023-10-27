import { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Button,Form } from 'react-bootstrap';
import { useState } from 'react';
import { setUserAddress } from "../features/cart/cartSlice"
import CheckOutSteps from './CheckOutSteps';
const Shipping = () => {
const { user } = useSelector(state => state.auth)
const navigate = useNavigate();
const dispatch = useDispatch();
useEffect(() => {
if (!user) {
    navigate("/login?redirect=/shipping");
}
}, [user, navigate])
const { billing } = useSelector(state => state.cart);
const [shipcode, setShipcode] = useState(billing.shipcode || '')

const [address, setAddress] = useState(billing.address || '')

const onSubmit = (e) => {
e.preventDefault()  
dispatch(setUserAddress({ address, shipcode }))
localStorage.setItem("billing", JSON.stringify({ address, shipcode }))
    navigate("/payment");
}

return (
<>
<div className="container-fluid py-5" style={{ minHeight:"90vh" }}>
<div className="row d-flex justify-content-center align-items-center">
<div className="col-lg-8">
<div className='mb-2' ><CheckOutSteps></CheckOutSteps></div>

<div className="card shadow p-4">
            <div className="card-header">
            <h2>Shipping Address</h2>
</div>

<div className="card-body">
<Form onSubmit={onSubmit}>

<div className="mb-3">
<label htmlFor="shipcode" className="form-label">Shipcode</label>
<input type="text" required onChange={(e) => setShipcode(e.target.value)} value={shipcode} name="shipcode" className="form-control"  />

</div>
<div className="mb-3">
<label htmlFor="address" className="form-label">Address</label>
<input type="text" required onChange={(e) => setAddress(e.target.value)} value={address}  className="form-control" name="address"/>
</div>

<Button type="submit" className="btn btn-primary">Submit</Button>

</Form>
</div>
</div>
</div>
</div>
</div>


</>

)
}

export default Shipping;