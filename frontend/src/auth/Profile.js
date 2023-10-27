import React, {useEffect, useState,} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { profileUpdate,  updatedUserPassword } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function Profile() {
    
const dispatch = useDispatch();
const navigate = useNavigate();
const { user, isLoading, isError, message } = useSelector((state) => state.auth)

const [name, setName] = useState(user?.name);
    const [current_password, setCurrentPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    
useEffect(() => {
if (!user) {
navigate("/login?redirect=/profile");
    }


}, [user, isError, message,navigate, dispatch]);

    const submitHandler = async(e) => {
        e.preventDefault();
        const userData = {
        name
        }
         await  dispatch(profileUpdate(userData));

    };
    const updatePassword = async (e) => {
        e.preventDefault();
        let data = {
            current_password, new_password,
        }
        if (!current_password) {
            toast.warning("Current Password is required")
        }
        else if (!new_password) {
            toast.warning("New Password is required")
        }
        else if (!confirm_password) {
            toast.warning("Confirm Password is required")
            }
        else if (new_password !== confirm_password) {
            toast.warning("New Password and Confirm Password do not match")
            }
        else if(current_password && new_password && confirm_password){
            await dispatch(updatedUserPassword(data));
                      
        }
    }
    
    

if (isLoading) {
return <Spinner />
}

    return (
        <div className="container-fluid py-5 profile" >
        <div className="container" >
           <div className="row">
              <div className="col-md-7 pb-3">
                    <div className="form">
                        <div className="text-start">
                        <p className="text-success">Update Profile Data</p>
                    </div>
                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="name">Name</label>
                                    <input type="text"  name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control"/>
                                  
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" defaultValue={user?.email} readOnly name="email" className="form-control"/>
                                    
                                </div>
                                <div className="mb-3">
                                    <button className="update-profile-button" onClick={submitHandler}>Update Profile</button>
                                </div>
                            </div>
                        </form>
                    </div>
              </div>
              <div className="col-md-5">
                <div className="form">
                        <div className="text-start">
                        <p className="text-success">Update Password</p>
                    </div>
                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="current_password">Current Password</label>
                                    <input type="password" onChange={(e)=>setCurrentPassword(e.target.value)} value={current_password} name="current_password" className="form-control"/>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="new_password">New Password</label>
                                    <input type="password" onChange={(e)=>setNewPassword(e.target.value)} value={new_password} name="new_password" className="form-control"/>
                                    </div>
                                    <div className="col-md-12">
                                    <label htmlFor="confirm_password">Confirm Password</label>
                                    <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirm_password} name="confirm_password" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <button className="update-profile-button" type='button' onClick={updatePassword}>Update Password</button>
                                </div>
                            </div>
                        </form>
                    </div>
              </div>        
           </div>
            </div>
            </div>
 
    )
}


export default Profile;