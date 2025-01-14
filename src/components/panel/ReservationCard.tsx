import {Card, Typography, Divider, Space, Button, Dropdown, Flex, Grid, MenuProps} from 'antd';
import {
    DownOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined, EditOutlined, DeleteOutlined, FolderViewOutlined, UserOutlined, BookOutlined
} from '@ant-design/icons';
import './ReservationCard.css';
import {MdOutlineTableBar} from "react-icons/md";
import {FiUsers} from "react-icons/fi";

const {Title, Text} = Typography;

interface ReservationCardProps {
    date: string;
    day: string;
    time: string;
    full_name: string;
    pax_number: number;
    menu_type: string;
    status: 'Completed' | 'Pending' | 'Cancelled';
    table_number: number;
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
                                            full_name,
                                            pax_number,
                                            menu_type,
                                            status,
                                            table_number = 8

                                        }: ReservationCardProps) {

    const screens = useBreakpoint()
    const isMobile = !screens.md;


    return (
        <Card className="reservation-card" style={{position: "relative"}} size={isMobile ? "small" : "default"}>
            <Flex justify="space-between" align="center" className="reservation-card-content">
                <Flex>
                    <Flex vertical justify={"center"} align={"center"} style={{width :"50px"}}>
                        <Title level={isMobile ? 4 : 3} className="reservation-date">{day}</Title>
                        <Title level={isMobile ? 3 : 2} className="reservation-date">{date}</Title>
                    </Flex>
                    <Divider type="vertical" className="reservation-divider"
                             style={{margin: isMobile ? "0 1rem" : "0 2rem"}}
                    />
                    <Flex className="reservation-info">
                        <Flex gap={isMobile ? 0 : 30}
                              style={{display: "flex", flexDirection: `${isMobile ? "column" : "row"}`}}>
                            <Flex justify="space-around" align="start" className="reservation-info-column">
                                <Flex align="center" justify="center" className="reservation-info-item">
                                    <ClockCircleOutlined className="reservation-icon"/>
                                    <Text type="secondary">{time}</Text>
                                </Flex>
                                <Flex align="center" justify="center" className="reservation-info-item">
                                    <MdOutlineTableBar className="reservation-icon"/>
                                    <Text type="secondary">{table_number}</Text>
                                </Flex>
                            </Flex>
                            <Flex vertical justify="space-around" align="start" className="reservation-info-column">
                                <Flex align="center" justify="center" className="reservation-info-item">
                                    <UserOutlined className="reservation-icon"/>
                                    <Text type="secondary">{full_name}</Text>
                                </Flex>
                                <Flex align="center" justify="center" className="reservation-info-item">
                                    <BookOutlined className="reservation-icon"/>
                                    <Text type="secondary">{menu_type}</Text>

                                </Flex>
                            </Flex>
                            <Flex vertical justify="space-around" align="start" className="reservation-info-column">
                                <Flex align="center" justify="center" className="reservation-info-item">
                                    <FiUsers className="reservation-icon"/>
                                    <Text type="secondary">{pax_number}</Text>
                                </Flex>
                                <Flex align="center" justify="center" className="reservation-info-item">
                                    <ExclamationCircleOutlined className="reservation-icon"/>
                                    <Text
                                        className={status === 'Completed' ? 'reservation-status-completed' : 'reservation-status-pending'}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
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
                            <Button className={"reservation-edit-button"}>
                                Action
                                <DownOutlined/>
                            </Button>
                        </Dropdown>
                }
            </Flex>
        </Card>
    );
}


