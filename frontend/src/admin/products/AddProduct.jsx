import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { reset,createProduct } from '../../features/products/productSlice'
import Spinner from '../../components/Spinner'
function EditProduct() {

const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [image, setImage] = useState();
const [description, setDescription] = useState("");  
const[quantity, setQuantity] = useState("");
const navigate = useNavigate()
const dispatch = useDispatch()

const {user} = useSelector((state)=>state.auth)
const { products, isLoading } = useSelector((state) => state.products);

useEffect(() => {

if (!user) {
navigate('/login')
}
if (user && user.role !== "admin") {
navigate('/')
}

dispatch(reset())
}, [user, products,  navigate, dispatch]);

const onSubmit = (e) => {
e.preventDefault()

const productData = {
name,
price,
image,
description,
quantity,
}
const formData = new FormData();
formData.append("name", productData.name);
formData.append("quantity", productData.quantity);
formData.append("price", productData.price);
formData.append("image", productData.image);
formData.append("description", productData.description);

dispatch(createProduct(formData));


}

const handleFileChange = (e) => {
setImage(e.target.files[0]);
}  

if (isLoading) {
return <Spinner />
}

return (

<Container className='py-5'>
<div className="container">
<Row className='justify-content-center'>
<Col md={10} xl={10} sm={12} className="">
<div className="card-header">
Add Product
</div>

<Form className='my-2' onSubmit={onSubmit} encType='multipart/form-data'>
<div className="form-floating mb-3">
<input type="text" className="form-control"  name="name"
value={name}
onChange={(e) => setName(e.target.value)}
placeholder="Enter Product Name" />
<label htmlFor="name">Name</label>
</div>
<div className="form-floating mb-3">
<lebel htmlFor="quantity">Quantity</lebel>
<input type="number" className='form-control' name='quantity' value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
</div>
<div className="form-floating mb-3">
<input type="number" className="form-control" min="0" name="price"  placeholder="Enter Price"
value={price}
onChange={(e) =>setPrice(e.target.value)}
/>
<label htmlFor="price">Price</label>
</div>

<div className="form-floating mb-3">
<textarea type="text" className="form-control"
value={description}
onChange={(e) =>setDescription(e.target.value)}
name="description" 

placeholder="Enter Description"></textarea>
<label htmlFor="description">Description</label>
</div>
<div>

<label htmlFor="Image" className='mb-2'>Image</label>
<div className="form-floating mb-3">
<input type="file" name="image" className="form-control" onChange={handleFileChange} />
</div>
</div>

<div className='my-2'>
<Button type="submit" className="btn btn-primary">Add Product</Button> 
</div>
</Form>
</Col>        
</Row>
</div>
</Container>  
)
}

export default EditProduct
