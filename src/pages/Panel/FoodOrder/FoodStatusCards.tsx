import {foodOrderData} from "./Data.ts";
import {Card, Col, Flex, Row, Typography} from "antd";
import styles from "./FoodOrder.module.css";
import {ArrowUpOutlined} from "@ant-design/icons";

const {Title} = Typography;

export default function FoodStatusCards() {
    return (
        <Row gutter={[16, 16]}>
            {foodOrderData.map((item, index) => (
                <Col xs={24} sm={12} xl={8} xxl={6}>
                    <Card bordered className={styles.foodOrderCard} style={{backgroundColor: item.backgroundColor}}
                          size={"small"}>
                        <Flex key={index} vertical={false} style={{height: "100px"}} gap={20}>
                            <img src={item.image} alt={item.altText}/>
                            <Flex vertical justify={"space-between"} style={{width: "100%"}}>
                                <Title level={4} type={"secondary"}>{item.status}</Title>
                                <Flex justify={"space-between"}>
                                    <Title level={3}>{item.count}</Title>
                                    <Flex align={"center"} justify={"center"} style={{fontSize: "1.4rem"}}>
                                        <ArrowUpOutlined style={{color: item.color}}/>
                                        <span style={{color: item.color}}>{item.percentage}</span>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}