import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItemByAdmin, getUserCartItems } from "../../features/cart/cartSlice";
import Spinner from "../../components/Spinner"
import { Link, useNavigate } from "react-router-dom";
export default function CartItems() {
const {isLoading} = useSelector(state=>state.cart)
        const cartItems = useSelector(state => state.cart.$cartItems);  
        const user = useSelector(state => state.auth.user);
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const BASE_URL = process.env.REACT_APP_BACKEND_URL + "/";
        useEffect(() => {   
                if (!user) {
                        navigate("/")
                }
                if (user && user.role !== "admin") {
                        navigate("/")
                }
           dispatch(getUserCartItems());
        }, [user, navigate, dispatch]);
        
       
if (isLoading) {
return <Spinner></Spinner>
        }
        
        const deleteCartItemByAdmins = async (id) => {
                await dispatch(deleteCartItemByAdmin(id));
                await dispatch(getUserCartItems());
        }
return (
<div className="container-fluid py-5" style={{ minHeight: "100vh"}}>
<div className="container">
<div className="row">
<div className="col-md-12">
<div className="card shadow">
<div className="card-header"><h3>All Cart Items</h3></div>
<div className="card-body py-2">
<div className="table-responsive">
<table className="table table-hover text-responsive table-striped">
<thead>
<tr>
<th>ID</th>
<th>User</th>
                                                                                        <th>Product</th>
                                                                                        <th>Image</th>
<th>Price</th>
<th>Quantity</th>
<th>Total Amount</th>
<th>Created At</th>
<th>Action</th>
</tr>
</thead>
<tbody>

{cartItems.length === 0 && (
                                                                                        <tr>
                                                                                                <td colspan={7} className="text-center"><p className="text-danger">No cart Items</p></td>

</tr>
)}
{cartItems.length > 0 && (
<>
{cartItems.map((cartItem, index) => {
const { id,  createdAt } = cartItem;
return (
<tr key={id}>
        <td>{index + 1}</td>
        <td>{ cartItem.User?.name} { cartItem.User?.email} </td> 
                <td>{cartItem.Product?.name}</td>
                <td><img src={`${BASE_URL}` +  cartItem.Product?.image} alt={cartItem.Product?.name} style={{height:30, width:30}}/></td>
                <td>{ cartItem.Product?.price}</td>
        <td>{cartItem.quantity}</td>
        <td>{ cartItem.total}</td>
<td>{new Date(createdAt).toLocaleString('en-US')}</td>                  
                <td><Link className="text-danger" to="#" onClick={() => deleteCartItemByAdmins(cartItem.id)}><i className="fa fa-trash"></i></Link>
                        <Link className="px-2"><i className="fa fa-edit"></i>
                        </Link>
                </td>
</tr>
);
})}  
</>
)}


</tbody>
</table>
</div>

</div>
</div>
</div>
</div>
</div>
</div>
)

}