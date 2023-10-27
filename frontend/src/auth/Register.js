import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Register() {

const [email, setEmail] = useState("");
const [name, setName] = useState("");
//const [pic, setPic] = useState('');
const [password, setPassword] = useState("");
const [confirmpassword, setConfirmPassword] = useState("");

const navigate = useNavigate()
const dispatch = useDispatch()

const { user, isLoading, isError, isSuccess, message } = useSelector(
(state) => state.auth
)

useEffect(() => {
if (isError) {
toast.error(message)
}

if (isSuccess || user) {
navigate('/')
}

dispatch(reset())
}, [user, isError, isSuccess, message, navigate, dispatch])



const onSubmit = (e) => {
e.preventDefault()

if (password !== confirmpassword) {
toast.error('Passwords do not match')
} else {
const userData = {
name,
email,
//pic,
password,
}
dispatch(register(userData))
}
}

if (isLoading) {
return <Spinner />
}

return (
<div className="auth row">
<div className="col-md-4"></div>      
<div className="col-md-8">
<form onSubmit={onSubmit}>
<div className="colm-form">
<div className="form-container mt-3">
<label htmlFor="name">Name</label>
<input
className='form-control'
name='name'
type="text"
value={name}
required
placeholder="Enter Name"
onChange={(e) => setName(e.target.value)}
/>
<label htmlFor="email">Email</label>
<input
className='form-control'
required
id='email'
name='email'
value={email}
placeholder="Enter email"
onChange={(e) => setEmail(e.target.value)} />
<label htmlFor="password">Password</label>
<input
className='form-control'
id='password'
name='password'
type="password"
value={password}
required
placeholder="Password"
onChange={(e) => setPassword(e.target.value)}
/>
<label htmlFor="confirmpassword">Confirm Password</label>
<input
type='password'
className='form-control'
id='confirmpassword'
name='confirmpassword'
value={confirmpassword}
required
placeholder="Confirm Password"
onChange={(e) => setConfirmPassword(e.target.value)}
/>
<button type="submit" className="btn-login">Register</button>
<Link to="#">Forgotten password?</Link>
<Link to="/login" className="btn-new">login</Link>


</div>

</div>
</form>
</div>
</div>
)
}

export default Register
