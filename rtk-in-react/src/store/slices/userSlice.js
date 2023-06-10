import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk() >>>>
export const fetchUser = createAsyncThunk("user/fetchUser", () => {
    return axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => res.data)
})

// CREATING SLICE  >>>>>>>>>>>>>>
const slice = createSlice({
    name: "user",
    initialState: {
        loading: true,
        data: [],
        error: ""
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message
        })
    }
})


// REDUCER >>>>>>>>>
export default slice.reducer;
