import React,{useEffect} from 'react'
import "./detail.css"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { adminOrderDetail, selectOrderByAdmin } from "../../features/orders/order"
import Spinner from '../../components/Spinner';
import OrderItem from './OrderItem'
export default function SystemOrderDetail() {
  const id = useParams().id;
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  
  useEffect(() => {      
    let url = `/login?redirect=/orders/${id}`;
    if (!user) {
      navigate(url);
  }
  if (user && user.role !== "admin") {
      navigate("/")
  }      
  if (user) {
    dispatch(adminOrderDetail(id)); 
   }
  }, [id, dispatch, navigate,user]);
  const order = useSelector(selectOrderByAdmin);
  const { isLoading } = useSelector(state => state.order); 
  if (isLoading) {
  return <Spinner></Spinner>
  }
  
  return (
    <section className="h-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12">
          <div className="card" style={{borderRadius: "10px"}}>
            <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">User Name, <span style={{ color: "#a8729a" }}>{order?.User?.name}</span></h5>
                  
            </div>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="lead fw-normal mb-0" style={{color: "#a8729a"}}>Order Items</p>
                    <p className="small text-muted mb-0">Order Status : { order?.status}</p>
              </div>
                  {order?.OrderItems?.map((item, index) => {
                    return (
                      <div className="card shadow-0 border mb-4" key={index}>
                         <OrderItem item={item}/>
                       </div> 
                   )
            })}
             
  
              <div className="d-flex justify-content-between pt-2">
                <p className="fw-bold mb-0">Order Details</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> Ksh. {order?.total }</p>
              </div>
                 
              <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0">Address : {order?.address }</p>
                    <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> Ksh. {order?.discount }</p>
              </div>
  
              <div className="d-flex justify-content-between">
                <p className="text-muted mb-0">ShipCode : {order.shipcode}</p>
                <p className="text-muted mb-0"><span className="fw-bold me-4">VAT</span> Ksh. 0.00</p>
              </div>
  
              <div className="d-flex justify-content-between mb-5">
                    <p className="text-muted mb-0">Order Date : { new Date(order?.createdAt).toLocaleString('en-US')}</p>
                <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Free</p>
              </div>
            </div>
            <div className="card-footer border-0 px-4 py-5"
              style={{backgroundColor: "#a8729a", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}>
              <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
                    paid: <span className="h2 mb-0 ms-2">Ksh. {order?.discounted_total }</span></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
        </section>
  )
}
