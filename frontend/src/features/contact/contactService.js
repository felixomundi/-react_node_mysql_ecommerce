import axios from 'axios'
const API_URL = '/api/v1/contact'
const createContact = (contactData,token) => {
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = axios.post(API_URL,contactData,config);
    return response.data;
}

const contactService = {
    createContact
}

export default contactService