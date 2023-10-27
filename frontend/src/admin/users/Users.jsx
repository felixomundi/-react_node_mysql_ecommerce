import {useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Spinner from '../../components/Spinner'
import {   getUsers, reset } from '../../features/auth/authSlice'
import {Card, Container, Table,Button,Form,Modal } from 'react-bootstrap'
function Users() {
const navigate = useNavigate()
const dispatch = useDispatch()
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const { users,user, isLoading, isError, message } = useSelector((state) => state.auth)
useEffect(() => {
if (!user) {
navigate('/login')
}
if(user && user.role !== "admin") {
navigate("/")
}
dispatch(getUsers())
dispatch(reset())
}, [user, navigate, isError, message,
dispatch
])
if (isLoading) {
return <Spinner/>
}
return (
<Container fluid style={{ minHeight:'90vh' }}>
<Card className='shadow mb-4 mt-2'>
<Card.Header className='py-3'>
<Link to="/add-user"><Button><i className='fa fa-plus'></i> New User</Button></Link>
</Card.Header>
<Card.Body>

<div className='table-responsive'>
{!isLoading && users.length === 0 ? (
<p>-- No users in the database...</p>
) : (
<Table  bordered hover responsive>
<thead>
<tr>
<th>#</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>
</tr>
</thead>
<tfoot>
<tr>
<th>#</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Action</th>
</tr>
</tfoot>
<tbody>
{users.map((singleuser, index) => {
const { _id, name,  email, role } = singleuser;
return (
<tr key={_id}>
<td>{index + 1}</td>
<td>{name}</td>
<td>{email}</td>
<td>{role}</td>
<td className='d-flex'>

<Button className='mr-2' variant="primary" onClick={ handleShow}><i className='fa fa-eye'></i></Button>
<Modal show={show}  onHide={handleClose} key={_id}>
<Modal.Header closeButton>
<Modal.Title>View User</Modal.Title>
</Modal.Header>
<Modal.Body>
<Form>
<Form.Group className="mb-3" controlId="name">
<Form.Label>Name</Form.Label>
<Form.Control
type="text"
autoFocus
defaultValue={name}
disabled                           
/>
</Form.Group>
<Form.Group
className="mb-3"
controlId="email"
>
<Form.Label>Email</Form.Label>
<Form.Control as="input"
defaultValue={email}
disabled
/>
</Form.Group>
<Form.Group
className="mb-3"
controlId="role"
>
<Form.Label>Role</Form.Label>
<Form.Control as="input"
defaultValue={role}
disabled
/>
</Form.Group>
</Form>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
Close
</Button>
</Modal.Footer>
</Modal>
<Link to={`/users/${_id}`}>
<Button className='btn-light mb-2'><i className='fa fa-pencil'></i></Button>
</Link>
{/* <Button onClick={() => dispatch(deleteUser(_id))}  className='ml-1 btn-danger'><i className='fa fa-trash'></i></Button> */}
</td>
</tr>
);})}
</tbody>
</Table>
)}
</div> 
</Card.Body> 

</Card>

</Container>
)
}

export default Users
