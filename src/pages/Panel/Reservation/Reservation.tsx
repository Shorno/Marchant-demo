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
import {
    useGetReservationListQuery,
} from "../../../redux/api/ReservationsInfo/ReservationsInfo.ts";
import {TableReservationTypes} from "../../../../types/reservationTypes.ts";
import {bookingStats, bookingStatsTitle} from "../PanelData.ts";
import TableReservationCard from "./TableReservationCard.tsx";


const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'Table Reservation',
    },
]
const {Title, Text} = Typography

export default function Reservation() {
    const {data: reservationList, isFetching} = useGetReservationListQuery({})

    console.log(reservationList)


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
                        <Segmented options={bookingStatsTitle} size={"middle"} style={{padding: "10px"}}/>
                    </Col>
                    <Spin spinning={isFetching}>
                        <Flex vertical gap={20}>
                            {reservationList?.results?.map((reservation : TableReservationTypes) => (
                                <TableReservationCard
                                    data={reservation}
                                    key={`${reservation.table_number}-${reservation.date}-${reservation.time}`}
                                    date={new Date(reservation.date).toLocaleString('en-US', {day: '2-digit'})}
                                    day={new Date(reservation.date).toLocaleString('en-US', {weekday: 'short'})}
                                    time={reservation.time}
                                    table_number={reservation.table_number}
                                    full_name={reservation.name}
                                    pax_number={reservation.person}
                                    menu_type={reservation.buffet_menu?.title}
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
