import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner'
import { adminOrders } from '../../features/orders/order';
import { Link } from 'react-router-dom';
export default function SystemOrders() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.isLoading);
    const orders = useSelector(state => state.order.adminorders);
    const {isLoading } = useSelector(state => state.order);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate("/login?redirect=/admin/orders");
        }
        if (user && user.role !== "admin") {
            navigate("/")
        }
        dispatch(adminOrders())
    }, [user, navigate, dispatch])
    if (loading || isLoading) {
        return <Spinner></Spinner>
    }
  return (
    <div className="container-fluid py-5" style={{ minHeight: '90vh' }}>
          <div className="container">
              <div className="card shadow mb-4 mt-2">
                  <div className="card-header">
                      All Orders
                  </div>
                  <div className="card-body">
                      <div className="table-responsive">
                          <table className="table table-responsive table-hover">
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>User</th>
                                      <th>Order Date</th>
                                      <th>Order Status</th>
                                      <td>Total</td>
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
                                                  <td>{ order?.User?.name}</td>
                                                  <td>{new Date(order?.createdAt).toLocaleString('en-US')}</td>                                                  
                                                  <td>{order?.status}</td>
                                                  <td>Ksh. { order?.total}</td>
                                                  <td><Link to={`/admin/orders/${order?.tracking_no}`}><i className="fa fa-eye"></i></Link></td>
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
