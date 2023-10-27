import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productDetail, reset } from "../../features/products/productSlice";
import Spinner from "../../components/Spinner";
import { addToCart, cartTotal, decrementProduct, getCartItems, incrementProduct, totalItems } from "../../features/cart/cartSlice";

function Detail() {
    
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isLoading} = useSelector(state => state.products);
    const product = useSelector(state => state.products.product);
    const quantity = useSelector(state => state.cart.quantity);
      
    useEffect(() => {
        
          dispatch(productDetail(id));
     
        if (isError) {
       return  navigate("/");
        }
        
        dispatch(reset())
    }, [id, dispatch, isError, navigate]);

    const BASE_URL = process.env.REACT_APP_BACKEND_URL ;
    if (isLoading) {
        return <Spinner></Spinner>
    }
    async function handleAddToCart($quantity) {
        $quantity = Number($quantity);
        let data = {
            productId: product.id,
            quantity:1,
        }       
        await dispatch(addToCart(data));
        await dispatch(getCartItems());
        await dispatch(cartTotal());
        await dispatch(totalItems());
    }

return (
<>
<div className="product-detail">
<div className="container py-5">
<div className="row">
<div className="col-12">
<div className="row">
<div className="col-md-5">                       
<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
<div className="carousel-inner">
<div className="carousel-item active">
<img src={`${BASE_URL}/` + product?.image} className="d-block w-100" alt=""/>
</div>
<div className="carousel-item">
<img src={`${BASE_URL}/` + product?.image} className="d-block w-100" alt=""/>
</div>

</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
<span className="carousel-control-prev-icon" aria-hidden="true"></span>
<span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
<span className="carousel-control-next-icon" aria-hidden="true"></span>
<span className="visually-hidden">Next</span>
</button>
</div>

</div>
<div className="col-md-7 product">
                                <h2>{ product?.name}</h2>
<div className="rating">
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
</div>
<div className="prod-desc">
<p>{product?.description}</p>
</div>
<h2>Ksh. {product?.price}</h2>
<h5>Quantity: <span className="text-danger">{product?.quantity}</span> Available</h5>
<div className="quantity">
<button className="decrease" onClick={()=>dispatch(decrementProduct())}><i className="fa fa-minus" ></i></button>
<input type="number" min="1" value={quantity}  readOnly/>
<button className="increase" onClick={()=>dispatch(incrementProduct())}><i className="fa fa-plus"></i></button>
</div>
<div className="buttons">
<button   className="button-1" onClick={()=>handleAddToCart(quantity)}><i className="fa fa-shopping-bag"></i></button>
<button><i className="fa fa-heart"></i></button>
<button><i className="fa fa-search"></i></button>
</div>
</div>
</div>
</div>           
</div>
</div>
</div>
<div className="prod-tabs">
<div className="container">
<div className="row">
<div className="col-12">
<ul className="nav nav-pills mb-3 nav-justified" id="pills-tab" role="tablist">
<li className="nav-item" role="presentation">
<button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Description</button>
</li>
<li className="nav-item" role="presentation">
<button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Features</button>
</li>
<li className="nav-item" role="presentation">
<button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Reviews</button>
</li>
</ul>
<div className="tab-content" id="pills-tabContent">
<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
<div className="row">
<h4>Product Description</h4>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum minima sit accusamus nemo culpa est necessitatibus ea aut, odit soluta beatae dolor numquam laboriosam nihil. Similique iure, error, placeat sapiente veniam repellendus aliquid minima, at voluptas provident recusandae ut? Blanditiis voluptas atque odit id suscipit laborum aperiam vitae quaerat consequuntur. </p>
</div>
</div>
<div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
<div className="row">
<h4>Product Features</h4>
<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos beatae assumenda soluta iste praesentium necessitatibus ex quis qui, doloribus impedit vel ullam temporibus cupiditate adipisci cumque eos quod aliquam fuga amet. Dolores excepturi magni corrupti exercitationem, alias amet accusamus vero. Voluptas labore beatae, neque illum ab omnis amet id provident tenetur modi deserunt repellat distinctio consequatur, voluptatem vitae, animi explicabo!</p>
</div>
</div>
<div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
<div className="row">
<h4>Felix Omundi - <span>01-14-2023</span> </h4>
<p> <i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i></p>
<p className="rev-desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae pariatur illo odio perferendis maxime temporibus repellat veritatis fuga accusamus! Voluptatem?</p>        
<form action="">
<p>Give Your Review</p>
<div className="rating mb-3">
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
<i className="fa fa-star"></i>
</div>
<div className="row">
<div className="col-md-6 mb-3">
<input type="text" placeholder="Name" className="form-control"/>
</div>
<div className="col-md-6 mb-3">
<input type="email" placeholder="Email" className="form-control"/>
</div>
<div className="col-md-12 mb-3">
<textarea name="review" id="" cols="5" rows="5" placeholder="Review" className="form-control"></textarea>
</div>
<div>
<button className="submit" type="button">Submit</button>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</>  

)
}

export default Detail;