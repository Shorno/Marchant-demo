import React from "react";
import {Button, Form, Input, Checkbox, Modal, Divider} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import GetHelp from "../../pages/GetHelp/GetHelp";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import "../../pages/ProvideService/provideservice.css"
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {updateFormData} from "../../store/signupFromSlice.ts";
const {TextArea} = Input;

interface ProvideServiceProps {
    onNext: (values: ServiceFormFields) => void;
    onPrevious: () => void;
}

interface ServiceFormFields {
    openingRemark: string;
    restaurantServices: string;
    publicTransport?: string;
    parkingNotes?: string;
    enableFoodOrder: boolean;
    enableHallBooking: boolean;
    aboutRestaurant?: string;
    breakfastTimes: string[];
    lunchTimes: string[];
    dinnerTimes: string[];
}

interface TimeSlot {
    time: string;
    selected: boolean;
}

export default function ProvideService({onNext, onPrevious}: ProvideServiceProps) {
    const [form] = Form.useForm<ServiceFormFields>();
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const signUpFromData = useAppSelector(state => state.signupFrom)
    const dispatch = useAppDispatch();


    const initialBreakfastTimes: TimeSlot[] = [
        {time: "05:00", selected: false},
        {time: "06:00", selected: false},
        {time: "07:00", selected: false},
        {time: "08:00", selected: false},
        {time: "09:00", selected: false},
        {time: "10:00", selected: false},
    ];

    const initialLunchTimes: TimeSlot[] = [
        {time: "11:00", selected: false},
        {time: "12:00", selected: true},
        {time: "13:00", selected: true},
        {time: "14:00", selected: false},
    ];

    const initialDinnerTimes: TimeSlot[] = [
        {time: "17:00", selected: false},
        {time: "18:00", selected: true},
        {time: "19:00", selected: true},
        {time: "20:00", selected: false},
        {time: "21:00", selected: true},
    ];

    const [breakfastTimes, setBreakfastTimes] = React.useState<TimeSlot[]>(initialBreakfastTimes);
    const [lunchTimes, setLunchTimes] = React.useState<TimeSlot[]>(initialLunchTimes);
    const [dinnerTimes, setDinnerTimes] = React.useState<TimeSlot[]>(initialDinnerTimes);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const toggleTimeSlot = (
        index: number,
        timeSlots: TimeSlot[],
        setTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>
    ) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index].selected = !newTimeSlots[index].selected;
        setTimeSlots(newTimeSlots);
    };

    const handleSubmit = (values: ServiceFormFields) => {
        const selectedBreakfastTimes = breakfastTimes
            .filter(slot => slot.selected)
            .map(slot => slot.time);
        const selectedLunchTimes = lunchTimes
            .filter(slot => slot.selected)
            .map(slot => slot.time);
        const selectedDinnerTimes = dinnerTimes
            .filter(slot => slot.selected)
            .map(slot => slot.time);

        const updatedValues = {
            ...values,
            breakfastTimes: selectedBreakfastTimes,
            lunchTimes: selectedLunchTimes,
            dinnerTimes: selectedDinnerTimes
        };
        dispatch(updateFormData(updatedValues));
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        const values = form.getFieldsValue() as ServiceFormFields;
        setIsModalVisible(false);
        onNext(values);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const renderTimeSlots = (
        times: TimeSlot[],
        setTimes: React.Dispatch<React.SetStateAction<TimeSlot[]>>,
        label: string
    ) => (
        <div className="meal-section">
            <h2 className="meal-title">
                {label}<span className="required">*</span>
            </h2>
            <div className="time-slots">
                {times.map((slot, index) => (
                    <button
                        key={index}
                        className={`time-slot ${slot.selected ? "selected" : ""}`}
                        onClick={() => toggleTimeSlot(index, times, setTimes)}
                    >
                        {slot.time}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            <GetHelp/>
            <p className="restaurant-title">Manage Restaurant Time Slot</p>
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
                    initialValues={signUpFromData}
                >
                    <div className="meal-time-container">
                        {renderTimeSlots(breakfastTimes, setBreakfastTimes, "Breakfast Time")}
                        {renderTimeSlots(lunchTimes, setLunchTimes, "Lunch Time")}
                        {renderTimeSlots(dinnerTimes, setDinnerTimes, "Dinner Time")}
                    </div>

                    <Divider/>

                    <Form.Item
                        name="aboutRestaurant"
                        label="About the restaurant or the history of the restaurant"
                    >
                        <TextArea
                            rows={4}
                            placeholder="Tell us about your restaurant's story"
                            className="text-area"
                        />
                    </Form.Item>

                    <div className="form-row">
                        <Form.Item
                            name="openingRemark"
                            label="Opening & closing time remark"
                            rules={[{required: true, message: "Opening remark is required"}]}
                        >
                            <Input placeholder="Enter opening and closing time details"/>
                        </Form.Item>

                        <Form.Item
                            name="restaurantServices"
                            label="Restaurant services"
                            rules={[{required: true, message: "Restaurant services are required"}]}
                        >
                            <Input placeholder="Describe your restaurant services"/>
                        </Form.Item>
                    </div>

                    <div className="form-row">
                        <Form.Item
                            name="publicTransport"
                            label="Public transport"
                        >
                            <Input placeholder="Public transport details"/>
                        </Form.Item>

                        <Form.Item
                            name="parkingNotes"
                            label="Parking Notes"
                        >
                            <Input placeholder="Parking information"/>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="services"
                        label="Do you want to enable services:"
                    >
                        <Checkbox.Group>
                            <Checkbox value="foodOrder" name="enableFoodOrder">
                                Food order service
                            </Checkbox>
                            <Checkbox value="hallBooking" name="enableHallBooking">
                                Hall booking system
                            </Checkbox>
                        </Checkbox.Group>
                    </Form.Item>

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

            <Modal
                title="Confirm Information"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <p>Are you sure all information is correct?</p>
            </Modal>
        </div>
    );
}