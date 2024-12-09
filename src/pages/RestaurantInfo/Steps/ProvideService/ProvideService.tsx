/* eslint-disable @typescript-eslint/no-explicit-any */
import GetHelp from "../GetHelp/GetHelp";
import "./provideservice.css";
import { Col, Divider, Row, } from "antd";
import FormInput from "../../../../components/From/FromInput";
import FormCheckbox from "../../../../components/From/FormCheckbox";
import FormTextArea from "../../../../components/From/FormTextArea";
import { useForm } from "react-hook-form";
import FromTimeSlotSelector from "../../../../components/From/FromTimeSlotSelector";

const ProvideService = () => {

    const methods = useForm({
        defaultValues: {
            morning: [
                { time: "05:00", },
                { time: "06:00", },
            ],
            lunch: [
                { time: "12:00", },
                { time: "13:00", },
            ],
            dinner: [
                { time: "19:00", },
                { time: "20:00", },
            ],
        },
    });



    return (
        <div>
            <GetHelp></GetHelp>
            <p className="restaurant-title">Manage Restaurant Time Slot</p>
            <p className="restaurant-paragraph">
                All info of your restaurant shown below.
            </p>

            <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
                {/* name */}
                <Col span={24}>
                    <FromTimeSlotSelector
                        name="morning"
                        mealTime="Breakfast"
                        timeSlots={methods.getValues("morning")}
                    />
                </Col>
                <Col span={24}>
                    <FromTimeSlotSelector
                        name="lunch"
                        mealTime="Lunch"
                        timeSlots={methods.getValues("lunch")}
                    />
                </Col>
                <Col span={24}>
                    <FromTimeSlotSelector
                        name="dinner"
                        mealTime="Dinner"
                        timeSlots={methods.getValues("dinner")}
                    />
                </Col>
            </Row>
            <div>
                <Divider
                    variant="dotted"
                    style={{
                        borderColor: "#BFBFBF",
                        marginTop: "40px",
                        marginBottom: "30px",
                    }}
                ></Divider>
            </div>

            <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
                {/* name */}
                <Col span={24}>
                    <div style={{ margin: "10px 0" }}>
                        <FormTextArea
                            name="description"
                            label="About the restaurant or the history of the restaurant"
                            placeholder="Enter a description about the restaurant"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="opening_and_closing_time_remark"
                            label="Opening & closing time remark"
                            size="large"
                            validation={{
                                required: "Opening & closing time remark is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="service_type"
                            label="Restaurant services"
                            size="large"
                            validation={{
                                required: "Restaurant services is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="public_transport"
                            label="Public transport"
                            size="large"
                            validation={{
                                required: "Public transport is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="parking_note"
                            label="parking Notes"
                            size="large"
                            validation={{
                                required: "parking Notes is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="services-section">
                        <p>Do you want to enable services:</p>
                        <div className="checkbox-group">
                            <FormCheckbox
                                name="enableFoodOrder"
                                label="Food order service"
                            />
                            <FormCheckbox
                                name="enableHallBooking"
                                label="Hall booking system"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProvideService;
