import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { userOrders } from '../../features/orders/order';
import Spinner from '../../components/Spinner';
function Order() {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.orders);
    const {isLoading} = useSelector(state => state.order.orders);
    useEffect(() => {
        if (!user) {
            navigate("/login?redirect=/orders")
        }
        if (user && user.role !== "user") {
            navigate("/")
        }      
        if (user) {
            dispatch(userOrders())
         }
    }, [dispatch, user, navigate]);

    if (isLoading) {
       return <Spinner></Spinner>
   }
  return (
      <div className="container-fluid py-5" style={{ minHeight: '90vh' }}>
          <div className="container">
              <div className="card shadow mb-4 mt-2">
                  <div className="card-header">
                      My Orders
                  </div>
                  <div className="card-body">
                      <div className="table-responsive">
                          <table className="table table-responsive table-hover">
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Order Date</th>
                                      <th>Order Status</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {orders.length === 0 && !isLoading &&(
                                      <tr>
                                          <td  colSpan={4}>No Current Orders </td>
                                      </tr>
                                  ) }
                                  {orders.length > 0 && !isLoading &&(
                                      <>
                                          {orders.map((order,index) => (
                                              <tr key={order.id}>
                                                  <td>{index + 1}</td>
                                                  <td>{new Date(order.createdAt).toLocaleString('en-US')}</td>                                                  
                                                  <td>{order.status}</td>
                                                  <td><Link to={`/orders/${order.tracking_no}`}><i className="fa fa-eye"></i></Link></td>
                                              </tr>
                                          ))}
                                         
                                      </>
                                  ) }
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
   </div>
  )
}

export default Order