import {Card, Flex, Space, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";


interface ReviewCardProps {
    author: string;
    dateTime: string;
    replyText: string;
    isTablet?: boolean;
    className?: string;
}

const {Title, Text} = Typography;

export default function ReplyCard({
                                      author,
                                      dateTime,
                                      replyText,
                                      isTablet,
                                      className,
                                  }: ReviewCardProps) {
    return (
        <>
            <Card className={`${className}`}
                  style={{width: "90%", padding: "0 8px", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.1)"}} size={"small"}>
                <Flex justify="space-between" align="start">
                    <Space align="start">
                        <UserOutlined className={"avatar"}/>
                        <Space
                            direction={isTablet ? "vertical" : "horizontal"}
                            className={"authorInfo"}
                        >
                            <Title level={5} style={{margin: 0}}>{author}</Title>
                            <Text type="secondary">{dateTime}</Text>
                        </Space>
                    </Space>
                </Flex>

                <Flex className={`reviewContent ${isTablet ? "tablet" : "desktop"}`}>
                    {replyText}
                </Flex>
            </Card>
        </>
    )
}