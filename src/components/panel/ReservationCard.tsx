import {Card, Typography, Divider, Space, Button, Dropdown, Flex} from 'antd';
import {
    DownOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import './ReservationCard.css';
import {FiUsers} from "react-icons/fi";
import {MdOutlineTableBar} from "react-icons/md";

const {Title, Text} = Typography;

interface ReservationCardProps {
    date: string;
    day: string;
    time: string;
    fullDate: string;
    tableNumber: string;
    waiterName: string;
    guestCount: number;
    menuType: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
}

export default function ReservationCard({
                                            date,
                                            day,
                                            time,
                                            fullDate,
                                            tableNumber,
                                            waiterName,
                                            guestCount,
                                            menuType,
                                            status
                                        }: ReservationCardProps) {

    const menuItems = [
        {key: 'edit', label: 'Edit Reservation'},
        {key: 'cancel', label: 'Cancel Reservation'},
    ];

    return (
        <Card className="reservation-card">
            <Flex justify="space-between" align="center" className="reservation-card-content">
                <Flex>
                    <Flex vertical>
                        <Title level={4} className="reservation-date">{day}</Title>
                        <Title className="reservation-date">{date}</Title>
                    </Flex>
                    <Divider type="vertical" className="reservation-divider"/>
                    <Flex className="reservation-info">
                        <Flex vertical justify="space-around" align="start" className="reservation-info-column">
                            <Flex align="center" justify="center" className="reservation-info-item">
                                <ClockCircleOutlined className="reservation-icon"/>
                                <Text type="secondary">{time} ({fullDate})</Text>
                            </Flex>
                            <Flex align="center" justify="center" className="reservation-info-item">
                                <MdOutlineTableBar className="reservation-icon"/>
                                <Text type="secondary">{tableNumber} ({waiterName})</Text>
                            </Flex>
                        </Flex>
                        <Flex vertical justify="space-around" align="start" className="reservation-info-column">
                            <Flex align="center" justify="center" className="reservation-info-item">
                                <FiUsers className="reservation-icon"/>
                                <Text type="secondary">{guestCount} ({menuType})</Text>
                            </Flex>
                            <Flex align="center" justify="center" className="reservation-info-item">
                                <ExclamationCircleOutlined className="reservation-icon"/>
                                <Text
                                    className={status === 'Completed' ? 'reservation-status-completed' : ''}>{status}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
                <Dropdown menu={{items: menuItems}}>
                    <Button className="reservation-edit-button">
                        <Space>
                            Edit
                            <DownOutlined/>
                        </Space>
                    </Button>
                </Dropdown>
            </Flex>
        </Card>
    );
}


