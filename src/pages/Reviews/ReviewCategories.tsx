import { reviewsCategory } from "./ReviewData.tsx";
import { Card, Flex, Rate, Typography } from "antd";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

const { Meta } = Card;

const metaStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "-12px"
}

const reviewCardTitle = (title: string, rating: string) =>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>{title}</p>
        <p>{rating}</p>
    </div>

const { Title } = Typography;


export default function ReviewCategories() {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const reviewCardStyles = {
        borderRadius: "8px", width: `${isMobile ? "100%" : "270px"}`, padding: "12px", marginTop: "1rem"
    }

    return (
        <>
            <Title level={4}>Categories</Title>
            <Flex gap={10} justify={"center"} wrap>
                {reviewsCategory.map((review) => {
                    return (
                        <Card
                            key={review.reviewCategoryName}
                            hoverable
                            style={reviewCardStyles}
                        >
                            <Meta
                                style={metaStyles}
                                avatar={review.icon}
                                title={reviewCardTitle(`${review.reviewCategoryName}`, `${review.rating}/5`)}
                                description=
                                {
                                    <Rate
                                        disabled
                                        allowHalf
                                        defaultValue={review.rating}
                                        style={{ fontSize: 16 }}
                                    />
                                }
                            />
                        </Card>
                    )
                })}
            </Flex>

        </>
    )
}
