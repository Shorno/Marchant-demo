import { createApi} from '@reduxjs/toolkit/query/react'
import { tagTypesList } from '../tag-types'
import { getBaseUrl }  from '../../helpers/config/envConfig'
import axiosBaseQuery from '../../helpers/axios/axiosBaseQuery'


export const baseApi = createApi({
  
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () =>({
    
  }),
  
  tagTypes:tagTypesList
})
