import React from 'react'
function OrderItem({item, index}) { 
  const BASE_URL = process.env.REACT_APP_BACKEND_URL + "/";
  return (
  
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2">
                        <img src={`${BASE_URL}` + item.Product.image}
                          className="img-fluid" alt=""/>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0">{ item.Product.name}</p>
                      </div>                  
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">Qty: {item.quantity }</p>
                      </div>
                      <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                <p className="text-muted mb-0 small">Ksh.{ item.Product.price}</p>
                      </div>
                    </div>
                    <hr className="mb-4" style={{backgroundColor: "#e0e0e0", opacity: 1}}/>
                   {/*
                    <div className="row d-flex align-items-center">
                      <div className="col-md-2">
                        <p className="text-muted mb-0 small">Track Order</p>
                      </div>
                      <div className="col-md-10">
                        <div className="progress" style={{height: "6px", borderRadius: "16px"}}>
                          <div className="progress-bar" role="progressbar"
                            style={{width: "20%", borderRadius: "16px", backgroundColor: "#a8729a"}} aria-valuenow="20"
                            aria-valuemin="0" aria-valuemax="100"></div>
                        </div>                                           
                        <div className="d-flex justify-content-around mb-1">
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivary</p>
                          <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                        </div>
                     
                      </div>
                    </div>
                   */}
                  </div>
        
  )
}

export default OrderItem