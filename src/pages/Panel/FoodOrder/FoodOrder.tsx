import ContentLayout from "../../../components/ContentLayout.tsx";
import {Link} from "react-router-dom";
import {Typography} from "antd";
import FoodStatusCards from "./FoodStatusCards.tsx";
import Timeline from "./Timeline.tsx";

const {Title} = Typography;


const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'Food Order',
    },
]


export default function FoodOrder() {
    return (

        <ContentLayout breadcrumbItems={breadcrumbItems}>
            <Title level={2}>Hi, michele 👋</Title>
            <FoodStatusCards/>
            <Timeline/>
        </ContentLayout>

    )
}