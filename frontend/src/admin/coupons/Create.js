import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { createCouponType } from "../../features/coupons/couponSlice";
export default function Create() {
    const [coupon_type_name, setName] = useState("")
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      if(!user){
        navigate("/login")
        }
        if (user && user.role !== "admin") {
            navigate("/")
        }
    },[user,navigate])
 const onSubmit = async(e)=> {
     e.preventDefault();
     if (!coupon_type_name) {
         toast.error("Coupon Name is required")
     }
     else {
         let data = {
             coupon_type_name
         }
         await dispatch(createCouponType(data))
     }
    }
    return (
        <div className="container-fluid py-5" style={{ minHeight: "80vh" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h3 className="text-primary">
                                  Create Coupon Type
                                    <Link to="/admin/coupons" className="float-end btn btn-primary"> <i className="fa fa-list"></i> All Coupon Type</Link>
                                </h3>
                            </div>
                            <div className="card-body py-3">
                                <div className="row">
                                    <form onSubmit={onSubmit}>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="coupon_type_name" className="mb-2">Name</label>
                                           <input type="text" value={coupon_type_name} name="coupon_type_name" onChange={(e)=>setName(e.target.value)} className="form-control" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <button type="submit" className="btn btn-primary">Create</button>
                                        </div>
                                    </form>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
        )
}