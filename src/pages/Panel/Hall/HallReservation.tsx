import ContentLayout from "../../../components/ContentLayout.tsx";
import {Link} from "react-router-dom";
import {
    Col,
    Flex,
    Row,
    Segmented, Spin,
    Typography
} from "antd";
import BookingStatsCard, {BookingStatTrend} from "../../../components/panel/BookingStatsCard.tsx";
import {useGetReservationsInfoQuery} from "../../../redux/api/ReservationsInfo/ReservationsInfo.ts";
import {ReservationTypes} from "../../../../types/reservationTypes.ts";
import {bookingStats, bookingStatsTitle} from "../PanelData.ts";
import HallReservationCard from "./HallReservationCard.tsx";

const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'Hall Reservation',
    },
]
const {Title, Text} = Typography



export default function HallReservation() {
    const {data: hallReservationInfo, isFetching} = useGetReservationsInfoQuery({})
    console.log(hallReservationInfo)

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
                        <Title level={4}>Hall Reservation</Title>
                        <Text type="secondary">This is Reservation Table secondary text.</Text>
                    </Flex>
                    <Col xs={24} xl={12} style={{overflow: "auto"}}>
                        <Segmented options={bookingStatsTitle} size={"middle"} style={{padding: "10px"}}/>
                    </Col>
                    <Spin spinning={isFetching}>
                        <Flex vertical gap={20}>
                            {hallReservationInfo?.data?.map((reservation : ReservationTypes) => (
                                <HallReservationCard
                                    key={`${reservation.table_number}-${reservation.time}`}
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
