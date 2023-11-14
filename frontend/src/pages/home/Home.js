import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./home.css";
import cartIcon from "./../../assets/images/cartIcon.png";
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import { homeProducts } from '../../features/products/productSlice';
import { addToCart, cartTotal, getCartItems, totalItems } from '../../features/cart/cartSlice';

function Home() {
const navigate = useNavigate()
const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const { products, isLoading  } = useSelector((state) => state.products);  
  const baseUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {  
    
    dispatch(homeProducts());    

  }, [user, navigate,  dispatch])

  const handleAddToCart = async(product) => {
    let data = {
      productId: product.id,
      quantity:1,
    }
    await dispatch(addToCart(data));
    await dispatch(totalItems());
    await dispatch(getCartItems());
    await dispatch(cartTotal());
    
  }   
  const redirectToLogin = ()=>{
    navigate("/login");
 }
  return (
      <>       
  
      <div className="products">
       
  <div className="container-fluid">
    <div className="row">
      <div className="text-center">
       <h1> All Products</h1>
        </div>                     
     
            
            {isLoading && (<Spinner></Spinner>)
            }
            {
              products.map(product => 
              
                <div className="col-md-2 gap-4 prod mb-4" key={product.id}>
                  <div className="card p-2">
                    <img src={`${baseUrl}/` + product.image} alt="" className='img-fluid'/>
                    <h4><Link  to={`/detail/${product.id}`}>{product.name}</Link></h4>
                    <p>Ksh.{ product.price}</p>
                  
                    {user && (
                      <div>  <button onClick={() => handleAddToCart(product)}> <img src={cartIcon} alt="" /> </button></div>
                    )}
                    {!user && (<div><button onClick={redirectToLogin}><img src={cartIcon} alt="" /> </button></div> )}
                  </div>        
                </div>
              )
            }
            
   </div>

    </div>
  </div>


 <div className="banner">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="text-start text-lg-center">
           <div>
            <h2>Lorem ipsum dolor sit amet.</h2>       
            <p> Upto  <span>20% off</span> on all T-shirts and Accessories </p>
            <button>Explore More</button>
           </div>
        </div>
      </div>
    </div>
  </div>
 </div>

   </>

  )
}

export default Home