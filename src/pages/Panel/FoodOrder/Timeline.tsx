import {Avatar, Button, Card, Col, DatePicker, Flex, Row, Table, Tag, Typography} from "antd";
import styles from "./FoodOrder.module.css"
import TimelineCard from "./TimelineCard.tsx";
import {CalendarOutlined} from "@ant-design/icons";
import type {TableProps} from 'antd';
import React from "react";

const {Title, Text} = Typography
const {RangePicker} = DatePicker;

interface DataType {
    id: number;
    'customer-info': {
        name: string;
        phone: string;
        image: string;
    };
    menu: string;
    payment: string;
    'total-price': number;
    'rider-info': {
        name: string;
        phone: string;
        image: string;
    };
    status: string;
    action?: React.ReactNode;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (id) => <Flex style={{borderRadius: "50%", border: "1px solid #d9d9d9", width: "25px", height: "25px"}}
                              justify={"center"} align={"center"}>
            <Text>{id}</Text>
        </Flex>

    },
    {
        title: 'Customer Info',
        dataIndex: 'customer-info',
        key: 'customer-info',
        render: (customerInfo) => (
            <Flex gap={10}>
                <Avatar shape={"square"} size={50} src={customerInfo.image}/>
                <Flex vertical gap={5}>
                    <Title level={5} style={{margin: 0}}>{customerInfo.name}</Title>
                    <Text style={{margin: 0}} type={"secondary"}>{customerInfo.phone}</Text>
                </Flex>
            </Flex>
        ),
    },
    {
        title: 'Menu',
        dataIndex: 'menu',
        key: 'menu',
        render: (menu) => (
            <Text style={{color: "blue"}}>{menu}</Text>
        ),
    },
    {
        title: 'Payment',
        dataIndex: 'payment',
        key: 'payment',
    },
    {
        title: 'Total Price',
        dataIndex: 'total-price',
        key: 'total-price',
        render: (price) => <Title level={5}>${price.toFixed(2)}</Title>,
    },
    {
        title: 'Rider Info',
        dataIndex: 'rider-info',
        key: 'rider-info',
        render: (riderInfo) => (
            <Flex gap={10}>
                <Avatar shape={"square"} size={50} src={riderInfo.image}/>
                <Flex vertical gap={5}>
                    <Title level={5} style={{margin: 0}}>{riderInfo.name}</Title>
                    <Text style={{margin: 0}} type={"secondary"}>{riderInfo.phone}</Text>
                </Flex>
            </Flex>
        ),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
            <Tag color={status === 'Delivered' ? 'green' : 'volcano'}>
                {status.toUpperCase()}
            </Tag>
        ),
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        render: () => (
            <Button type={"text"}>...</Button>
        ),
    },
];

const data: DataType[] = [
    {
        id: 1,
        'customer-info': {
            name: 'Epul Rohman',
            phone: '(486)813-645',
            image: 'https://i.pravatar.cc/50?img=1',
        },
        menu: 'Special box',
        payment: 'Online',
        'total-price': 3.99,
        'rider-info': {
            name: 'Epul Rohman',
            phone: '(486)813-645',
            image: 'https://i.pravatar.cc/50?img=2',
        },
        status: 'Delivered',
    },
    {
        id: 2,
        'customer-info': {
            name: 'Epul Rohman',
            phone: '(486)813-645',
            image: 'https://i.pravatar.cc/50?img=3',
        },
        menu: 'Special box',
        payment: 'Cash on delivery',
        'total-price': 3.99,
        'rider-info': {
            name: 'Epul Rohman',
            phone: '(486)813-645',
            image: 'https://i.pravatar.cc/50?img=4',
        },
        status: 'Cooking',
    },
];

export default function Timeline() {


    return (

        <Flex className={styles.timeline} vertical>
            <Flex align={"center"} gap={40}>
                <Title level={3}>Timeline</Title>
                <Tag color="orange">Updated X min ago</Tag>
            </Flex>


            <Col xs={24} md={18} lg={24} xxl={18}>
                <Card style={{backgroundColor: "#f5f5f5"}}>
                    <Row gutter={[200, 30]}>
                        <Col xs={24} xl={12}>
                            <TimelineCard/>
                            <Col style={{borderBottom: "2px solid #d9d9d9", paddingBottom: "2rem"}}/>
                        </Col>
                        <Col xs={24} xl={12}>
                            <TimelineCard/>
                            <Col style={{borderBottom: "2px solid #d9d9d9", paddingBottom: "2rem"}}/>
                        </Col>
                        <Col xs={24} xl={12}>
                            <TimelineCard/>
                        </Col>
                        <Col xs={24} xl={12}>
                            <TimelineCard/>
                        </Col>
                    </Row>
                </Card>
            </Col>

            <Col style={{margin: "2rem 0"}} xs={24} lg={24} xxl={18}>
                <Flex justify={"space-between"} align={"center"}>
                    <Title level={4}>Order reports</Title>
                    <RangePicker prefix={<CalendarOutlined/>} suffixIcon={null}/>
                </Flex>
            </Col>

            <Table<DataType> columns={columns} dataSource={data} pagination={false} scroll={{ x: 'max-content' }}/>

        </Flex>
    )
}