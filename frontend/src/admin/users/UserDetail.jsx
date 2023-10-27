import React, { useState,useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateUserDetails } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'
import {MDBValidation,MDBInput} from "mdb-react-ui-kit";
const initialState = {
    name: "",
    email: "",
    role: "",
   // password:"",
    };
const UserDetail = () => {
const navigate = useNavigate()
const dispatch = useDispatch()
const { user } = useSelector((state) => state.auth)
    const [userData, setUserData] = useState(initialState);
    const { users, isLoading, isError, message } = useSelector(state => state.auth)        
    const { name, role, email } = userData;
    const { id } = useParams();  
    
useEffect(() => {
if (id) {
const singleUser = users.find((item) => item._id === id);
setUserData({ ...singleUser });
}
}, [id,users]);

useEffect(() => {
if (!user) {
navigate('/login')
}
if (user && user.role !== 'admin') {
navigate('/')
    }
    if(isError) {
        toast.error(message)
    }
},[user,navigate,isError,message])

    
const handleSubmit = (e) => {
e.preventDefault();
if (name && email && role) {
const updatedUserData = { ...userData };
if (id){       
dispatch(updateUserDetails({ id, updatedUserData }));
}
    handleClear();
    navigate('/users')
}
    };
    
const onInputChange = (e) => {
const { name, value } = e.target;
setUserData({ ...userData, [name]: value });
 console.log(userData)
};

const handleClear = () => {
setUserData({ name: "", description: "", price: "" });
};

    if (isLoading) {
    return<Spinner/>
} 
    
    
return (
<section className="h-100 gradient-custom-2">
<div className="container py-5 h-100">
<div className="row d-flex justify-content-center align-items-center h-100">
<div className="col-lg-9 col-xl-7">
<Card>                         
<div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
Update user details
</div>
<Card.Body className="card-body p-4 text-black">
<MDBValidation onSubmit={handleSubmit} noValidate>    
<div className="mb-2">
<label htmlFor="name">Name</label>
<MDBInput
placeholder="Enter Name"
type="text"
value={name}
name="name"
onChange={onInputChange}
className="lead form-control fw-normal mb-1"
required
invalid
validation="Please provide Name"
/>
</div>
<div className="mb-2">
<label htmlFor="email">Email</label>
<MDBInput
placeholder="Enter An email"
type="email"
value={email}
name="email"
onChange={onInputChange}
className="lead form-control fw-normal mb-1"
required
invalid
validation="Please provide an email"
/>
</div>
<div className="mb-2">
<label htmlFor="role">Role</label>
<Form.Select aria-label="role"
onChange={onInputChange}
name="role" value={role} >
<option value={role}>{role}</option>
<option value="admin">Admin</option>
<option value="user">User</option>
</Form.Select>
</div>
<div className="d-flex justify-content-between align-items-center mt-2 mb-4">
<Button type="submit" className="lead fw-normal mb-0">Update</Button>
</div>

</MDBValidation>

</Card.Body>
</Card>
</div>
</div>
</div>
</section>
)
}

export default UserDetail