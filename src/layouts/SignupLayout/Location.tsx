import {useState} from "react";
import {Form, Input, Button} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import GetHelp from "../../pages/GetHelp/GetHelp";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {updateFormData} from "../../store/signupFromSlice.ts";

interface LocationProps {
    onNext: (values: LocationFormFields) => void;
    onPrevious: () => void;
}

interface LocationFormFields {
    latitude: string;
    longitude: string;
}

export default function Location({onNext, onPrevious}: LocationProps) {
    const [form] = Form.useForm<LocationFormFields>();
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const signUpFromData = useAppSelector(state => state.signupFrom);
    const dispatch = useAppDispatch();



    const [coordinates, setCoordinates] = useState({
        latitude: 24.8742508,
        longitude: 88.4375333,
    });

    const handleSubmit = (values: LocationFormFields) => {
        const lat = parseFloat(values.latitude);
        const lng = parseFloat(values.longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
            setCoordinates({
                latitude: lat,
                longitude: lng,
            });
            dispatch(updateFormData(values));
            onNext(values)
        } else {
            console.error("Invalid coordinates entered.");
        }
    };

    const mapSrc = `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${coordinates.latitude},${coordinates.longitude}&zoom=15`;

    return (
        <div>
            <GetHelp/>

            <p className="restaurant-title">MAP COORDINATES</p>
            <p className="restaurant-paragraph">
                Enter the latitude and longitude below to find a specific location.
            </p>

            <div className="form-container">
                <Form
                    form={form}
                    size={`${isMobile ? "middle" : "large"}`}
                    requiredMark={false}
                    className="restaurant-form"
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={signUpFromData}
                >
                    <div className="form-row">
                        <Form.Item
                            name="latitude"
                            label="Latitude"
                            rules={[
                                {
                                    required: true,
                                    message: "Latitude is required"
                                },
                                {
                                    pattern: /^-?\d+(\.\d+)?$/,
                                    message: "Latitude must be a valid number"
                                }
                            ]}
                        >
                            <Input placeholder="Enter latitude"/>
                        </Form.Item>

                        <Form.Item
                            name="longitude"
                            label="Longitude"
                            rules={[
                                {
                                    required: true,
                                    message: "Longitude is required"
                                },
                                {
                                    pattern: /^-?\d+(\.\d+)?$/,
                                    message: "Longitude must be a valid number"
                                }
                            ]}
                        >
                            <Input placeholder="Enter longitude"/>
                        </Form.Item>
                    </div>

                    {/* Embedded Map */}
                    <div style={{marginTop: '20px', marginBottom: '20px'}}>
                        <iframe
                            src={mapSrc}
                            width="100%"
                            height="450"
                            style={{border: "0"}}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
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
    );
}