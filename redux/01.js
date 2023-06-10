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









