import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getProduct } from "../../features/products/productSlice";
import Spinner from '../../components/Spinner'


const UpdateProduct = () => { 
const { isError,  isLoading } = useSelector((state) => ({ ...state.products }));
    const product = useSelector(state => state.products.product);
    console.log(product);
const { user } = useSelector((state) => ({ ...state.auth }));
const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState(product.name);
    const [quantity, setQuantity] = useState(product.quantity);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
const { id } = useParams();

useEffect(() => {
if (id) {
    async function fetch() {
    await    dispatch(getProduct(id)); 
    }  
    fetch();
    }
    if (isError) {
        navigate("/products");
    }

}, [id, dispatch,isError, navigate]);

useEffect(() => {
if (!user) {
navigate('/login')
} else if (user && user.role !== "admin") {
navigate('/')
}
}, [user,navigate]);

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
                            <div className="card-header">Update Product</div>
                       
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
                                    <div className="py-3">
                                        <button className="btn btn-primary" type="submit">Update</button>
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
