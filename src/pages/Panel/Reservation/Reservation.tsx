import ContentLayout from "../../../components/ContentLayout.tsx";
import {Link} from "react-router-dom";
import {
    Col,
    Flex,
    Row,
    Segmented, Spin,
    Typography
} from "antd";
import ReservationCard from "../../../components/panel/ReservationCard.tsx";
import BookingStatsCard, {BookingStatTrend} from "../../../components/panel/BookingStatsCard.tsx";
import {useGetReservationsInfoQuery} from "../../../redux/api/ReservationsInfo/ReservationsInfo.ts";
import {ReservationTypes} from "../../../../types/reservationTypes.ts";


const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'Table Reservation',
    },
]
const {Title, Text} = Typography


const options = [
    {value: 'upcoming', label: 'Upcoming'},
    {value: 'pending', label: 'Pending'},
    {value: 'recurring', label: 'Recurring'},
    {value: 'past', label: 'Past'},
    {value: 'cancelled', label: 'Cancelled'},
]

const bookingStats = [
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


export default function Reservation() {

    const {data: reservationInfo, isFetching} = useGetReservationsInfoQuery({})
    console.log(reservationInfo)

    return (
        <>
            <ContentLayout breadcrumbItems={breadcrumbItems}>
                <Flex gap={40} vertical>
                    <Row gutter={[12, 12]}>
                        {bookingStats?.map((stat, index) => (
                            <BookingStatsCard
                                key={index}
                                title={stat.title}
                                value={stat.value}
                                color={stat.color}
                                chartData={stat.chartData}
                                trend={stat.trend as BookingStatTrend}
                            />
                        ))}
                    </Row>
                    <Flex vertical>
                        <Title level={4}>Reservation Table</Title>
                        <Text type="secondary">This is Reservation Table secondary text.</Text>
                    </Flex>
                    <Col xs={24} xl={12} style={{overflow: "auto"}}>
                        <Segmented options={options} size={"middle"} style={{padding: "10px"}}/>
                    </Col>
                    <Spin spinning={isFetching}>
                        <Flex vertical gap={20}>
                            {reservationInfo?.data?.map((reservation : ReservationTypes) => (
                                <ReservationCard
                                    key={`${reservation.table_number}-${reservation.date}-${reservation.time}`}
                                    date={new Date(reservation.date).toLocaleString('en-US', {day: '2-digit'})}
                                    day={new Date(reservation.date).toLocaleString('en-US', {weekday: 'short'})}
                                    time={reservation.time}
                                    table_number={reservation.table_number}
                                    full_name={reservation.full_name}
                                    pax_number={reservation.pax_number}
                                    menu_type={reservation.menu_type}
                                    status={reservation.status}
                                />
                            ))}
                        </Flex>
                    </Spin>
                </Flex>


            </ContentLayout>
        </>
    )
}
