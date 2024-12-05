import {Card, Typography, Divider, Space, Button, Dropdown, Flex, Grid, MenuProps} from 'antd';
import {
    DownOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined, EditOutlined, DeleteOutlined, FolderViewOutlined
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

const {useBreakpoint} = Grid
const items: MenuProps['items'] = [
    {
        key: 'view',
        label: 'View',
        icon: <FolderViewOutlined style={{color: "black"}}/>

    },
    {
        key: 'edit',
        label: 'Edit',
        icon: <EditOutlined style={{color: "black"}}/>

    },
    {
        key: 'delete',
        label: 'Delete',
        icon: <DeleteOutlined style={{color: "black"}}/>

    },


];

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

    const screens = useBreakpoint()
    const isMobile = !screens.md;


    return (
        <Card className="reservation-card" style={{position: "relative"}}>
            <Flex justify="space-between" align="center" className="reservation-card-content">
                <Flex>
                    <Flex vertical justify={"center"}>
                        <Title level={isMobile ? 5 : 4} className="reservation-date">{day}</Title>
                        <Title level={isMobile ? 2 : 1} className="reservation-date">{date}</Title>
                    </Flex>
                    <Divider type="vertical" className="reservation-divider"
                             style={{margin: isMobile ? "0 1rem" : "0 3rem"}}
                    />
                    <Flex className="reservation-info">
                        <Flex gap={isMobile ? 0 : 30}
                              style={{display: "flex", flexDirection: `${isMobile ? "column" : "row"}`}}>
                            <Flex justify="space-around" align="start" className="reservation-info-column">
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
                </Flex>
                {
                    isMobile ?
                        <Dropdown className={"mobile-dropdown"} menu={{items}}>
                            <Space>
                                ...
                                <DownOutlined/>
                            </Space>
                        </Dropdown>
                        :
                        <Dropdown menu={{items}}>
                            <Button className="reservation-edit-button">
                                <Space>
                                    Edit
                                    <DownOutlined/>
                                </Space>
                            </Button>
                        </Dropdown>
                }


            </Flex>
        </Card>
    );
}


