/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Agreement from './Agreement/Agreement';
import Gallery from './Gallery/Gallery';
import Location from './Location/Location';
import ProvideService from './ProvideService/ProvideService';
import RestaurantInfoForm from './RestaurantBookingInfo/RestaurantInfoForm';
import { message } from 'antd';
import { useCreateRestaurantMutation } from '../../../redux/api/RestaurantCreate/RestaurantCreate';
import StepperForm from '../../../components/StepperFrom/StepperForm';
import './RestaurantInfo.css';
import {useNavigate} from "react-router-dom";

export default function RestaurantInfo() {
    const [createRestaurant] = useCreateRestaurantMutation();
    const [galleryData, setGalleryData] = useState<{ image: string }[]>([]);
    const navigate = useNavigate();

    const steps = [
        { title: 'Restaurant Information', content: <RestaurantInfoForm/> },
        { title: 'Provide Service', content: <ProvideService /> },
        { title: 'Location', content: <Location /> },
        { title: 'Gallery', content: <Gallery onGalleryChange={setGalleryData} /> },
        { title: 'Agreement', content: <Agreement /> },
    ];

    const handleSubmit = async (values: any) => {
        const timeslot = {
            morning: values.morning?.filter((slot: any) => slot.selected).map((slot: any) => slot.time),
            lunch: values.lunch?.filter((slot: any) => slot.selected).map((slot: any) => slot.time),
            dinner: values.dinner?.filter((slot: any) => slot.selected).map((slot: any) => slot.time),
        };

        const transformedData = {
            title: values.title,
            email: values.email,
            phone: values.phone,
            street: values.street,
            city: values.city,
            zipcode: values.zipcode,
            country: values.country,
            identify_address: values.identify_address,
            number_of_booking_per_day:values.number_of_booking_per_day,
            seat_capacity: values.seat_capacity ,
            average_bill: values.average_bill,
            currency: values.currency,
            cuisine_type: values.cuisine_type,
            logo: values.logo[0],
            cover: values.cover[0], 
            description: values.description,
            opening_and_closing_time_remark: values.opening_and_closing_time_remark,
            service_type: values.service_type,
            public_transport: values.public_transport,
            parking_note: values.parking_note,
            enableFoodOrder: values.enableFoodOrder,
            enableHallBooking: values.enableHallBooking,
            lat_coordinates: values.lat_coordinates,
            lng_coordinates: values.lng_coordinates,
            is_agree: values.is_agree,
            timeslot: timeslot,
            galleries: galleryData.length > 0 ? galleryData : [],
        };

        console.log('Transformed Data:', transformedData);

        message.loading('Creating...');
        try {
            const res = await createRestaurant(transformedData);
            console.log('Response from API:', res);
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Error:', err);
            if (err.data) {
                console.error('API Errors:', err.data);
            }
        }
    };

    return (
        <div>
            <StepperForm
                submitHandler={(value: any) => {
                    handleSubmit(value);
                }}
                steps={steps}
            />
        </div>
    );
}
