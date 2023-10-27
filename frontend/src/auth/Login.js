import { useState, useEffect,Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {  Form} from 'react-bootstrap'
import "../assets/css/auth.css"
import { validateEmail } from '../features/auth/authService'
function Login() {

const [formData, setFormData] = useState({
email: '',
password: '',
})

const { email, password } = formData

const navigate = useNavigate()
    const dispatch = useDispatch();
    const [redirect] = useSearchParams();
    const route = redirect.get("redirect") ?? '/';  

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate(route);
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
else if (!password) {
return toast.error("Please enter your password");
}

if (!validateEmail(email)) {
return toast.error("Please enter a valid email");
}
const userData = {
email,
password,
}

dispatch(login(userData))
}

if (isLoading) {
return <Spinner />
}

return (
<Fragment>

<div className="auth row">
<div className="col-md-4"></div>      
<div className="col-md-8">
<Form onSubmit={onSubmit}>
<div className="colm-form">
<div className="form-container mt-3">
<label htmlFor="email">Email</label>
<input type="email"
name="email"
value={email} onChange={onChange}
placeholder="Enter your email" />
<label htmlFor="password">Password</label>
<input   type='password'
id='password'
className='form-control'
name='password'
value={password}
placeholder='Enter password'
onChange={onChange}/>
<button type="submit" className="btn-login">Login</button>
<Link to="#">Forgotten password?</Link>
<Link  to="/register" className="btn-new">Create new Account</Link>
</div>

</div>
</Form>
</div>
</div>

</Fragment>
)
}

export default Login
