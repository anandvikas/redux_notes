## Reference
Codevolution - YouTube
[https://www.youtube.com/watch?v=0awA5Uw6SJE&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3](https://www.youtube.com/watch?v=0awA5Uw6SJE&list=PLC3y8-rFHvwiaOAuTtVXittwybYIorRB3)
# Redux
Redux is a **predictible** **state container** for **JavaScript Applications**.

 - Javascript Applications : - It is made for javascript applications (not only for React).
 - State Container : - It is a container/store for state/global-variables of the applications.
 - Predictable : - Redux internally keep track of all the changes in various states of container, for very beggining. We can see (predict) those changes in dev-tool and do necessary debugs. In this way redux is predictable.

## How Redux work

 - **Store** : - It holds the state of the application.
 - **Action** : - I tells what to do with the state in the store.
 - **Reducer** : - It performs the task what **Action** tells to do.

 We can imagine this with a inventory of a production company. In which **Store** plays the role of Inventory. **Action** Plays the role of Supervisor of the inventory. **Reducer** plays the role of labor of the inventory.

> Note : There is a inventory control room, which keep track of what is happening in the inventory, which action is done and how the state of inventory is changing.

Redux also keep track of all the actions, changes in state of it's store. *Hence it is predictable*

### Three Principals of redux

 1. The global state of an application is stored as an **javascript object**  inside a single store.
 2. The only way to change the state is to dispatch an action (an object that describes what to do) ----> [ *example : labor is not allowed to directly go in inventory and do whatever he wants, he have to do what the supervisor allows him to do* ]
 3. We need to write pure reducers to perform required changes in state. ----> *A reducer must return an updated state (a new object) by doing required changes in the previous state.* [`reducer = (previousState, action) => newState`]

## Actions
An object that describes what to do.

    let action = {
        // what to do goes here        
    }
**Action type** : - String that what type of action should be done.
**Payload** : - Optional data to perform the required action.
**Action creator** : - It is a function which create an action an returns it.

    const actionCreator = () => {
        return {
            // what to do goes here
        }
    }
## Reducer
- A reducer performs the task what action tells it to do
- To register any change in state a reducer must return a **new** and updated object.

Example : 

    const reducer = (previousState, action) => {
        if (!previousState) {
            previousState = {
                // state values
            }
        }    
        if (somethingChanged) {
            updatedState = {...previousState, value : changedValue}
            return updatedState;
        } else {
            return previousState;
        }
    }
## Store

 - Holds application state
 - Allows access to state via `getState()`
 - Allows state to be updated via `dispatch(action)`
 - Register listeners via `subscribe(listener)`, (*everytime any change occour in state, the listener function will be called*).
 - Unregisters listeners via the **function returned** by `subscribe(listener)`

Example :

    const redux = require("redux");
    const { createStore } = redux;
    
    // 1. Holds application state----
    const store = createStore(reducer);
    
    // 2. getState() ----
    console.log("Initial State", store.getState());
    
    // 4. subscription ----
    let listener = () => {
        console.log("State", store.getState())
    }
    let subscription = store.subscribe(listener)
    
    // 3. Dispatching action ----
    store.dispatch(action);
    store.dispatch(action);
    store.dispatch(action);
    
    // 5. Unsubscribing ---
    let unsubscribe = subscription;
    unsubscribe();

### Example ------
Considering all those above points a simple counter application would look like this.

    // ACTION TYPE >>>>>>
    const INCREASE_ONE = "INCREASE_ONE";
    const DECREASE_ONE = "DECREASE_ONE";
    
    
    // ACTION >>>>>>>>
    let increaseOne = {
        type: INCREASE_ONE,
    }
    let decreaseOne = {
        type: DECREASE_ONE,
    }
    
    // ACTION CREATOR >>>>>>
    const createIncrementAction = () => {
        return increaseOne
    }
    const createDecrementAction = () => {
        return decreaseOne
    }
    
    
    // REDUCER >>>>>> 
    // if we dont have previous state we have to provide an initial state 
    const reducer = (previousState, action) => {
        if (!previousState) {
            previousState = {
                count: 10
            }
        }
        // since reducer returns a NEW state object, with updated data.
        if (action.type === INCREASE_ONE) {
            let newState = { ...previousState };
            newState.count = previousState.count + 1;
            return newState;
        } else if (action.type === DECREASE_ONE) {
            let newState = { ...previousState };
            newState.count = previousState.count - 1;
            return newState;
        } else {
            return previousState;
        }
    
    }
    
    
    // STORE >>>>>>>>>>>
    const redux = require("redux");
    const { createStore } = redux;
    
    // 1. Holds application state----
    const store = createStore(reducer);
    
    // 2. getState() ----
    console.log("Initial State", store.getState());
    
    // 4. subscription ----
    let listener = () => {
        console.log("State", store.getState())
    }
    let subscription = store.subscribe(listener)
    
    // 3. Dispatching action ----
    store.dispatch(createIncrementAction());
    store.dispatch(createIncrementAction());
    store.dispatch(createDecrementAction());
    
    // 5. Unsubscribing ---
    let unsubscribe = subscription;
    unsubscribe();
    
    // the state change due to this dispatch will not be logged because, store is unsubscribed.
    store.dispatch(createIncrementAction());
    store.dispatch(createDecrementAction());

The more practical way to write the above code is following --

    // ACTION TYPE >>>>>>
    const INCREASE_ONE = "INCREASE_ONE";
    const DECREASE_ONE = "DECREASE_ONE";    
    
    // ACTION CREATOR >>>>>>
    const createIncrementAction = (data) => {
        return {
            type: INCREASE_ONE,
            payload: data
        }
    }
    const createDecrementAction = (data) => {
        return {
            type: DECREASE_ONE,
            payload: data
        }
    }    
    
    // REDUCER >>>>>> 
    const initialState = { count: 10 };
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case INCREASE_ONE: return { ...state, count: state.count + (action.payload || 1) }
            case DECREASE_ONE: return { ...state, count: state.count - (action.payload || 1) }
            default: return state
        }    
    }    
    
    // STORE >>>>>>>>>>>
    const redux = require("redux");
    const { createStore } = redux;
    
    // 1. Holds application state----
    const store = createStore(reducer);
    
    // 2. getState() ----
    console.log("Initial State", store.getState());
    
    // 4. subscription ----
    let listener = () => {
        console.log("State", store.getState())
    }
    let subscription = store.subscribe(listener)
    
    // 3. Dispatching action ----
    store.dispatch(createIncrementAction());
    store.dispatch(createIncrementAction(2));
    store.dispatch(createDecrementAction(1));
    
    // 5. Unsubscribing ---
    let unsubscribe = subscription;
    unsubscribe();
    
    // the state change due to this dispatch will not be logged because, store is unsubscribed.
    store.dispatch(createIncrementAction());
    store.dispatch(createDecrementAction());

