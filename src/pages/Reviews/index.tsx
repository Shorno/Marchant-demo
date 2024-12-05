import { Breadcrumb, Layout} from "antd";
import { Link } from "react-router-dom";
import ReviewComponent from "./View/Review.tsx";
import { useGetReviewDetailsQuery, useGetReviewQuery } from "../../redux/api/Review/review.ts";
import ReviewCategories from "./View/ReviewCategories.tsx";

const { Content } = Layout;

const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'Reviews',
    },
]


const ReviewPage = () => {
    const {data,refetch} = useGetReviewQuery({});
    const {data:rating} = useGetReviewDetailsQuery({});
    return (
        <>
            <Layout>
                <Content>
                    <Breadcrumb style={{ margin: '12px 0' }} items={breadcrumbItems} />
                    <div>
                        <ReviewCategories rating={rating}/>
                        <>
                            <h3 style={{ margin: '12px 0' }}>Top Review</h3>
                            <ReviewComponent reviews={data} refetch={refetch} />
                        </>
                    </div>
                </Content>
            </Layout>
        </>
    );
};


export default ReviewPage;