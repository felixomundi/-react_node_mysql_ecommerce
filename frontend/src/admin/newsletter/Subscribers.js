import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {useNavigate,Link} from "react-router-dom"
import { deleteSubscriber, getSubscribers, subscribersSelect, unSubscribe } from '../../features/subscribe/subscribe';
import Spinner from '../../components/Spinner'
function Subscribers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const subscribers = useSelector(subscribersSelect);
  const isLoading = useSelector(state => state.subscriber.isLoading);
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=/admin/subscribers")
    }
    if (user && user.role !== "admin") {
      navigate("/")
    }
    if (user && user.role === "admin") {
      dispatch(getSubscribers())
    }
  }, [navigate, user, dispatch])
  if (isLoading) {
    return <Spinner></Spinner>
    }
    const deleteSub = (data) => {
        dispatch(deleteSubscriber(data));
        dispatch(getSubscribers());        
    }
    const updateStatus = (data) => {
        dispatch(unSubscribe(data));
        dispatch(getSubscribers());
    }
  return (
    <div className="container-fluid py-5" style={{ minHeight: '90vh' }}>
          <div className="container">
              <div className="card shadow mb-4 mt-2">
                  <div className="card-header">
                      All Subscribers
                  </div>
                  <div className="card-body">
                      <div className="table-responsive">
                          <table className="table table-responsive table-hover">
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Status</th>
                                      <th>Date Subscribed</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {subscribers.length === 0 && !isLoading &&(
                                      <tr>
                                          <td  colSpan={4}>No Current Subscribers </td>
                                      </tr>
                                  ) }
                                  {subscribers.length > 0 && !isLoading &&(
                                      <>
                                          {subscribers.map((subscriber,index) => (
                                              <tr key={subscriber.id}>
                                                  <td>{index + 1}</td>
                                                  <td>{subscriber?.name}</td>
                                                  <td>{subscriber?.email}</td>
                                                  <td>{subscriber?.status}</td>
                                                  <td>{new Date(subscriber?.createdAt).toLocaleString('en-US')}</td>                                                
                                                  <td><Link to="#"><i className="fa fa-check" onClick={() => updateStatus(subscriber?.email)}></i></Link>
                                                  <Link to="#"><i className="fa fa-pencil px-1"></i></Link>
                                                  <Link to="#" onClick={()=>deleteSub(subscriber?.email)}><i className="fa fa-trash px-1 text-danger"></i></Link>                                                  
                                                  </td>
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

export default Subscribers