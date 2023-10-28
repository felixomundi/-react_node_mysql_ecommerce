import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {toast} from 'react-toastify'
const BASE_URL = "http://localhost:5000/api/v1/subscribers/"
const initialState = {
    isLoading: false,
    subscriber: {},
    subscribers: [],
    isSuccess:null,
}
  
export const newSubscribe = createAsyncThunk("subscribers/create", async (data, thunkAPI) => {
    try {
        const config = {
            headers: {
              Accept: "application/json",
            },
          }      
        const url = `${BASE_URL}create`;
        const response = await axios.post(url,  data,config );
        if (response.status === 200) {
            toast.success(response.data.message);
        }
        return response.data;
    } catch (error) {
        let message
        if (error.response) {
            if (error.response.status === 400) {
                message = error.response.data.message
                toast.error(message);
            }
            if (error.response.status === 500) {
                message = error.response.data.message
                toast.error(message);
           }
        }
        return thunkAPI.rejectWithValue(message);
    }
})
export const subscribeSlice = createSlice({
    name: 'subscriber',
    initialState,
    reducers: {
      reset: (state) => {
       state = initialState
        },        
    },
    extraReducers: (builder) => {
        builder
            .addCase(newSubscribe.pending, (state, action) => {
            state.isLoading =true
            })
            .addCase(newSubscribe.fulfilled, (state, action) => {
                state.isLoading = false
                state.subscriber = action.payload.subscriber
                state.isSuccess = true
                state.subscribers = [...state.subscribers, state.subscriber]
            })
            .addCase(newSubscribe.rejected, (state, action) => {
                state.isLoading = false
                state.subscriber = {}
                state.isSuccess=false
            })
    }
  })
  

//   export const {  } = subscribeSlice.actions
  
  export default subscribeSlice.reducer