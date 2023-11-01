import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrUpdateSubscription, deleteMySubscription, getSubscriber } from '../features/subscribe/subscribe';
import  Spinner  from '../components/Spinner';
function Subscriptions() {
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const subscriber = useSelector(state => state.subscriber.subscriber); 
  const isLoading = useSelector(state => state.subscriber.isLoading);   
  const [name, setName] = useState(subscriber?.name);

  const [status, setStatus] = useState(subscriber?.status);
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=/subscriptions");
    }   
    if (user) {
      dispatch(getSubscriber())
    }
    
  }, [user, navigate, dispatch])
 
  function onSubmit(e) {
    e.preventDefault();    
    if (!name) {
      toast.error("Name is required")
      return false
    }
    if (!status) {
      toast.error("Status is required")
      return false
    }
    let data = {
      name: name,
      status:status,
    }
    dispatch(createOrUpdateSubscription(data));   
  } 
  function DeleteMySubscription() {
    dispatch(deleteMySubscription())
  }
 
  if (isLoading) {
    return <Spinner></Spinner>
  }
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-header">
            <h3>My newsletter subscriptions</h3>
          </div>
          {!isLoading && subscriber === null ? (
            <div className='card-body'><h4>No any active subscription</h4></div>)
            :
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="row">
          <div className="form-group col-md-6 mb-3">
            <label htmlFor="name" className='mb-3'>
              Name
            </label>
            <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} id="name" className='form-control' />
          </div>         
           
            <div className="form-group col-md-6 mb-3">
            <label htmlFor="status" className='mb-3'>
              Status
            </label>
              <select name="status"  className='form-control' onChange={(e)=>setStatus(e.target.value)}>
                <option value ="Active" selected = {status === "Active" ?? ""}>Receive Updates</option>
                <option value="Inactive" selected = {status === "Inactive" ?? ""}>Don't Receive Updates</option>
                </select>
            </div>      
            
          </div>
          
          <div className="mt-3">
          <button type="submit" style={{
            backgroundColor:"#088178"
          }} className='py-2 btn btn-light'>Update</button>
         </div>
        </form>
              <div className="py-3">
                <button className='btn btn-danger' type='button' onClick={()=>DeleteMySubscription()}><i className="fa fa-trash"></i> Delete Subscription</button>
           </div>
            </div> 
            
        }        
        </div>
      </div>
    </div>
  )
}

export default Subscriptions