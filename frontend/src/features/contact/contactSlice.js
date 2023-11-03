import {toast} from 'react-toastify'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const API_URL = 'http://localhost:5000/api/v1/contact'
const initialState = {
    contact: {},
    isError: false,
    isLoading: false,
    isSuccess:false,
    message:''
}

export const createContact = createAsyncThunk('contact/addContact',
            async (contactData, thunkAPI) => {
            try {               
                const url = `${API_URL}/new`
                const response = await axios.post(url, contactData);
                if (response.status === 200) {
                    toast.success(response.data.message);
                }
                return response.data;
            } catch (error) {
                let message
                if (error.response) {
                    if (error.response.status === 400) {
                        message = error.response.data.message
                        toast.error(message)
                    }
                    if (error.response.status === 500) {
                        message = error.response.data.message
                        toast.error(message)
                    }
                }
                return thunkAPI.rejectWithValue(message);
            }
            })
export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.isError=false;
            state.isLoading=false;
            state.isSuccess=false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createContact.pending,(state)=> {
                state.isLoading = true;
            })
            .addCase(createContact.fulfilled,(state,action) => {
                // state.contact = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
            })
            .addCase(createContact.rejected,(state,action)=> {
                state.isLoading = false;                
            })
    }
}) 

export const { reset } = contactSlice.actions
export default contactSlice.reducer