### bindActionCreators
`bindActionCreators()` is a method of redux which can be used to bind action creators, so that we don't require to write dispatch method.

    // store.dispatch(createIncrementAction());
    // store.dispatch(createIncrementAction(2));
    // store.dispatch(createDecrementAction(1));
    
    const { bindActionCreators } = redux;
    const actions = bindActionCreators({ createIncrementAction, createDecrementAction }, store.dispatch);
    
    actions.createIncrementAction();
    actions.createIncrementAction(2);
    actions.createDecrementAction(1);

### combineReducers
As the name suggests `combineReducers()` methods combines multiple reducers and returns a single reducer.

    // ACTION TYPE >>>>>>
    const INCREASE_COUNTER_1 = "INCREASE_COUNTER_1";
    const DECREASE_COUNTER_1 = "DECREASE_COUNTER_1";
    const INCREASE_COUNTER_2 = "INCREASE_COUNTER_2";
    const DECREASE_COUNTER_2 = "DECREASE_COUNTER_2";
    
    // ACTION CREATOR >>>>>>
    const increaseCounter1 = (data) => {
        return {
            type: INCREASE_COUNTER_1,
            payload: data
        }
    }
    const decreaseCounter1 = (data) => {
        return {
            type: DECREASE_COUNTER_1,
            payload: data
        }
    }
    const increaseCounter2 = (data) => {
        return {
            type: INCREASE_COUNTER_2,
            payload: data
        }
    }
    const decreaseCounter2 = (data) => {
        return {
            type: DECREASE_COUNTER_2,
            payload: data
        }
    }
    
    // REDUCER >>>>>> 
    const initialState1 = { count: 10 };
    const counter1Reducer = (state = initialState1, action) => {
        switch (action.type) {
            case INCREASE_COUNTER_1: return { ...state, count: state.count + (action.payload || 1) }
            case DECREASE_COUNTER_1: return { ...state, count: state.count - (action.payload || 1) }
            default: return state
        }
    }
    const initialState2 = { count: 10 };
    const counter2Reducer = (state = initialState2, action) => {
        switch (action.type) {
            case INCREASE_COUNTER_2: return { ...state, count: state.count + (action.payload || 1) }
            case DECREASE_COUNTER_2: return { ...state, count: state.count - (action.payload || 1) }
            default: return state
        }
    }
    
    // STORE >>>>>>>>>>>
    const redux = require("redux");
    const { createStore, combineReducers } = redux;
    
    const rootReducer = combineReducers({
        counter1: counter1Reducer,
        counter2: counter2Reducer
    })
    
    const store = createStore(rootReducer);
    console.log("Initial State", store.getState());
    
    // subscribe
    let subscription = store.subscribe(() => {
        console.log("State", store.getState())
    })
    
    // dispatching
    store.dispatch(increaseCounter1());
    store.dispatch(increaseCounter1(2));
    store.dispatch(decreaseCounter1(3));
    store.dispatch(increaseCounter2());
    store.dispatch(increaseCounter2(2));
    store.dispatch(decreaseCounter2(3));
    
    
    let unsubscribe = subscription;
    unsubscribe();

