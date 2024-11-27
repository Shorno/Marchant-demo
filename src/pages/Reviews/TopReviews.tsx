import {Typography, Grid, Flex} from "antd";
import './Reviews.css';
import ReviewCard from "./ReviewCard.tsx";


const {Title} = Typography;
const {useBreakpoint} = Grid

export default function TopReviews() {
    const screens = useBreakpoint();
    const isTablet = !screens.lg;
    const reviewContainerStyles = {width: `${isTablet ? "100%" : "80%"}`, margin: "4rem auto"}


    return (
        <>
            <div style={reviewContainerStyles}>
                <Title level={2}>Top Reviews</Title>
                <Flex vertical align={"end"} gap={20}>
                    <ReviewCard
                        isTablet={isTablet}
                        author={"Shorno Kamal"}
                        dateTime={"Monday, 4.50 PM"}
                        reviewText={"Testing Review"}
                    />

                </Flex>
            </div>
        </>
    );
}
