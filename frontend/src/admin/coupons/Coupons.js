import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom";
import { deleteCouponType, getCouponTypes } from "../../features/coupons/couponSlice";
import Spinner from "../../components/Spinner";
export default function Coupons() {
    const user = useSelector(state => state.auth.user);
    const isLoading = useSelector(state => state.coupon.isLoading);
    const loading  =  useSelector(state => state.auth.isLoading)
    const coupons = useSelector(state => state.coupon.coupons);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
        if (user && user.role !== "admin") {
            navigate("/")
        }
        dispatch(getCouponTypes());
        
    }, [user, navigate, dispatch]);
    if (isLoading && loading) {
        return <Spinner></Spinner>
    }
    const deleteCoupon = async (id) => {
        await dispatch(deleteCouponType(id));
        await dispatch(getCouponTypes());
    }
    return (
        <div className="container-fluid py-5" style={{ minHeight: "80vh" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card shadow">
                            <div className="card-header">
                                <h3 className="text-primary">
                                    All Coupon Types
                                    <Link to="/admin/coupons/create" className="float-end btn btn-primary"> <i className="fa fa-plus-circle"></i> Add Coupon Type</Link>
                                </h3>
                            </div>
                            <div className="card-body py-3">
                                <div className="table-responsive">
                                    <table className="table table-hover table-center mb-0 datatable table-striped" >
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Created At</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {coupons?.length === 0 && (
                                                <tr ><td colSpan="4" className="text-center">No Coupons Found</td></tr>
                                            )}                                            
                                            {coupons?.length > 0 && (
                                                   <>{
                                                    coupons.map((item,index) => {
                                                        return (
                                                            <tr key={item.id}><td>{index+1}</td><td>{item.coupon_type_name}</td><td>{new Date(item.createdAt).toLocaleString('en-US')}</td><td><button type="button" onClick={()=>deleteCoupon(item.id)} className="btn btn-danger text-light"><i className="fa fa-trash "></i></button></td>
                                                            </tr>
                                                        )
                                                    })}</>)}</tbody></table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    )
}