import ContentLayout from "../../../components/ContentLayout.tsx";
import {Link} from "react-router-dom";
import {
    Col,
    Flex,
    Row,
    Segmented,
    Typography
} from "antd";
import ReservationCard from "../../../components/panel/ReservationCard.tsx";
import BookingStatsCard, {BookingStatTrend} from "../../../components/panel/BookingStatsCard.tsx";


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
                    <Col xs={24} xl={12} style={{overflow:"auto"}}>
                        <Segmented options={options} size={"middle"} style={{padding: "10px"}}/>
                    </Col>

                    <Flex vertical gap={20}>
                        <ReservationCard
                            date="28"
                            day="Wed"
                            time="09:00 - 09:30"
                            fullDate="2024-11-03"
                            tableNumber="8"
                            waiterName="Umar Glush"
                            guestCount={5}
                            menuType="Normal Menu"
                            status="Completed"
                        />
                        <ReservationCard
                            date="28"
                            day="Wed"
                            time="09:00 - 09:30"
                            fullDate="2024-11-03"
                            tableNumber="8"
                            waiterName="Umar Glush"
                            guestCount={5}
                            menuType="Normal Menu"
                            status="Completed"
                        />
                    </Flex>
                </Flex>


            </ContentLayout>
        </>
    )
}