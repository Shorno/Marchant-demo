import ContentLayout from "../../../components/ContentLayout.tsx";
import {Link} from "react-router-dom";

const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'All Employee',
    },
]
export default function AllEmployeePage() {
    return (
        <>
            <ContentLayout breadcrumbItems={breadcrumbItems}>
                <h1>All Employee Page</h1>
            </ContentLayout>
        </>
    )
}

