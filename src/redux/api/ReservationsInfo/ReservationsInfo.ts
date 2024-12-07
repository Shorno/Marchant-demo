import {baseApi} from "../baseApi";

const RESERVATIONS_INFO = "/reservations/hall-reservation/info/";


export const reservationsAPI = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getReservationsInfo: build.query({
            query: () => ({
                url: RESERVATIONS_INFO,
                method: "GET",
            }),
        }),
    }),
});

export const {useGetReservationsInfoQuery} = reservationsAPI;
