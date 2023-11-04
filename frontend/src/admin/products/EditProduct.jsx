import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getProduct, reset } from "../../features/products/productSlice";
import Spinner from '../../components/Spinner'


const UpdateProduct = () => { 
const { isError,  isLoading } = useSelector((state) => state.products);
    const product = useSelector(state => state.products.product); 
   
const { user } = useSelector((state) => ({ ...state.auth }));
const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState(product && product.name);
    const [quantity, setQuantity] = useState(product && product.quantity);
    const [description, setDescription] = useState(product &&  product.description);
    const [price, setPrice] = useState(product &&  product.price);
    const { id } = useParams();
    const [file, setFile] = useState();
    const [preview, setPreview] = useState()
  
        useEffect(() => {
            if (!user) {
            navigate('/login?redirect=/products')
            }
            if (user && user.role !== "admin") {
            navigate('/')
            }
            if(id) {
                dispatch(getProduct(id));            
            }
            if(isError) {
                navigate("/products");
            }

            //
            if (!file) {
            setPreview(undefined)
            return
            }
            dispatch(reset())
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)

        
        }, [user,navigate,dispatch,id,isError,file]);

      
    const handleSubmit = async(e) => {
        e.preventDefault();       
       
    }
    
    if (isLoading) {
        return <Spinner />
    }   
    
return (
    <div className="container-fluid py-5" >
        <div className="container">
            <div className="row justify-content-center">
                
                    <div className="col-md-10">
                        <div className="card shadow">
                        <div className="card-header">
                            <h3>Update Product</h3>
                            </div>
                       
                        <div className="card-body">
                        <div className="row">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group col-md-12 mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" name="price" value={price} onChange={(e)=>setPrice(e.target.value)}  className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input type="number" name="quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}  className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3">
                                    <label htmlFor="description">Description</label>
                                    <textarea name="description" value={description} onChange={(e)=>setDescription(e.target.value)}  className="form-control" />
                                    </div>
                                    <div className="form-group col-md-12 mb-3">
                                        <label htmlFor="image">Image</label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            name="image"
                                            accept="image/png, image/jpeg, image/jpg"
                                            onChange={(event) => {
                                            setFile(event.currentTarget.files[0]);
                                            }}
                                        />
                                        
                                    </div>
                                    <div className="col-md-12">
                                    {file &&  <img src={preview} alt=""  style={{width:"100px", height:"100px"}}/> }
                                    </div>
                                    <div className="py-3">
                                        <Link to="/products" className="btn btn-dark"> <i className="fa fa-backward"></i> Back</Link>
                                        <button className="btn btn-primary float-end" type="submit">Update</button>
                                    </div>
                        </form>
                   </div>
                        </div>
                        </div>
               </div>
            </div>
        </div>
</div>
);
};

export default UpdateProduct;
