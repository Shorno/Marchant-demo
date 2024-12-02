import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RestaurantFormData} from "../../types/signupFrom.ts";

const initialState: RestaurantFormData = {} as RestaurantFormData;

const signupFromSlice = createSlice({
    name: "signupForm",
    initialState,
    reducers: {
        updateFormData: (state, action: PayloadAction<Partial<RestaurantFormData>>) => {
            return {...state, ...action.payload};
        },
        resetForm: () => initialState,
    }
})

export const {updateFormData, resetForm} = signupFromSlice.actions
export default signupFromSlice.reducer;