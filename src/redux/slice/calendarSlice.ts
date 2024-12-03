import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
    selectedDate: dayjs().format("YYYY-MM-DD"),
    refresh: false,
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        toggleRefresh: (state) => {
            state.refresh = !state.refresh;
        },
    },
});

export const { setSelectedDate, toggleRefresh } = calendarSlice.actions;
export default calendarSlice.reducer;
