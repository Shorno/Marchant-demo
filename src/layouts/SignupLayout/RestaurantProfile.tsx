import {Button, Form, Input, Select, Upload} from "antd";
import GetHelp from "../../pages/GetHelp/GetHelp.tsx";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {ArrowRightOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {ReactNode} from "react";
import "../../pages/RestaurantBookingInfo/restaurantbookingform.css"


interface RestaurantProfileProps {
    onNext: (values: RestaurantInfoFormFields) => void;
    onPrevious: () => void;
}

interface RestaurantInfoFormFields {
    restaurantName: string;
    restaurantEmail: string;
    restaurantWebsite: string;
    restaurantAddress: string;
    city: string;
    zipCode: string;
    country: string;
    identifyAddress?: string;
    reservationPerDay: string;
    seatCapacity: string;
    averageBill: string;
    currency: string;
    cuisineType: string;
    restaurantProfile?: ReactNode;
    restaurantCover?: ReactNode;
}

const {Option} = Select;


export default function RestaurantProfile({onNext, onPrevious}: RestaurantProfileProps) {
    const [form] = Form.useForm<RestaurantInfoFormFields>();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const handleSubmit = async (values: RestaurantInfoFormFields) => {
        try {
            const updatedValues = {...values};
            console.log(updatedValues);
            onNext(updatedValues);
        } catch (error) {
            console.error('Error processing files:', error);
        }
    };

    const uploadButton = (loading: boolean) => (
        <div
            style={{
                border: 2,
                background: "#FCFCFC",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
            }}
        >
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
        </div>
    );

    return (
        <div>
            <GetHelp/>
            <p className="restaurant-title">Restaurant Information</p>
            <p className="restaurant-paragraph">
                All info of your restaurant shown below.
            </p>

            <div className="form-container">
                <Form
                    form={form}
                    size={`${isMobile ? "middle" : "large"}`}
                    requiredMark={false}
                    className="restaurant-form"
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <div className="form-row">
                        <Form.Item
                            name="restaurantName"
                            label="Restaurant Name"
                            rules={[{required: true, message: "Restaurant Name is required"}]}
                        >
                            <Input placeholder="Enter restaurant name"/>
                        </Form.Item>
                        <Form.Item
                            name="restaurantEmail"
                            label="Restaurant Email"
                            rules={[
                                {required: true, message: "Restaurant Email is required"},
                                {type: "email", message: "Please enter a valid email"}
                            ]}
                        >
                            <Input placeholder="Enter restaurant email"/>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="restaurantWebsite"
                        label="Restaurant Website"
                        rules={[{required: true, message: "Restaurant Website is required"}]}
                    >
                        <Input placeholder="Enter restaurant website"/>
                    </Form.Item>

                    <Form.Item
                        name="restaurantAddress"
                        label="Restaurant Address/Street"
                        rules={[{required: true, message: "Restaurant Address is required"}]}
                    >
                        <Input placeholder="Enter restaurant address"/>
                    </Form.Item>

                    <div className="form-row">
                        <Form.Item
                            name="country"
                            label="Country"
                            rules={[{required: true, message: "Country is required"}]}
                        >
                            <Select placeholder="Select Country">
                                <Option value="Country 1">Country 1</Option>
                                <Option value="Country 2">Country 2</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="city"
                            label="City"
                            rules={[{required: true, message: "City is required"}]}
                        >
                            <Select placeholder="Select City">
                                <Option value="City 1">City 1</Option>
                                <Option value="City 2">City 2</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="form-row">
                        <Form.Item
                            name="zipCode"
                            label="Zip Code"
                            rules={[{required: true, message: "Zip Code is required"}]}
                        >
                            <Input placeholder="Enter zip code"/>
                        </Form.Item>
                        <Form.Item
                            name="identifyAddress"
                            label="Identify Address"
                        >
                            <Input placeholder="Additional address details"/>
                        </Form.Item>
                    </div>

                    <div className="form-row">
                        <Form.Item
                            name="reservationPerDay"
                            label="Reservation Per Day"
                            rules={[{required: true, message: "Reservation Per Day is required"}]}
                        >
                            <Input type="number" placeholder="Enter daily reservations"/>
                        </Form.Item>
                        <Form.Item
                            name="seatCapacity"
                            label="Restaurant Seat Capacity"
                            rules={[{required: true, message: "Seat Capacity is required"}]}
                        >
                            <Input type="number" placeholder="Enter seat capacity"/>
                        </Form.Item>
                    </div>

                    <div className="form-row">
                        <Form.Item
                            name="averageBill"
                            label="Average Bill Per Customer"
                            rules={[{required: true, message: "Average Bill is required"}]}
                        >
                            <Input type="number" placeholder="Enter average bill"/>
                        </Form.Item>
                        <Form.Item
                            name="currency"
                            label="Your Currency"
                            rules={[{required: true, message: "Currency is required"}]}
                        >
                            <Input placeholder="Enter currency"/>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="cuisineType"
                        label="Cuisine Type"
                        rules={[{required: true, message: "Cuisine Type is required"}]}
                    >
                        <Select placeholder="Select Cuisine Type">
                            <Option value="Cuisine 1">Cuisine 1</Option>
                            <Option value="Cuisine 2">Cuisine 2</Option>
                        </Select>
                    </Form.Item>

                    <div className="form-row">
                        <Form.Item
                            name="restaurantProfile"
                            label="Restaurant Profile"
                            rules={[{required: true, message: "Restaurant Profile is required"}]}
                        >
                            <Upload
                                name="restaurantProfile"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false} // Hide the default upload list
                                beforeUpload={() => false}
                            >
                                {form.getFieldValue('restaurantProfile')
                                    ? <img
                                        src={form.getFieldValue('restaurantProfile')}
                                        alt="profile"
                                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    />
                                    : uploadButton(false)
                                }
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="restaurantCover"
                            label="Restaurant Cover"
                            rules={[{required: true, message: "Restaurant Cover is required"}]}
                        >
                            <Upload
                                name="restaurantCover"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={() => false}
                            >
                                {form.getFieldValue('restaurantCover')
                                    ? <img
                                        src={form.getFieldValue('restaurantCover')}
                                        alt="cover"
                                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                    />
                                    : uploadButton(false)
                                }
                            </Upload>
                        </Form.Item>
                    </div>

                    <div className="form-footer">
                        <Button onClick={onPrevious}>Previous</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="button-details"
                        >
                            Next <ArrowRightOutlined/>
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
