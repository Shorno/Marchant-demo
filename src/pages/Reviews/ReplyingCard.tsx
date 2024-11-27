import {Button, Card, Flex, Input, Space, Typography} from "antd";
import {CloseOutlined, UserOutlined} from "@ant-design/icons";


interface ReplyingCardProps {
    author: string;
    isTablet?: boolean;
    onClose: () => void;
}

const {TextArea} = Input
const {Title} = Typography;

export default function ReplyingCard({
                                         author,
                                         isTablet,
                                         onClose,
                                     }: ReplyingCardProps) {


    return (
        <>
            <Card style={{width: "85%", padding: "0 8px"}} size={"small"}>
                <Flex justify="space-between" align="start">
                    <Space align="start">
                        <UserOutlined className={"avatar"}/>
                        <Space
                            direction={isTablet ? "vertical" : "horizontal"}
                            className={"authorInfo"}
                        >
                            <Title level={5} style={{margin: 0}}>{author}</Title>
                        </Space>
                    </Space>
                    <Space>
                        <CloseOutlined onClick={onClose} style={{fontSize: "1.1rem", cursor: "pointer"}}/>
                    </Space>
                </Flex>
                <Flex className={`reviewContent ${isTablet ? "tablet" : "desktop"}`}>
                    <TextArea rows={2} placeholder={"Write a reply"}/>
                </Flex>
                <Flex>
                    <Button
                        style={{marginLeft: "3rem", marginTop: "12px", backgroundColor: "#fe802b"}}
                        type="primary">Send</Button>
                </Flex>
            </Card>
        </>
    )
}