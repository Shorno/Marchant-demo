import {Card, Typography, Divider, Space, Button, Dropdown, Flex, Grid, MenuProps} from 'antd';
import {
    DownOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined, DeleteOutlined, FolderViewOutlined, UserOutlined, BookOutlined, EditOutlined
} from '@ant-design/icons';
import {MdOutlineTableBar} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {useState} from "react";
import "../Hall/HallReservation.tsx"
import EditInfoModal from "../Reservation/EditInfoModal.tsx";
import {TableReservationTypes} from "../../../../types/reservationTypes.ts";

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
    data: TableReservationTypes
}

const {useBreakpoint} = Grid

export default function TableReservationCard({
                                                date,
                                                day,
                                                time,
                                                full_name,
                                                pax_number,
                                                menu_type,
                                                status,
                                                table_number = 8,
                                                data,

                                            }: ReservationCardProps) {

    const screens = useBreakpoint()
    const isMobile = !screens.md;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMenuClick: MenuProps['onClick'] = () => {
        setIsModalOpen(true);
    };

    const items: MenuProps['items'] = [
        {
            key: 'view',
            label: 'View',
            icon: <FolderViewOutlined style={{color: "black"}}/>,
        },
        {
            key: 'edit',
            label: 'Edit',
            icon: <EditOutlined style={{color: "black"}}/>,
            onClick: handleMenuClick,
        },
        {
            key: 'delete',
            label: 'Delete',
            icon: <DeleteOutlined style={{color: "black"}}/>,
        },
    ];

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <Card className="reservation-card" style={{position: "relative"}} size={isMobile ? "small" : "default"}>
            <Flex justify="space-between" align="center" className="reservation-card-content">
                <Flex>
                    <Flex vertical justify={"center"} align={"center"} style={{width: "50px"}}>
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
                                    <Text type="secondary">
                                        {table_number === null ? <Button className={"assign-button"} type={"text"}
                                                                         variant={"text"}>Assign</Button> : table_number}
                                    </Text>
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
                            <Button className={"ubaky-primary-button"}>
                                Action
                                <DownOutlined className={"dropdown-arrow"}/>
                            </Button>
                        </Dropdown>
                }
            </Flex>
            <EditInfoModal
                data={data}
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </Card>
    );
}


