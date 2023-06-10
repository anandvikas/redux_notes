import { createSlice } from "@reduxjs/toolkit";

// CREATING SLICE  >>>>>>>>>>>>>>
const counter1 = createSlice({
    name: "counter1",
    initialState: {
        count: 10
    },
    reducers: {
        increaseCounter1: (state, action) => {
            state.count = state.count + (action.payload || 1)
        },
        decreaseCounter1: (state, action) => {
            state.count = state.count - (action.payload || 1)
        }
    }
})

// REDUCER >>>>>>>>>
export default counter1.reducer;

// ACTIONS >>>>>>>>>
export const { increaseCounter1, decreaseCounter1 } = counter1.actions;

