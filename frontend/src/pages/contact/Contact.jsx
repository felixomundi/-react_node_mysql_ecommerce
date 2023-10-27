import React, { useState,Fragment, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { createContact, reset } from '../../features/contact/contactSlice' 
import Spinner from '../../components/Spinner'
const Contact = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const {isLoading, isError } = useSelector(state => state.contact);
const{ user }= useSelector(state=> state.auth)
const [subject, setSubject] = useState("");
const [message, setMessage] = useState("");
const [email, setEmail] = useState("");
const contactData = {
subject,
message,
email,
};

useEffect(() => {
if (isError) {        
toast.error(message);
}

if(user && user.role !== "user") {
    navigate('/')
   
}
}, [user,navigate,isError,message]);


const sendEmail = async (e) => {
e.preventDefault();
dispatch(createContact(contactData, toast))
dispatch(reset())
navigate('/')
};

if (isLoading) {
return(<Spinner/>)
}

return (
<Fragment>
<div>


<div className="contact">
<div className="container">
<div className="row">
<div className="pt-5">
<h3>Contact Us For Any Queries</h3>
</div>
<div className="col-md-5">
<div className="row">
<h4>Contact Details</h4>
<div className="col-md-12 col-sm-6">
<h5>Office</h5>
<p><i className="fa fa-location"> </i>  30200 Kitale</p>

</div>
<div className="col-md-12 col-sm-6">

<h5>Email</h5>
<p><i className="fa fa-envelope"> </i>  contact@nyagaka.com</p>

</div>
<div className="col-md-12">

<h5>Phone</h5>
<p><i className="fa fa-phone-alt"> </i>  0745566505</p>

</div>
</div>
</div>
<div className="col-md-7">
<div>
<h4>Contact Form</h4>
</div>
<div className="mb-3">
<div id="success"></div>
<form onSubmit={sendEmail}>

<div className="control-group mb-3">
<label htmlFor="email" className='mb-2'>Email</label>
<input type="email" className="form-control" 
placeholder="Email"
required="required"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
</div>
<div className="control-group mb-3">
<label htmlFor="subject" className='mb-2'>Subject</label>
<input type="text" className="form-control" 
id="subject"
placeholder="Subject"
required="required"
value={subject}
onChange={(e) => setSubject(e.target.value)}
/>
</div>
<div className="control-group mb-3">
<label htmlFor="message" className='mb-2'>Message</label>
<textarea className="form-control" 
placeholder="Message"
required="required"
value={message}
onChange={(e) => setMessage(e.target.value)}
></textarea>
</div>
<div>
<button className="font-weight-semi-bold px-4" style={{ height: '50px' }} type="submit" id="sendMessageButton">Send Message</button>
</div>
</form>
</div>
</div>
</div>
</div>
</div>
</div>
</Fragment>  
)
}

export default Contact