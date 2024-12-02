import {configureStore} from "@reduxjs/toolkit";
import signupFormReducer from "./signupFromSlice"

export const store = configureStore({
    reducer: {
        signupFrom: signupFormReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch