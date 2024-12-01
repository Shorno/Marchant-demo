import {message} from 'antd';
import SignupLayout from './SignupLayout';
import ProvideService from "../ProvideService/ProvideService.tsx";
import Location from "../Location/Location.tsx";
import Gallery from "../Gallery/Gallery.tsx";
import Agreement from "../Agreement/Agreement.tsx";
import RestaurantInfoForm from "../RestaurantBookingInfo/RestaurantInfoForm.tsx";

const steps = [
    {title: "Owner Portfolio"},
    {title: "Restaurant Profile", content: RestaurantInfoForm},
    {title: "Provide Service", content: ProvideService},
    {title: "Location", content: Location},
    {title: "Gallery", content: Gallery},
    {title: "Agreement", content: Agreement},
];

export default function RestaurantForm() {
    const onFinish = (values: any) => {
        console.log('Form values:', values);
        message.success('Form submitted successfully!');
    };

    return <SignupLayout steps={steps} onFinish={onFinish}/>;
};

