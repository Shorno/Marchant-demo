import ContentLayout from "../../../components/ContentLayout.tsx";
import {Link} from "react-router-dom";

const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'Schedule Employee',
    },
]
export default function ScheduleManagementPage() {
    return (
        <>
            <ContentLayout breadcrumbItems={breadcrumbItems}>
                <h1>Schedule Management Page</h1>
            </ContentLayout>
        </>
    )
}

