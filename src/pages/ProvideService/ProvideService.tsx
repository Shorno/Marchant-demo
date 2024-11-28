import { useState } from "react";
import GetHelp from "../GetHelp/GetHelp";
import "./provideservice.css";
import { Button, Divider, Input, Modal } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
// import BookingButton from "../../components/RestaurantBookingButton/BookingButton";

const ProvideService = () => {
    const { TextArea } = Input;

    interface TimeSlot {
        time: string;
        selected: boolean;
    }

    const [breakfastTimes, setBreakfastTimes] = useState<TimeSlot[]>([
        { time: "05:00", selected: false },
        { time: "05:00", selected: false },
        { time: "05:00", selected: false },
        { time: "05:00", selected: false },
        { time: "05:00", selected: false },
        { time: "05:00", selected: false },
        { time: "05:00", selected: false },
        { time: "05:00", selected: false },
        { time: "05:00", selected: false },
    ]);

    const [lunchTimes, setLunchTimes] = useState<TimeSlot[]>([
        { time: "05:00", selected: false },
        { time: "05:00", selected: true },
        { time: "05:00", selected: true },
        { time: "05:00", selected: false },
        { time: "05:00", selected: true },
        { time: "05:00", selected: false },
        { time: "05:00", selected: false },
        { time: "05:00", selected: true },
        { time: "05:00", selected: true },
        { time: "05:00", selected: true },
    ]);

    const [dinnerTimes, setDinnerTimes] = useState<TimeSlot[]>([
        { time: "05:00", selected: false },
        { time: "05:00", selected: true },
        { time: "05:00", selected: true },
        { time: "05:00", selected: false },
        { time: "05:00", selected: true },
        { time: "05:00", selected: false },
        { time: "05:00", selected: false },
        { time: "05:00", selected: true },
        { time: "05:00", selected: true },
        { time: "05:00", selected: false },
        { time: "05:00", selected: true },
    ]);

    const toggleTimeSlot = (
        index: number,
        timeSlots: TimeSlot[],
        setTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>
    ) => {
        const newTimeSlots = [...timeSlots];
        newTimeSlots[index].selected = !newTimeSlots[index].selected;
        setTimeSlots(newTimeSlots);
    };

    const [formData, setFormData] = useState({
        openingRemark: "",
        restaurantServices: "",
        publicTransport: "",
        parkingNotes: "",
        enableFoodOrder: false,
        enableHallBooking: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    /////////////Modal//////////

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    return (
        <div>
            <GetHelp></GetHelp>
            <p className="restaurant-title">Manage Restaurant Time Slot</p>
            <p className="restaurant-paragraph">
                All info of your restaurant shown below.
            </p>

            <div className="meal-time-container">
                <div className="meal-section">
                    <h2 className="meal-title">
                        Breakfast Time<span className="required">*</span>
                    </h2>
                    <div className="time-slots">
                        {breakfastTimes.map((slot, index) => (
                            <button
                                key={index}
                                className={`time-slot ${
                                    slot.selected ? "selected" : ""
                                }`}
                                onClick={() =>
                                    toggleTimeSlot(
                                        index,
                                        breakfastTimes,
                                        setBreakfastTimes
                                    )
                                }
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="meal-section">
                    <h2 className="meal-title">
                        Lunch Time<span className="required">*</span>
                    </h2>
                    <div className="time-slots">
                        {lunchTimes.map((slot, index) => (
                            <button
                                key={index}
                                className={`time-slot ${
                                    slot.selected ? "selected" : ""
                                }`}
                                onClick={() =>
                                    toggleTimeSlot(
                                        index,
                                        lunchTimes,
                                        setLunchTimes
                                    )
                                }
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="meal-section">
                    <h2 className="meal-title">
                        Dinner Time<span className="required">*</span>
                    </h2>
                    <div className="time-slots">
                        {dinnerTimes.map((slot, index) => (
                            <button
                                key={index}
                                className={`time-slot ${
                                    slot.selected ? "selected" : ""
                                }`}
                                onClick={() =>
                                    toggleTimeSlot(
                                        index,
                                        dinnerTimes,
                                        setDinnerTimes
                                    )
                                }
                            >
                                {slot.time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

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

            <div>
                <label htmlFor="" className="service-label">
                    About the restaurant or the history of the restaurant
                </label>

                <TextArea rows={4} placeholder="" className="text-area" />
            </div>

            <form>
                <div className="form-row">
                    <div className="form-group">
                        <label>
                            Opening & closing time remark
                            <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="openingRemark"
                            value={formData.openingRemark}
                            onChange={handleInputChange}
                            placeholder=""
                            className="input-details"
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Restaurant services
                            <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            name="restaurantServices"
                            value={formData.restaurantServices}
                            onChange={handleInputChange}
                            placeholder=""
                            className="input-details"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Public transport</label>
                        <input
                            type="text"
                            name="publicTransport"
                            value={formData.publicTransport}
                            onChange={handleInputChange}
                            placeholder=""
                            className="input-details"
                        />
                    </div>

                    <div className="form-group">
                        <label>Parking Notes</label>
                        <input
                            type="text"
                            name="parkingNotes"
                            value={formData.parkingNotes}
                            onChange={handleInputChange}
                            placeholder=""
                            className="input-details"
                        />
                    </div>
                </div>

                <div className="services-section">
                    <p>Do you want to enable services:</p>
                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="enableFoodOrder"
                                checked={formData.enableFoodOrder}
                                onChange={handleInputChange}
                            />
                            Food order service
                        </label>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="enableHallBooking"
                                checked={formData.enableHallBooking}
                                onChange={handleInputChange}
                            />
                            Hall booking system
                        </label>
                    </div>
                </div>

                <div className="form-footer">
                    <a href="#" className="previous">
                        Previous Step
                    </a>

                    <Button className="button-details" onClick={showModal}>
                        Next <ArrowRightOutlined />
                    </Button>
                    <Modal
                        title="Are You sure!!"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <p>All info is ok?</p>
                    </Modal>
                </div>
                
            </form>
        </div>
    );
};

export default ProvideService;
