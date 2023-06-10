const { createSlice } = require("@reduxjs/toolkit");

// CREATING SLICE (aka Reducer, actions etc) >>>>>>>>>>>>>>
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
    },
    extraReducers: (builder) => {
        builder.addCase(counter1.actions.increaseCounter1, (state, action) => {
            state.count = state.count + (action.payload || 1)
        })
    }
})

// REDUCER >>>>>>>>>
const counter1Reducer = counter1.reducer;
const counter2Reducer = counter2.reducer;
// ACTIONS >>>>>>>>>
const { increaseCounter1, decreaseCounter1 } = counter1.actions;
const { increaseCounter2, decreaseCounter2 } = counter2.actions;

// CREATING STORE >>>>>>
const { configureStore } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger")
const logger = createLogger();

// 1. Hold application state----
const store = configureStore({
    reducer: {
        counter1: counter1Reducer,
        counter2: counter2Reducer
    },
    middleware: (getDefaultMiddleware) => {
        let defaultMiddleware = getDefaultMiddleware();
        return [...defaultMiddleware, logger]
    }
})

// 2. getState() ----
console.log("Initial State", store.getState());

// 4. subscription ----
let subscription = store.subscribe(() => { })

// 3. Dispatching action ----
store.dispatch(increaseCounter1());
store.dispatch(increaseCounter1(2));
store.dispatch(decreaseCounter1(3));
store.dispatch(increaseCounter2());
store.dispatch(increaseCounter2(2));
store.dispatch(decreaseCounter2(3));

// 5. Unsubscribing ---
let unsubscribe = subscription;
unsubscribe();
