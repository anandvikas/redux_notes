import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
const logger = createLogger();

import counter1Reducer from "./slices/counter1Slice";
import counter2Reducer from "./slices/counter2Slice";
import userReducer from "./slices/userSlice";

const store = configureStore({
    reducer: {
        counter1: counter1Reducer,
        counter2: counter2Reducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => {
        let defaultMiddleware = getDefaultMiddleware();
        return [...defaultMiddleware, logger]
    }
})

// NOTE : the devtool middleware comes inbuilt in RTK

export default store;
