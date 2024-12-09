/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantState {
    restaurantData: any; 
}

const initialState: RestaurantState = {
    restaurantData: {} 
};

const createRestaurantSlice = createSlice({
    name: 'createRestaurant',
    initialState,
    reducers: {
        setRestaurantData: (state, action: PayloadAction<any>) => {
            state.restaurantData = action.payload;
        },
    },
});

export const { setRestaurantData } = createRestaurantSlice.actions;
export default createRestaurantSlice.reducer;
