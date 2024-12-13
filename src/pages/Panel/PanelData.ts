export const bookingStatsTitle = [
    {value: 'upcoming', label: 'Upcoming'},
    {value: 'pending', label: 'Pending'},
    {value: 'recurring', label: 'Recurring'},
    {value: 'past', label: 'Past'},
    {value: 'cancelled', label: 'Cancelled'},
]

export const bookingStats = [
    {
        title: "Total Booking",
        value: 50,
        color: "#237804",
        chartData: [264, 417, 438, 887, 309, 397, 492, 467, 513],
    },
    {
        title: "Confirmed Booking",
        value: 35,
        color: "#237804",
        chartData: [264, 300, 350, 320, 309, 397, 250, 320, 330],
    },
    {
        title: "Pending Booking",
        value: 10,
        color: "#d4b106",
        chartData: [123, 456, 789, 101, 112, 131, 415, 161, 200],
        trend: "down",
    },
    {
        title: "Cancelled Booking",
        value: 5,
        color: "#cf1322",
        chartData: [264, 210, 310, 240, 309, 397, 220, 210, 150],
        trend: "down",
    }
];