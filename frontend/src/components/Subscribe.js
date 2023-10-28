import React from 'react'
import { subscriberSchema } from '../Validations/subscribe';
import { useFormik } from 'formik';
import {useDispatch} from "react-redux"
import { newSubscribe } from '../features/subscribe/subscribe';
function Subscibe() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: subscriberSchema,
    onSubmit: (values) => {
      dispatch(newSubscribe(values));
      formik.resetForm();    
    },
  });
  
  return (
    <div className="subscribe">
  <div className="container py-4">
    <div className="row justify-content-center align-items-center">
      <div className="col-12">     
      <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <h4>Subscribe To Newsletter</h4>   
            <p>New Subscibe to our newsletter</p>
            <div className="col-md-6 mb-3">
                  <input type="text" placeholder="Your Name" name="name" id="name" className="form-control"
                    {...formik.getFieldProps('name')}
                  />
                   {formik.touched.name && formik.errors.name ? (
                  <span className='text-danger'>{formik.errors.name}</span>
                ) : null}
              </div>
           
            <div className="col-md-6">
            <div className="input-group mb-3">
                    <input id="email" type="email" {...formik.getFieldProps('email')} name="email" className="form-control" placeholder="Your Email" />
                   
              <div className="input-group-append">
                <button className="input-group-text" type="submit" >Submit</button>
                    </div>                   
                  </div>
                  {formik.touched.email && formik.errors.email ? (
                      <span className='text-danger'>{formik.errors.email}</span>
                    ) : null}
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