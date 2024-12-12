import React, { useState } from "react";
import "./discountmenu.css";
import { Input, Modal, Select, DatePicker, Button } from "antd";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import ReactQuill from "react-quill";
import type { DatePickerProps, SelectProps } from "antd";
import { usePostDiscountMenuMutation } from "../../../redux/api/Menu/DiscountMenu";

// Define the types for the form data
interface DiscountMenuForm {
    discountTitle: string;
    discount: string;
    slot: string;
    startDate: string;
    endDate: string;
    time: string[];
    menuDescription: string;
}

const DiscountMenu: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [timeOptions, setTimeOptions] = useState<SelectProps["options"]>([]); // Store time options
    const [postDiscountMenu] = usePostDiscountMenuMutation(); // API mutation hook

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        setError,
    } = useForm<DiscountMenuForm>(); // Type the form with DiscountMenuForm

    // Handlers for Modal
    const showModal = () => setOpen(true);
    const handleOk = () => setTimeout(() => setOpen(false), 1000);
    const handleCancel = () => setOpen(false);

    // Handler for Slot Select input
    const onChangeSlot = (value: string) => {
        setValue("slot", value); // Ensure slot value is set in the form
        setTimeOptions(getTimeOptionsForSlot(value)); // Update time options based on selected slot
    };

    // Get time options based on the selected slot
    const getTimeOptionsForSlot = (slot: string): SelectProps["options"] => {
        const timeMap = {
            Morning: [
                { value: "07:00", label: "07:00 AM" },
                { value: "08:00", label: "08:00 AM" },
                { value: "09:00", label: "09:00 AM" },
                { value: "10:00", label: "10:00 AM" },
            ],
            Lunch: [
                { value: "12:00", label: "12:00 PM" },
                { value: "13:00", label: "01:00 PM" },
                { value: "14:00", label: "02:00 PM" },
                { value: "15:00", label: "03:00 PM" },
            ],
            Dinner: [
                { value: "18:00", label: "06:00 PM" },
                { value: "19:00", label: "07:00 PM" },
                { value: "20:00", label: "08:00 PM" },
                { value: "21:00", label: "09:00 PM" },
            ],
        };
        return timeMap[slot] || [];
    };

    // if (!data.slot) {
    //     alert("Please select a slot.");
    //     return;
    // }

    // Custom validation for date range
    const validateDates = (data: DiscountMenuForm) => {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);

        // Check if the end date is greater than or equal to the start date
        if (endDate < startDate) {
            setError("endDate", {
                type: "manual",
                message: "End date must be greater than or equal to start date",
            });
            return false; // Prevent form submission
        }
        return true;
    };

    // Handle form submission
    const onSubmit: SubmitHandler<DiscountMenuForm> = async (data) => {
        if (!validateDates(data)) return;
        const discountData = {
            description: data.menuDescription,
            title: data.discountTitle,
            start_date: new Date(data.startDate).toISOString().split("T")[0], // Format start date
            end_date: new Date(data.endDate).toISOString().split("T")[0], // Format end date
            slot: data.slot.toLowerCase(), // Convert slot to lowercase for the API
            time: data.time,
            discount: data.discount, // Use the numeric discount value
            show_calender: true, // Assuming it's always true
        };

        try {
            await postDiscountMenu(discountData).unwrap();
            console.log("Discount menu submitted successfully");
            setOpen(false);
        } catch (error) {
            console.error("Error submitting discount menu:", error);
        }
    };

    // Calculate discounted price (if applicable)
    const watchDiscount = watch("discount");
    const calculateDiscountedPrice = (price: number) => {
        return price - (price * watchDiscount) / 100;
    };
    return (
        <div>
            <button className="modal-button" onClick={showModal}>
                Discount menu
            </button>

            <Modal
                open={open}
                title="Discount Menu"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="custom-modal"
                closeIcon={<span>×</span>}
                width={900}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Discount Title, Discount, Slot, Start Date, End Date, Time, Description */}
                    <div className="top-section">
                        {/* Discount Title */}
                        <div className="field">
                            <label className="title">Discount Title</label>
                            <Controller
                                name="discountTitle"
                                control={control}
                                rules={{
                                    required: "Discount Title is required",
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className="menu-input"
                                        placeholder="e.g. Drink"
                                    />
                                )}
                            />
                            {errors.discountTitle && (
                                <span className="error">
                                    {errors.discountTitle.message}
                                </span>
                            )}
                        </div>

                        {/* Discount */}
                        <div className="field">
                            <label className="title">Discount (%)</label>
                            <Controller
                                name="discount"
                                control={control}
                                rules={{
                                    required: "Discount is required",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Discount must be a number",
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className="menu-input"
                                        placeholder="Enter Discount (%)"
                                        type="number"
                                    />
                                )}
                            />
                            {errors.discount && (
                                <span className="error">
                                    {errors.discount.message}
                                </span>
                            )}
                        </div>

                        {/* Slot */}

                        <div className="field">
                            <label className="title">Slot</label>
                            <Controller
                                name="slot"
                                control={control}
                                rules={{ required: "Slot is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="menu-input"
                                        placeholder="Pick a slot"
                                        optionFilterProp="label"
                                        onChange={onChangeSlot} // On slot change, update the form value
                                        options={[
                                            {
                                                value: "Morning",
                                                label: "Morning",
                                            },
                                            { value: "Lunch", label: "Lunch" },
                                            {
                                                value: "Dinner",
                                                label: "Dinner",
                                            },
                                        ]}
                                    />
                                )}
                            />
                            {errors.slot && (
                                <span className="error">
                                    {errors.slot.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="bottom-section">
                        {/* Start Date */}
                        <div className="field">
                            <label className="title">Start Date</label>
                            <Controller
                                name="startDate"
                                control={control}
                                rules={{ required: "Start Date is required" }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        className="menu-input"
                                    />
                                )}
                            />
                            {errors.startDate && (
                                <span className="error">
                                    {errors.startDate.message}
                                </span>
                            )}
                        </div>

                        {/* End Date */}
                        <div className="field">
                            <label className="title">End Date</label>
                            <Controller
                                name="endDate"
                                control={control}
                                rules={{ required: "End Date is required" }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        className="menu-input"
                                    />
                                )}
                            />
                            {errors.endDate && (
                                <span className="error">
                                    {errors.endDate.message}
                                </span>
                            )}
                        </div>

                        {/* Time */}
                        <div className="field">
                            <label className="title">Time</label>
                            <Controller
                                name="time"
                                control={control}
                                rules={{ required: "Time is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className="menu-input"
                                        mode="tags"
                                        style={{ width: "100%" }}
                                        placeholder="Select Time"
                                        options={timeOptions}
                                    />
                                )}
                            />
                            {errors.time && (
                                <span className="error">
                                    {errors.time.message}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Menu Description */}
                    <div style={{padding:' 10px'}}>
                        <label className="title">Description</label>
                        <Controller
                            name="menuDescription"
                            control={control}
                            rules={{
                                required: "Menu Description is required",
                                validate: (value) =>
                                    value.trim() !== "" ||
                                    "Menu Description cannot be empty",
                            }}
                            render={({ field }) => (
                                <ReactQuill
                                    {...field}
                                    placeholder="Enter menu description"
                                    className="normal-input menu-input"
                                />
                            )}
                        />
                        {errors.menuDescription && (
                            <span className="error">
                                {errors.menuDescription.message}
                            </span>
                        )}
                    </div>

                    <Button className="btn-sunmit" htmlType="submit">
                        Submit
                    </Button>
                </form>
            </Modal>
        </div>
    );
};

export default DiscountMenu;
