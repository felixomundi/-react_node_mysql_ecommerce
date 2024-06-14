import { useState, useEffect,Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { forgotPasswordRequest, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {  Form} from 'react-bootstrap'
import "../assets/css/auth.css"
import { validateEmail } from '../features/auth/authService'
export default function ForgotPassword() {

const [formData, setFormData] = useState({
email: ''
})

const { email} = formData

const navigate = useNavigate()
    const dispatch = useDispatch();
    const [redirect] = useSearchParams();
    const route = redirect.get("redirect") ?? '/';  
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (user) {
            navigate(route);
        }
        if (isSuccess) {
            toast.success(message);
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate,route,dispatch]);

const onChange = (e) => {
setFormData((prevState) => ({
...prevState,
[e.target.name]: e.target.value,
}))
}

const onSubmit = (e) => {
e.preventDefault()

if (!email) {
return toast.error("Please enter your email");
}

if (!validateEmail(email)) {
return toast.error("Please enter a valid email");
}
const userData = {
email,
}

dispatch(forgotPasswordRequest(userData))
}

if (isLoading) {
return <Spinner />
}

return (
<Fragment>

<div className="auth row">
<div className="col-md-4"></div>      
            <div className="col-md-8">
            <h1>Forgot Password</h1>
<Form onSubmit={onSubmit}>
<div className="colm-form">
<div className="form-container mt-3">
<label htmlFor="email">Email</label>
<input type="email"
name="email"
value={email} onChange={onChange}
placeholder="Enter your email" />
<button type="submit" className="btn-login">Forgot Password</button>
<Link to="/login">Sign In?</Link>
<Link  to="/register" className="btn-new">Create new Account</Link>
</div>

</div>
</Form>
</div>
</div>

</Fragment>
)
}


