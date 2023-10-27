import React from 'react'

function NotFoundPage() {
  return (
    <div className="container-fluid py-5" style={{ height:"40vh"}}>
      <div className="container">
        <div> <h1 className='text-warning'> <i className="fa fa-exclamation-triangle"></i> 404 Error</h1>
        <h1>Page Not Found</h1></div>
      </div>
   </div>
  )
}

export default NotFoundPage