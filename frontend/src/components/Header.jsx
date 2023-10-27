import { Link, useNavigate } from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { logout, reset } from "../features/auth/authSlice";
export default function Header() {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const redirectHome = ()=>{
        navigate("/")
    }
        
const onLogout = async() => {
  await  dispatch(logout());
  await  dispatch(reset());
    navigate('/')
}
    
    return (
        <div className="main-navbar shadow-sm">
        <div className="top-navbar">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                        <h5 className="brand-name" onClick={redirectHome}>Nyagaka Ecom</h5>
                    </div>
                    <div className="col-md-5 my-auto">
                        <form role="search">
                            <div className="input-group">
                                <input type="search" placeholder="Search your product" className="form-control" />
                                <button className="btn bg-white" type="button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-5 my-auto">
                        <ul className="nav justify-content-end">

                                {user && user.role === "user" && (
                                    <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    <i className="fa fa-shopping-bag"></i> ({cart.totalcartItems})
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    <i className="fa fa-heart"></i> Wishlist (0)
                                </Link>
                            </li>
                                    </>
                           ) }     
                           
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa fa-user"></i>
                                        {
                                            user ? (<> {user && user.name}</>) : " Account"
                                        }
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {user ? (<>
                                            {user && (
                                            <>
                                                    <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user"></i> Profile</Link></li>
                                                    {user && user.role === "user" && (
                                                        <>
                                                         <li><Link className="dropdown-item" to="/orders"><i className="fa fa-list"></i> My Orders</Link></li>
                                                        <li><Link className="dropdown-item" to="#"><i className="fa fa-heart"></i> My Wishlist</Link></li>
                                                        <li><Link className="dropdown-item" to="/cart"><i className="fa fa-shopping-cart"></i> My Cart</Link></li>
                                                        </>
                                                    )}
                                                     {user && user.role === "admin" && (
                                                        <>
                                <li><Link className="dropdown-item" to="#"><i className="fa fa-list"></i>Orders</Link></li>
                                <li><Link className="dropdown-item" to="#"><i className="fa fa-heart"></i>Wishlist</Link></li>
                                <li><Link className="dropdown-item" to="/admin/cartItems"><i className="fa fa-shopping-cart"></i>Cart</Link></li>
                                <li><Link className="dropdown-item" to="/products"><i className="fa fa-list"></i>Products</Link></li>
                                <li><Link className="dropdown-item" to="/users"><i className="fa fa-heart"></i>Users</Link></li>
                                <li><Link className="dropdown-item" to="/admin/coupons"><i className="fa fa-shopping-cart"></i>Coupons</Link></li>
                                                            
                                                        </>
                                                    )}
                               
                                <li><Link className="dropdown-item" to="#" onClick={onLogout}><i className="fa fa-sign-out"></i> Logout</Link></li>
                                            </>
                                            )}                                        
                                        </>) : 
                                            <>
                                    <li><Link className="dropdown-item" to="/register"><i className="fa fa-user-plus"></i> Register</Link></li>
                                    <li><Link className="dropdown-item" to="/login"><i className="fa fa-external-link-alt"></i> Login</Link></li>
                                            </>
                                        }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <nav className="navbar navbar-expand-lg py-2">
            <div className="container-fluid">
                <Link className="navbar-brand d-block d-sm-block d-md-none d-lg-none" to="/">
                    Nyagaka Ecom
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>                        

                        <li className="nav-item active dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categories
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="#"></Link>
                           
                         <Link className="dropdown-item " to="#">Category</Link>
                           
                            
                            </div>
                            </li>

                    </ul>
                </div>
            </div>
        </nav>
    </div>
    ) 
 }
