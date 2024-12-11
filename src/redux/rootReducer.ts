import { combineReducers } from "redux";
import { baseApi } from "./api/baseApi";
import dateReducer from "./slice/calendarSlice";
import loginReducer from "./slice/isLoggedInSlice"
import createRestaurantReducer from "./slice/createRestaurantSlice"

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  selectDate: dateReducer,
  isLoggedIn: loginReducer,
  createRestaurant: createRestaurantReducer,
});
