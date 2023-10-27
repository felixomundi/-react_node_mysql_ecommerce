import {toast} from 'react-toastify'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import contactService from './contactService'
const initialState = {
    contact: '',
    isError: false,
    isLoading: false,
    isSuccess:false,
    message:''
}

export const createContact = createAsyncThunk('contact/addContact',
            async (contactData, thunkAPI) => {
            try {
                const token = thunkAPI.getState().auth.user.token   
                return await contactService.createContact(contactData,token)
            } catch (error) {
                const message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
              return thunkAPI.rejectWithValue(message)
            }
            })
export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createContact.pending,(state)=> {
                state.isLoading = true;
            })
            .addCase(createContact.fulfilled,(state,action) => {
                state.contact = action.payload;
                state.isSuccess = true;
                state.message = false;
                state.isError = false;
                state.isLoading = false;
                toast.success('Your contact info has been sent we will get to you back soon');
            })
            .addCase(createContact.rejected,(state,action)=> {
                state.isError = action.payload
                state.message = action.payload
                toast.error(action.payload)
            })
    }
}) 

export const { reset } = contactSlice.actions
export default contactSlice.reducer