### Immer Library
Immer gives us relief from doing complex destructuring while making copy of previous state in reducer. It has a `produce()` method which accepts two arguments.

 - previous state
 - a function to execute to perform required updation in state.

Behind the seen, Immer also does the same thing what we do. But, it makes the development easier and increase the readability of code.

    const { produce } = require("immer");
    
    const initialState1 = { count: 10 };
    const counter1Reducer = (state = initialState1, action) => {
        switch (action.type) {
            case INCREASE_COUNTER_1: return produce(state, (draft) => { draft.count = draft.count + (action.payload || 1) })
            case DECREASE_COUNTER_1: return produce(state, (draft) => { draft.count = draft.count - (action.payload || 1) })
            default: return state
        }
    }
    const initialState2 = { count: 10 };
    const counter2Reducer = (state = initialState2, action) => {
        switch (action.type) {
            case INCREASE_COUNTER_2: return produce(state, (draft) => { draft.count = draft.count + (action.payload || 1) })
            case DECREASE_COUNTER_2: return produce(state, (draft) => { draft.count = draft.count - (action.payload || 1) })
            default: return state
        }
    }
## Middleware in redux

 - It is used to add custome features in redux.
 - Provides a third party extension point between dispatching an action and the moment it reaches the reducer.

Without middleware : [`dispatch(action)` ----> `reducer`]
With middleware : [`dispatch(action)` ----> `custome features` ----> `reducer`]

`applyMiddleware()` is used to add middleware in redux, it is passed as a second argument in create store function.

### logger middleware
It is used to log the store, whenever any changes occur in the store. *That means we dont need to subscribe to store to see logs of changes in store.*

    // STORE >>>>>>>>>>>
    const redux = require("redux");
    const { createStore, combineReducers, applyMiddleware } = redux;
    const { createLogger } = require("redux-logger");
    const logger = createLogger();
    
    const rootReducer = combineReducers({
        counter1: counter1Reducer,
        counter2: counter2Reducer
    })
    
    const store = createStore(rootReducer, applyMiddleware(logger));
    console.log("Initial State", store.getState());
    
    
    // dispatching
    store.dispatch(increaseCounter1());
    store.dispatch(increaseCounter1(2));
    store.dispatch(decreaseCounter1(3));
    store.dispatch(increaseCounter2());
    store.dispatch(increaseCounter2(2));
    store.dispatch(decreaseCounter2(3));

### Redux Thunk 

 - It is redux middleware which is used to write asynchrouous actions creators.
 - In conventional redux code, as soon as the action is dispatched, it instantly goes to the reducer to perform changes. But, what if we want to do some asynchronous task between dispatching an action and sending the action to reducer. *Example : Dispatching an action and fetch the payload data from an api, and then move to reducer.* In that case redux-thunk would be helpful.

Instead of dispatching an action, Thunk middleware allows us to dispatch a function (this function can be asynchronous). This function itself receives a dispatch method as a first parameter. Now this dispatch method can be used to dispatch an actual action.

Without Thunk : 

    store.dispatch({ type: XYZ })

With Thunk : 

    store.dispatch(async (newDispatch) => {
        // do some task, maybe asynchronous.
        newDispatch({ type: XYZ })
    })

**Redux thunk implementation example --**

    const axios = require("axios");
    
    // ACTION TYPE >>>>>>
    const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
    const FETCH_USERS_SUCCEDED = "FETCH_USERS_SUCCEDED";
    const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";
    
    // ACTION CREATOR >>>>>>
    const fetchUserRequested = () => {
        return {
            type: FETCH_USERS_REQUESTED,
        }
    }
    const fetchUserSucceded = (data) => {
        return {
            type: FETCH_USERS_SUCCEDED,
            payload: data
        }
    }
    const fetchUserFailed = (data) => {
        return {
            type: FETCH_USERS_FAILED,
            payload: data
        }
    }
    
    
    const fetchUsers = () => {
        return (dispatch) => {
            dispatch(fetchUserRequested());
            axios.get("https://jsonplaceholder.typicode.com/users")
                .then(res => {
                    dispatch(fetchUserSucceded(res.data));
                })
                .catch((error) => {
                    dispatch(fetchUserFailed("Some error occured"));
                })
        }
    }
    
    // REDUCER >>>>>> 
    const { produce } = require("immer");
    const initialState = {
        loading: true,
        data: [],
        error: ""
    };
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case FETCH_USERS_REQUESTED: return produce(state, (draft) => { draft.loading = false })
            case FETCH_USERS_SUCCEDED: return produce(state, (draft) => { draft.loading = false; draft.data = action.payload })
            case FETCH_USERS_FAILED: return produce(state, (draft) => { draft.loading = false; draft.error = action.payload })
            default: return state
        }
    }
    
    // STORE >>>>>>>>>>>
    const redux = require("redux");
    const { createStore, applyMiddleware } = redux;
    const { createLogger } = require("redux-logger");
    const { default: thunk } = require("redux-thunk");
    const logger = createLogger();
    
    const store = createStore(reducer, applyMiddleware(logger, thunk));
    
    // dispatching
    store.dispatch(fetchUsers());
