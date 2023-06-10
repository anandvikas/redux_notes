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

