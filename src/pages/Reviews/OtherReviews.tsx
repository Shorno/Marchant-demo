import {Typography, Grid, Flex} from "antd";
import './Reviews.css';
import ReviewCard from "./ReviewCard.tsx";
import {useState} from "react";
import ReplyingCard from "./ReplyingCard.tsx";


const {Title} = Typography;
const {useBreakpoint} = Grid

export default function OtherReviews() {
    const screens = useBreakpoint();
    const isTablet = !screens.lg;
    const reviewContainerStyles = {width: `${isTablet ? "100%" : "80%"}`, margin: "4rem auto"}
    const [isReplying, setIsReplying] = useState(false);

    const handleReplay = () => {
        console.log("Reply Clicked");
        setIsReplying(!isReplying);
    }


    return (
        <>
            <div style={reviewContainerStyles}>
                <Title level={2}>Yesterday</Title>
                <Flex vertical align={"end"} gap={20}>
                    <ReviewCard
                        isTablet={isTablet}
                        author={"Elon Mask"}
                        dateTime={"Sunday, 2.50 PM"}
                        reviewText={"Great product, I love it."}
                        onReply={handleReplay}
                    />
                </Flex>
                {
                    isReplying && (
                        <Flex vertical align={"end"} style={{marginTop: "1.5rem"}}>
                            <ReplyingCard author={"X Restaurant"} onClose={handleReplay}/>
                        </Flex>

                    )
                }
            </div>
        </>
    );
}
