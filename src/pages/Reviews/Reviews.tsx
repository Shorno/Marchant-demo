import {Link} from "react-router-dom";
import ReviewsPageContent from "./ReviewsPageContent.tsx";
import ContentLayout from "../../components/ContentLayout.tsx";


const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'Reviews',
    },
]


export default function Reviews() {

    return (
        <>
            <ContentLayout breadcrumbItems={breadcrumbItems}>
                <ReviewsPageContent/>
            </ContentLayout>

        </>
    )
}