import {baseApi} from "../baseApi";

const RESERVATIONS_INFO = "/reservations/hall-reservation/info/";
const RESERVATIONS_TABLE = "/reservations/list/";


export const reservationsAPI = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getReservationsInfo: build.query({
            query: () => ({
                url: RESERVATIONS_INFO,
                method: "GET",
            }),
        }),
        getReservationList: build.query({
            query: () => ({
                url: RESERVATIONS_TABLE,
                method: "GET",
            }),
        }),
    }),
});

export const {useGetReservationsInfoQuery,useGetReservationListQuery} = reservationsAPI;
