import React from 'react'

function Subscibe() {
  return (
    <div className="subscribe">
  <div className="container py-4">
    <div className="row justify-content-center align-items-center">
      <div className="col-12">     
      <form>
          <div className="row">
            <h4>Subscribe To Newsletter</h4>   
            <p>New Subscibe to our newsletter</p>
            <div className="col-md-6 mb-3">
              <input type="text" placeholder="Your Name" className="form-control"/>
            </div>
           
            <div className="col-md-6">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Your Email"/>
              <div className="input-group-append">
                <span className="input-group-text">Submit</span>
              </div>
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default Subscibe