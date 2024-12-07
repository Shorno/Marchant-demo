export type ReservationTypes = {
    date: string;
    time: string;
    table_number: number;
    full_name: string;
    pax_number: number;
    menu_type: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
}
