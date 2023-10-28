import * as yup from 'yup';

export const  subscriberSchema = yup.object({
    name: yup.string().required("Name is required"),    
    email: yup.string().email("Enter valid email").required("Email is required"),
  });