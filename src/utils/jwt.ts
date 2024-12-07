/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode"

export const decodedToken:any= (token:string) =>{
    return jwtDecode(token)
}