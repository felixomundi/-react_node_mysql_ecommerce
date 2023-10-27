import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
const BASE_URL = "http://localhost:5000/api/v1/coupon/"
const initialState = {
    coupons: [],
    isLoading: false,
    coupon: {},
    message:"",
}

export const getCouponTypes = createAsyncThunk("coupon/all",async(_, thunkAPI) => {
    try {
        let url = `${BASE_URL}`
        let token =  thunkAPI.getState().auth.user.token;
        const config = {
            headers: {
                Authorization:`Bearer ${token}`,
            }
        }
        const response = await axios.get(url, config);
        toast.success(response.data.message)
        return response.data
        
    } catch (error) {
        let message;
        if (error.response) {
            if (error.response.status === 500) {
                message = error.response.data.error;
                toast.error(message);
            }
        }
        return thunkAPI.rejectWithValue(message);
    }
})

export const deleteCouponType = createAsyncThunk("coupon/delete",async(couponId, thunkAPI) => {
    try {
        let url = `${BASE_URL}delete`
        let token =  thunkAPI.getState().auth.user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }       
        const response = await axios.post(url, { couponId:couponId }, config);
        if (response.status === 200) {
            toast.success("Coupon Type Deleted");
        }
        return response.data
        
    } catch (error) {
        let message;
        if (error.response) {
            if (error.response.status === 400) {
                message = error.response.data.message;
                toast.error(message)
            }
            if (error.response.status === 404) {
                message = error.response.data.message;
                toast.warning(message)
            }
            if (error.response.status === 500) {
                message = error.response.data.message;
                toast.error(message);
            }            
        }
        return thunkAPI.rejectWithValue(message)
    }
})
export const createCouponType = createAsyncThunk("coupon/create",async(data, thunkAPI) => {
    try {
        let url = `${BASE_URL}create`
        let token =  thunkAPI.getState().auth.user.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        const response = await axios.post(url, data , config);        
        return response.data
        
    } catch (error) {
        let message;
        if (error.response) {
            if (error.response.status === 400) {
                message = error.response.data.message;
                toast.error(message)
            }
            if (error.response.status === 404) {
                message = error.response.data.message;
                toast.warning(message)
            }
            if (error.response.status === 500) {
                message = error.response.data.message;
                toast.error(message);
            }            
        }
        return thunkAPI.rejectWithValue(message)
    }
})
export const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        
    },
    extraReducers:(builder) =>{
        builder
            .addCase(getCouponTypes.pending, (state, action) => {
                state.isLoading = true;                
            })
            .addCase(getCouponTypes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.coupons = action.payload.coupons;                
            })
            .addCase(getCouponTypes.rejected, (state, action) => {
                state.isLoading = false;                
            })
            .addCase(deleteCouponType.pending, (state, action) => {
                state.isLoading = true;                
            })
            .addCase(deleteCouponType.fulfilled, (state, action) => {
                state.isLoading = false;               
            })
            .addCase(deleteCouponType.rejected, (state, action) => {
                state.isLoading = false;                
            })
            .addCase(createCouponType.pending, (state, action) => {
                state.isLoading = true;                
            })
            .addCase(createCouponType.fulfilled, (state, action) => {
                state.isLoading = false;    
                state.message = action.payload.message;
                toast.success(state.message)
            })
            .addCase(createCouponType.rejected, (state, action) => {
                state.isLoading = false;                
           })
    },

    
})

export default couponSlice.reducer;