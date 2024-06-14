import { useState, useEffect,Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {reset, resetPasswordRequest } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {  Form} from 'react-bootstrap'
import "../assets/css/auth.css"
export default function ResetPassword() {

const [formData, setFormData] = useState({
password: ''
})

const { password } = formData

const navigate = useNavigate()
    const dispatch = useDispatch();
    const [redirect] = useSearchParams();
    const route = redirect.get("redirect") ?? '/';  
    const {token} = useParams();
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

if (!password) {
return toast.error("Please enter your password");
}

    const data = {
        token,
        password
    }

dispatch(resetPasswordRequest(data))
}

if (isLoading) {
return <Spinner />
}

return (
<Fragment>

<div className="auth row">
<div className="col-md-4"></div>      
            <div className="col-md-8">
                <h1>Reset Password</h1>
<Form onSubmit={onSubmit}>
<div className="colm-form">
<div className="form-container mt-3">
<label htmlFor="password">Password</label>
<input type="password"
name="password"
value={password} onChange={onChange}
placeholder="Enter your password" />
<button type="submit" className="btn-login">Reset Password</button>
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


