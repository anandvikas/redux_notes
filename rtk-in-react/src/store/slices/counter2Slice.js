import { createSlice } from "@reduxjs/toolkit";

// CREATING SLICE  >>>>>>>>>>>>>>
const counter2 = createSlice({
    name: "counter2",
    initialState: {
        count: 10
    },
    reducers: {
        increaseCounter2: (state, action) => {
            state.count = state.count + (action.payload || 1)
        },
        decreaseCounter2: (state, action) => {
            state.count = state.count - (action.payload || 1)
        }
    }
})

// REDUCER >>>>>>>>>
export default counter2.reducer;

// ACTIONS >>>>>>>>>
export const { increaseCounter2, decreaseCounter2 } = counter2.actions;

