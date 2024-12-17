import {baseApi} from "../baseApi";

const RESERVATIONS_INFO = "/reservations/hall-reservation/info/";
const RESERVATIONS_TABLE = "/reservations/list/";
const RESERVATIONS_UPDATE = "/reservations/update";
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
        updateReservation: build.mutation({
            query: ({data, id}: {id: number, data: any }) => ({
                url: `${RESERVATIONS_UPDATE}/${id}/`,
                method: "PUT",
                data: data,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                }
            }),
        }),
    }),
});

export const {useGetReservationsInfoQuery, useGetReservationListQuery, useUpdateReservationMutation} = reservationsAPI;