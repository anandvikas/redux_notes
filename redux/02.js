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
// store.dispatch(createIncrementAction());
// store.dispatch(createIncrementAction(2));
// store.dispatch(createDecrementAction(1));

const { bindActionCreators } = redux;
const actions = bindActionCreators({ createIncrementAction, createDecrementAction }, store.dispatch);

actions.createIncrementAction();
actions.createIncrementAction(2);
actions.createDecrementAction(1);

// 5. Unsubscribing ---
let unsubscribe = subscription;
unsubscribe();

// the state change due to this dispatch will not be logged because, store is unsubscribed.
store.dispatch(createIncrementAction());
store.dispatch(createDecrementAction());