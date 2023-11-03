import axios from 'axios'
const API_URL = 'http://localhost:5000/api/v1/contact'
const createContact = (contactData) => {
    // const config = {
    //     headers:{
    //         Authorization:`Bearer ${token}`
    //     }
    // }
    const url = `${API_URL}/new`
    const response = axios.post(url, contactData);
    return response.data;
}

const contactService = {
    createContact
}

export default contactService