## Reference
Codevolution - YouTube
[https://www.youtube.com/watch?v=0awA5Uw6SJE&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3](https://www.youtube.com/watch?v=0awA5Uw6SJE&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3)
# Redux toolkit
RTK is an official and recommended redux toolset to write redux logic in code.
Why need RTK ?

 - Configuring redux is an app is complecated. And require too much boilerplate code. (*actions, action-creators, store, reducers etc.*)
 - In addition to redux, lot of other packages are also needed to be installed. (*redux-thunk, logger, immer etc.*)

RTK is built over redux and is rocommended to use in place of conventional redux in modern day code.

## Switching from Redux to RTK
### createSlice
`createSlice()` function handle most of the task by it's own. 

 - Creates **initial state**
 - cretes **actions**
 - creates **reducers** 
 - uses **immer library** under the hood (no need to write complex spread operators)

It takes an object (containing name, initial state, reducer, action data) as it's first parameter and returns an object with reducer and actions.

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
        }
    })
    
    // REDUCER >>>>>>>>>
    const counter1Reducer = counter1.reducer;
    const counter2Reducer = counter2.reducer;
    // ACTIONS >>>>>>>>>
    const { increaseCounter1, decreaseCounter1 } = counter1.actions;
    const { increaseCounter2, decreaseCounter2 } = counter2.actions;

> The **action type** which is created under the hood for various actions is made by concatinating *name* and *reducer key* saperated by a "/"
> Example : `"counter1/increaseCounter1"`  or  `"counter1/decreaseCounter1"`

### configureStore

 It replaces following methods and handles the task of all of these by itself alone. 

 - `createStore()`
 - `combineReducers()`
 - `applyMiddleware()`

Besides this it has some popular middleware like **thunk** pre applied. And we do not have to manually install and apply those.

`configureStore()` , after successfully configured returns a store object, which is exactly same as that we get from conventional **redux**. We can use methods like `getState()`, `subscribe()`, `dispatch()` etc. , from this **store**.

    // CREATING STORE >>>>>>
    const { configureStore } = require("@reduxjs/toolkit");
    const {createLogger} = require("redux-logger")
    const logger = createLogger();
    
    // 1. Hold application state----
    const store = configureStore({
        reducer: {
            counter1: counter1Reducer,
            counter2: counter2Reducer
        },
        middleware : (getDefaultMiddleware) => {
            let defaultMiddleware = getDefaultMiddleware();
            return [...defaultMiddleware, logger]
        }
    })
    
    // 2. getState() ----
    console.log("Initial State", store.getState());
    
    // 4. subscription ----
    let subscription = store.subscribe(()=>{})
    
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

### extraReducer
In converntional redux If we make make multiple reducers and combine them with `combineReducers()`, Then any action dispatched irrespective of the action type, it will be listened by all the reducers.

But, in RTK that is not the case. Since, action type is generated internally by concatinating the **name** property and the key name of method in **reducers** property. The action dispatched is only listened by the respective reducer.

This feature is good but it might become a hurdle if we want to update the state of one slice by dispatching an action of another slice.
To overcome this urdle we can use **extraReducers**

Syntex ::

    extraReducers : {
        <array-of-action-types-to-be-listened> : (state, action) => {
            // state --> state of local slice
            // action --> action of other slice
        }
    }
OR

    extraReducers: (builder) => {
        builder.addCase(<action-name-of-other-slice>, (state, action) => {
            // state --> state of local slice
            // action --> action of other slice
        })
    }

Example : *Suppose we want to increase the counter2 automatically , every time the counter1 increase.*

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
        extraReducers : {
            ["counter1/increaseCounter1"] : (state, action) => {
                state.count = state.count + (action.payload || 1)
            }
        }
    })

OR

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

### createAsyncThunk
- Unlike **redux-thunk**, `createAsyncThunk()` function works in different way. 
- It is a function which take **action type** as a first argument (*this is the action type on which it will respond*). 
- It takes a callback function as it's second argument. This callback function can be asynchronous and returns a promise.
-  `createAsyncThunk()` internally handles that promise and return an object. This object contains any one of `pending`, `fulfilled`, `rejected` as a property (*depending on the state of promise*) which behave like an action. 
- These actions (*pending || fulfilled || rejected*) are dispatched one by one internally by `createAsyncThunk()` according to the state of promise.
- We can listen to these actions with the help of `extraReducers()` 
- After the promise is resolved i.e, any of `fulfilled` or `rejected` is dispatched, the result returned by the callback function can be used as the payload.

Example : 

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

> Note : We do not need to catch the error maually in `createAsyncThunk()` callback, it is handled internally.
