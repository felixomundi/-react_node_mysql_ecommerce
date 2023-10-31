import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import {toast} from 'react-toastify'
const BASE_URL = "http://localhost:5000/api/v1/subscribers/"
const subscriber =  JSON.parse(localStorage.getItem('subscriber'));
const initialState = {
    isLoading: false,
    subscriber: subscriber ? subscriber : null,
    subscribers: [],
    isSuccess:false,
}
  
export const newSubscribe = createAsyncThunk("subscribers/create", async (data, thunkAPI) => {
    try {
        const config = {
            headers: {
              Accept: "application/json",
            },
          }      
        const url = `${BASE_URL}create`;
        const response = await axios.post(url,  data, config );
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
export const getSubscribers = createAsyncThunk("subscribers/all", async (_, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Accept: "application/json",
                Authorization:`Bearer ${token}`
            },
          }      
        const url = `${BASE_URL}`;
        const response = await axios.get(url, config);        
        return response.data;
    } catch (error) {
        let message
        if (error.response) {           
            if (error.response.status === 500) {
                message = error.response.data.message
                toast.error(message);
           }
        }
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteSubscriber = createAsyncThunk("subscribers/delete", async (data, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                // Accept: "application/json",
                Authorization:`Bearer ${token}`
            },
        }   
        
        const url = `${BASE_URL}delete`;
        const response = await axios.post(url, { email: data }, config);      
        if (response.status === 200) {
            toast.success(response.data.message);
        }
        return response.data;
    } catch (error) {
        let message
        if (error.response) {           
            if (error.response.status === 500) {
                message = error.response.data.message
                toast.error(message);
            }
            if (error.response.status === 400) {
                message = error.response.data.message
                toast.error(message);
           }
        }
        return thunkAPI.rejectWithValue(message);
    }
})

export const unSubscribe = createAsyncThunk("subscribers/unsubscribe", async (data, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                // Accept: "application/json",
                Authorization:`Bearer ${token}`
            },
        }   
        
        const url = `${BASE_URL}unsubscribe`;
        const response = await axios.post(url, { email: data }, config);      
        if (response.status === 200) {
            toast.success(response.data.message);
        }
        return response.data;
    } catch (error) {
        let message
        if (error.response) {           
            if (error.response.status === 500) {
                message = error.response.data.message
                toast.error(message);
            }
            if (error.response.status === 400) {
                message = error.response.data.message
                toast.error(message);
           }
        }
        return thunkAPI.rejectWithValue(message);
    }
})

export const createOrUpdateSubscription = createAsyncThunk("subscribers/createorupdate", async (data, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                // Accept: "application/json",
                Authorization:`Bearer ${token}`
            },
        }   
        
        const url = `${BASE_URL}createorupdate`;
        const response = await axios.post(url, data, config);      
        if (response.status === 200) {
            toast.success(response.data.message);
        }
        return response.data;
    } catch (error) {
        let message
        if (error.response) {           
            if (error.response.status === 500) {
                message = error.response.data.message
                toast.error(message);
            }
            if (error.response.status === 400) {
                message = error.response.data.message
                toast.error(message);
           }
        }
        return thunkAPI.rejectWithValue(message);
    }
})

export const getSubscriber = createAsyncThunk("subscribers/getsubscriber", async (_, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                // Accept: "application/json",
                Authorization:`Bearer ${token}`
            },
        }   
        
        const url = `${BASE_URL}getsubscriber`;
        const response = await axios.get(url, config);    
        if (response.status === 200) {
            if (response.data.subscriber === null) {
              await  localStorage.removeItem("subscriber");
            }
            if (response.data.subscriber !== null) {
                await  localStorage.removeItem("subscriber");
                await  localStorage.setItem('subscriber', JSON.stringify(response.data.subscriber))
                }
        }

        return response.data;
    } catch (error) {
        let message
        if (error.response) {           
            if (error.response.status === 500) {
                message = error.response.data.message
                toast.error(message);
            }
            if (error.response.status === 400) {
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
                .addCase(getSubscribers.pending, (state, action) => {
                state.isLoading =true
                })
                .addCase(getSubscribers.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.subscribers = action.payload.subscribers
                    state.isSuccess = true
                })
                .addCase(getSubscribers.rejected, (state, action) => {
                    state.isLoading = false
                    state.subscribers = []
                    state.isSuccess=false
                })
                .addCase(deleteSubscriber.pending, (state, action) => {
                state.isLoading =true
                })
                .addCase(deleteSubscriber.fulfilled, (state, action) => {
                state.isLoading = false
                })
                .addCase(deleteSubscriber.rejected, (state, action) => {
                state.isLoading = false
                })
                .addCase(unSubscribe.pending, (state, action) => {
                state.isLoading =true
                })
                .addCase(unSubscribe.fulfilled, (state, action) => {
                state.isLoading = false
                state.subscriber = action.payload.subscriber
                })
                .addCase(unSubscribe.rejected, (state, action) => {
                state.isLoading = false
                })
                .addCase(createOrUpdateSubscription.pending, (state, action) => {
                state.isLoading = true
                })
                .addCase(createOrUpdateSubscription.fulfilled, (state, action) => {
                state.isLoading = false
                state.subscriber = action.payload.subscriber
                })
                .addCase(createOrUpdateSubscription.rejected, (state, action) => {
                state.isLoading = false
                })
                .addCase(getSubscriber.pending, (state, action) => {
                    state.isLoading = true
                })
                .addCase(getSubscriber.fulfilled, (state, action) => {
                state.isLoading = false
                state.subscriber = action.payload.subscriber
                })
                .addCase(getSubscriber.rejected, (state, action) => {
                    state.isLoading = false
                    state.subscriber = {}
                })
    }
  })
  

//   export const {  } = subscribeSlice.actions
  
export default subscribeSlice.reducer
export const subscribersSelect = state=>state.subscriber.subscribers  
