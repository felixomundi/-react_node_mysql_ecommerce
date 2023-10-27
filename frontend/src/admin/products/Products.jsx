import {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'

import Spinner from '../../components/Spinner'
import {deleteProduct, getProductsByAdmin } from '../../features/products/productSlice'
import {Card, Container, Table,Button } from 'react-bootstrap'
import { reset } from '../../features/products/productSlice'
function Dashboard() {
const navigate = useNavigate()
const dispatch = useDispatch()

    const BASE_URL = process.env.REACT_APP_BACKEND_URL + "/";
    
const { user } = useSelector((state) => state.auth)
    const { products, isLoading, isError, message } = useSelector((state) => state.products);
   

useEffect(() => {

if (!user) {
navigate('/login')
}
if (user && user.role !== "admin") {
navigate("/")
}
dispatch(getProductsByAdmin())
dispatch(reset())
}, [user, navigate, isError, message,
dispatch
])

if (isLoading) {
return <Spinner/>
}


return (
<Container 
fluid style={{ minHeight: '90vh' }}
className='py-5'
>
{isLoading && (<Spinner/>)}
<div className="container">
<Card className='shadow mb-4 mt-2'>
<Card.Header className='py-3'>
<Link to="/addproduct" className='btn btn-primary'> <i className="fa fa-plus-circle"></i> Add New Product</Link>
</Card.Header>
<Card.Body>
<div className='table-responsive'>
{!isLoading && products.length === 0 ? (
<p>-- No product found, please add a product...</p>
) : (<>
<Table 
hover
responsive>
<thead>
<tr>
<th>#</th>
<th>Name</th>
<th>Price</th>
<th>Image</th>
<th>Date Created</th>
<th>Action</th> 
</tr>
</thead>
<tfoot>
<tr>
<th>#</th>
<th>Name</th>
<th>Price</th>
<th>Image</th>
<th>Date Created</th>
<th>Action</th> 
</tr>
</tfoot>
<tbody> 

{products.map((product, index) => {
const { id, name,  price, createdAt, image } = product;
return (
<tr key={id}>
<td>{index + 1}</td>
<td>{name.substring(0,10)}...</td>
<td>{price}</td>                  
<td>{<img src={`${BASE_URL}` +image} alt={name} style={{ width: '50px', height: '50px' }} />}</td> 
<td>{new Date(createdAt).toLocaleString('en-US')}</td>
<td className='d-flex'>

<Link to={`/products/${id}`}>  <Button><i className='fa fa-edit'></i></Button> </Link>
<Button onClick={() => dispatch(deleteProduct(id))} className='btn btn-danger ms-3'><i className='fa fa-trash'></i></Button>
</td>   
</tr>
);
})}  

</tbody>

</Table>

</>
)}

</div>
</Card.Body>    

</Card>
</div>

</Container>
)
}

export default Dashboard
