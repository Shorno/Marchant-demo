import { combineReducers } from "redux";
import { baseApi } from "./api/baseApi";
import dateReducer from "./slice/calendarSlice";

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  selectDate: dateReducer,
});
