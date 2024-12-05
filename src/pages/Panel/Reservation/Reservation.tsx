import ContentLayout from "../../../components/ContentLayout.tsx";
import {Link} from "react-router-dom";
import {
    Card,
    Col,
    Flex,
    Row,
    Segmented,
    Statistic,
    Typography
} from "antd";
import {BiUpArrow} from "react-icons/bi";

import ReservationCard from "../../../components/panel/ReservationCard.tsx";

const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'Table Reservation',
    },
]
const {Title, Text} = Typography

const cardStats = [
    {
        title: "Active",
        value: 11.28,
        precision: 2,
        valueStyle: {color: '#3f8600'},
        prefix: <BiUpArrow/>,
        suffix: "%"
    },
    {
        title: "Inactive",
        value: 5.67,
        precision: 2,
        valueStyle: {color: '#cf1322'},
        prefix: <BiUpArrow/>,
        suffix: "%"
    },
    {
        title: "Pending",
        value: 8.45,
        precision: 2,
        valueStyle: {color: '#d4b106'},
        prefix: <BiUpArrow/>,
        suffix: "%"
    },
    {
        title: "Completed",
        value: 15.89,
        precision: 2,
        valueStyle: {color: '#237804'},
        prefix: <BiUpArrow/>,
        suffix: "%"
    }
]
const options = [
    {value: 'upcoming', label: 'Upcoming'},
    {value: 'pending', label: 'Pending'},
    {value: 'recurring', label: 'Recurring'},
    {value: 'past', label: 'Past'},
    {value: 'cancelled', label: 'Cancelled'},
]

export default function Reservation() {


    return (
        <>
            <ContentLayout breadcrumbItems={breadcrumbItems}>
                <Flex gap={40} vertical>
                    <Row gutter={[12, 12]}>
                        {
                            cardStats.map((stat, index) => {
                                return (
                                    <Col xs={24} sm={12} lg={6} key={index}>
                                        <Card bordered={false}
                                              style={{
                                                  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
                                              }}>
                                            <Statistic
                                                title={stat.title}
                                                value={stat.value}
                                                precision={stat.precision}
                                                valueStyle={stat.valueStyle}
                                                prefix={stat.prefix}
                                                suffix={stat.suffix}
                                            />
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <Flex vertical>
                        <Title level={4}>Reservation Table</Title>
                        <Text type="secondary">This is Reservation Table secondary text.</Text>
                    </Flex>
                    <Col xs={24} xl={12}>
                        <Segmented options={options} size={"middle"} style={{padding: "6px"}} block/>
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