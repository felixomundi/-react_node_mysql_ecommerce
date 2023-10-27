import axios from "axios"
import { Form,Button } from "react-bootstrap";
import { useState } from "react"

function Mpesa() {
const [amount, setAmount] = useState("");
const [phone, setPhone] = useState("")
const [error, setError] = useState("")
const [loading,setLoading] = useState(false)
const onSubmit = async (e) => {
const url = "http://127.0.0.1:5000/api/mpesa/stk"
e.preventDefault();
    try {
    setLoading(true)
const response = await axios.post(url, { amount, phone });
if (response.data) {
setLoading(false)
}
    } catch (error) {
        setLoading(true)
console.log(error.response.data) 
        setError(error.response.data)
        setLoading(false)
}

}

return (
<div className="container-fluid m-5">
<div className="row justify-content-center">
<div className="col-md-8">
<div className="card"></div>
<Form onSubmit={onSubmit}>
<div className="form-group mb-2">
<label htmlFor="phone">Phone</label>
<input type="number" value={phone} name="phone" onChange={(e) => setPhone(e.target.value)} />
</div>
<div className="form-group">
<label htmlFor="amount">Amout</label>
<input type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
</div>
                    {error && <p className="text-danger">{error}</p>}     
                    {loading ? (
                        <p>Loading</p>
                        
                    ):  (
                        <div className="form-group">
<Button type="submit" className="btn btn-success">Pay Now</Button>
</div>  
)}                    
 
</Form>    
</div>
</div>
</div>
)
}

export default Mpesa