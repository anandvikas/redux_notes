const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");

// createAsyncThunk() >>>>
const fetchUser = createAsyncThunk("user/fetchUser", () => {
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
const reducer = slice.reducer;

// CREATING STORE >>>>>>
const { configureStore } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger")
const logger = createLogger();

// 1. Hold application state----
const store = configureStore({
    reducer: {
        users: reducer,
    },
    middleware: (getDefaultMiddleware) => {
        let defaultMiddleware = getDefaultMiddleware();
        return [...defaultMiddleware, logger]
    }
})


// 3. Dispatching action ----
store.dispatch(fetchUser());



