/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Upload, Checkbox, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;


const apiData = {
    title: "string",
    email: "user@example.com",
    phone: "string",
    website: "string",
    street: "string",
    city: "string",
    zipcode: "string",
    country: "Afghanistan",
    identify_address: "string",
    number_of_booking_per_day: 2147483647,
    seat_capacity: 2147483647,
    average_bill: 0,
    currency: "string",
    cuisine_type: ["Americano"],
    logo: "string",
    cover: "string",
    timeslot: {
        morning: ["05:00"],
        lunch: ["11:30"],
        dinner: ["17:30"]
    },
    description: "string",
    opening_and_closing_time_remark: "string",
    service_type: ["Mastercard"],
    public_transport: "string",
    parking_note: "string",
    food_order_service: true,
    hall_reservation_service: true,
    lat_coordinates: "string",
    lng_coordinates: "string",
    galleries: [
        {
            image: "string"
        }
    ],
    is_agree: true
};

const Information = () => {

    const [selectedSlots, setSelectedSlots] = useState<{
        morning: string[];
        lunch: string[];
        dinner: string[];
    }>({
        morning: [],
        lunch: [],
        dinner: []
    })

    const timeSlots: { [key in keyof typeof selectedSlots]: string[] } = {
        morning: ["05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
        lunch: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",],
        dinner: ["19:00", "20:00", "21:00", "22:00", "23:00", "24:00",]
    };

    const handleSlotToggle = (slotType: keyof typeof selectedSlots, time: string) => {
        setSelectedSlots(prevState => {
            const isSelected = prevState[slotType].includes(time);
            return {
                ...prevState,
                [slotType]: isSelected
                    ? prevState[slotType].filter(t => t !== time) // Remove if already selected
                    : [...prevState[slotType], time] // Add if not selected
            };
        });
    };

    const onFinish = (values: any) => {
        console.log('Submitted values:', { ...values, selectedSlots });
    };

    return (
        <Form
            name="restaurantForm"
            layout="vertical"
            initialValues={apiData}
            onFinish={onFinish}
        >
            <Row gutter={[24, 24]}>

                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter the title!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Please enter a valid email!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                    <Input />
                </Form.Item>

                <Form.Item label="Website" name="website">
                    <Input />
                </Form.Item>

                <Form.Item label="Street" name="street">
                    <Input />
                </Form.Item>

                <Form.Item label="City" name="city">
                    <Input />
                </Form.Item>

                <Form.Item label="Zipcode" name="zipcode">
                    <Input />
                </Form.Item>

                <Form.Item label="Country" name="country">
                    <Input />
                </Form.Item>

                <Form.Item label="Identify Address" name="identify_address">
                    <Input />
                </Form.Item>

                <Form.Item label="Number of Bookings per Day" name="number_of_booking_per_day">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Seat Capacity" name="seat_capacity">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Average Bill" name="average_bill">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Currency" name="currency">
                    <Input />
                </Form.Item>

                <Form.Item label="Cuisine Type" name="cuisine_type">
                    <Select mode="multiple" allowClear>
                        <Option value="Americano">Americano</Option>
                        <Option value="Italian">Italian</Option>
                        <Option value="Chinese">Chinese</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Logo" name="logo">
                    <Upload>
                        <Button icon={<UploadOutlined />}>Upload Logo</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Cover" name="cover">
                    <Upload>
                        <Button icon={<UploadOutlined />}>Upload Cover</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Time Slots">
                    <Row gutter={[16, 16]}>
                        {Object.entries(timeSlots).map(([slotType, times]) => (
                            <Col span={24} key={slotType}>
                                <h4>{slotType.charAt(0).toUpperCase() + slotType.slice(1)} Slots</h4>
                                {times.map(time => (
                                    <Button
                                        key={time}
                                        onClick={() => handleSlotToggle(slotType as keyof typeof selectedSlots, time)}
                                        style={{
                                            margin: '0 8px 8px 0',
                                            backgroundColor: selectedSlots[slotType as keyof typeof selectedSlots].includes(time)
                                                ? 'amber'
                                                : ''
                                        }}
                                    >
                                        {time}
                                    </Button>
                                ))}
                            </Col>
                        ))}
                    </Row>
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Opening and Closing Time Remark" name="opening_and_closing_time_remark">
                    <TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Service Type" name="service_type">
                    <Select mode="multiple" allowClear>
                        <Option value="Mastercard">Mastercard</Option>
                        <Option value="Visa">Visa</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Public Transport" name="public_transport">
                    <Input />
                </Form.Item>

                <Form.Item label="Parking Note" name="parking_note">
                    <Input />
                </Form.Item>

                <Row>
                    <Form.Item name="food_order_service" valuePropName="checked">
                        <Checkbox>Food Order Service</Checkbox>
                    </Form.Item>

                    <Form.Item name="hall_reservation_service" valuePropName="checked">
                        <Checkbox>Hall Reservation Service</Checkbox>
                    </Form.Item>

                    <Form.Item name="is_agree" valuePropName="checked">
                        <Checkbox>I agree to the terms</Checkbox>
                    </Form.Item>
                </Row>


                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Row>

        </Form>
    );
};

export default Information;
