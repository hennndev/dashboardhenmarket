import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducers/appReducer";


export const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
})