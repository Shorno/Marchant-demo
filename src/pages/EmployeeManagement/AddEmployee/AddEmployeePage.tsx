import ContentLayout from "../../../components/ContentLayout.tsx";
import {Link} from "react-router-dom";

const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'Add Employee',
    },
]
export default function AddEmployeePage() {
    return (
        <>
            <ContentLayout breadcrumbItems={breadcrumbItems}>
                <h1>Add Employee Page</h1>
            </ContentLayout>
        </>
    )
}