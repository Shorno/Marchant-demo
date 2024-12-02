import { combineReducers } from 'redux'
import { baseApi } from './api/baseApi'


export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
})