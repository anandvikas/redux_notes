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
        axios.get("https://jsonplaceholder.typicode.com/userssasasas")
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



