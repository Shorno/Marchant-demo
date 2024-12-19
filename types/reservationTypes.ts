export type ReservationTypes = {
    date: string;
    time: string;
    table_number: number;
    full_name: string;
    pax_number: number;
    menu_type: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
}

export type TableReservationTypes = {
    id: number
    date: string;
    time: string;
    table_number: number;
    name: string;
    person: number;
    slot: string[];
    comment: string;
    buffet_menu: {
        description: string;
        price: string;
        title: string;
    };
    status: 'completed' | 'pending' | 'cancelled' | 'hold On' | 'confirmed' | 'absent';
    remark: string;
}