import {Button, Card, Flex, Image, Space, Typography} from "antd";
import {EyeOutlined, UserOutlined} from "@ant-design/icons";
import {IoReturnUpForwardOutline} from "react-icons/io5";
import {useState} from "react";
import ReplyCard from "./ReplyCard.tsx";
import {fallbackImage} from "./ReviewData.tsx";

const {Title, Text} = Typography;

interface ReviewCardProps {
    author: string;
    dateTime: string;
    reviewText: string;
    isTablet?: boolean;
    onReply?: () => void;
}



export default function ReviewCard({
                                       author,
                                       dateTime,
                                       reviewText,
                                       isTablet,
                                       onReply,
                                   }: ReviewCardProps) {
    const [reply] = useState(true);

    return (
        <>
            <Card className={"card-container"} size={"small"}>
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
                    <Space>
                        <Button onClick={onReply} type="default" size={`${isTablet ? "small" : "middle"}`}
                                className={"replyButton"}>
                            <IoReturnUpForwardOutline
                                size={20}
                                className={"replyIcon"}
                            />
                            Reply
                        </Button>
                    </Space>
                </Flex>

                <Flex className={`reviewContent ${isTablet ? "tablet" : "desktop"}`}>
                    {reviewText}
                </Flex>

                <Flex className={`images ${isTablet ? "tablet" : ''}`}>
                    <Space className={"imageContainer"}>
                        <Image
                            width={50}
                            height={50}
                            preview={{
                                mask: <EyeOutlined style={{fontSize : "1.2rem"}}/>
                            }}
                            fallback={fallbackImage}
                        />
                        <Image
                            preview={{
                                mask: <EyeOutlined style={{fontSize : "1.2rem"}}/>
                            }}
                            width={50}
                            height={50}
                            fallback={fallbackImage}
                        />
                    </Space>
                </Flex>
            </Card>

            {reply && (
                <ReplyCard
                    className={"reply-container"}
                    isTablet={isTablet}
                    author={"X Restaurant"}
                    dateTime={"Sunday, 2.50 PM"}
                    replyText={"Great product, I love it."}
                />
            )}
        </>
    );
}

