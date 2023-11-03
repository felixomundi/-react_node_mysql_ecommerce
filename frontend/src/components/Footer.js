import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
return (
<Fragment>
<div className="footer">
  <div className="container">
    <div className="row">
      <div className="col-md-3 mb-3 text-start">
        <h4><Link to="/">Nyagaka Ecommerce</Link></h4>
      </div>
      <div className="col-md-3 mb-3 text-start">
        <h4>Pages</h4>
        <p><Link to="/cart">Cart</Link></p>
        <p><Link to="#">Wishlist</Link></p>        
      </div>
      <div className="col-md-3 mb-3 text-start">
        <h4>Quick Links</h4>
        <p><Link to="/contact">Contact Us</Link></p>
        <p><Link to="https://nyagaka.com/about" target='_blank'>About Us</Link></p>        
      </div>
      <div className="col-md-3 mb-3 text-start social">
            <h4>Social Links</h4>
            <Link to="https://wa.me/+254745566505?text=Hello Nyagaka%20I%20need%20your service in" target='_blank'><i className="fab fa-whatsapp px-2"></i></Link>
        <Link to="https://www.facebook.com/nyagakaSolutions" target='_blank' ><i className="fab fa-facebook px-2"></i></Link>
        <Link to="https://www.youtube.com/channel/UCWX3aOegItASQd-Z9Y4bS5A" target='_blank'> <i className="fab fa-youtube px-2" target='_blank'></i>  </Link>   
            <Link to="https://www.linkedin.com/company/nyagaka/" target='_blank'><i className="fab fa-linkedin-in px-2"></i></Link>
            <Link to="https://www.github.com/felixomundi" target="_blank"><i className="fab fa-github px-2"></i></Link>
            <Link to="mailto:contact@nyagaka.com" target='_blank'><i className="fa fa-envelope px-2"></i></Link>
      </div>
      <div className="text-lg-center text-start">Copyright &copy; 2023 </div>
    </div>
  </div>
  </div>
  
</Fragment>
)
}

export default Footer