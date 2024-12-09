import { useState } from "react";
import { Input, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import "./menu.css";
import { usePostAMenuMutation } from "../../../redux/api/Menu/menu";

const { TextArea } = Input;

type FormValues = {
    title: string;
    notes: string;
    slot: string;
};

export default function Menu() {
    const [postAMenu, { isLoading }] = usePostAMenuMutation();
    const [open, setOpen] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            title: "",
            notes: "",
            slot: "",
        },
    });

    // Function to handle form submission
    // const onSubmit = async (data: FormValues) => {
    //     try {
    //         console.log("Form Submitted:", data);
    //         const result = await postAMenu(data); // API call
    //         console.log(result);

    //         // Close modal and reset form after successful submission
    //         setOpen(false);
    //         reset();
    //     } catch (error) {
    //         console.error("Error submitting form:", error);
    //     }
    // };

    const onSubmit = async (formData: FormValues) => {
        const payload = {
            title: formData.title,
            notes: formData.notes,
            slot: formData.slot,
        };
    
        console.log("Payload being sent:", payload);
    
        try {
            const result = await postAMenu(payload).unwrap();
            console.log("API Success Response:", result);
    
            setOpen(false); // Close modal on success
        } catch (error) {
            console.error("API Error:", error);
        }
    };
    // Function to show the modal
    const showModal = () => {
        setOpen(true);
    };

    // Function to handle modal cancellation
    const handleCancel = () => {
        setOpen(false);
        reset(); // Reset form when the modal is closed
    };

    return (
        <div>
            <button className="modal-button" onClick={showModal}>
                Add new Category
            </button>
            <Modal
                open={open}
                title="Add Menu Category"
                onCancel={handleCancel}
                footer={null} // Remove default footer (OK and Cancel buttons)
                className="custom-modal"
                closeIcon={<span>×</span>}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Menu Name Field */}
                    <div>
                        <label className="label">Menu Name:</label>
                        <Controller
                            name="title"
                            control={control}
                            rules={{
                                required: "Menu Name is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Menu Name must be at least 3 characters",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    className={`menu-input ${
                                        errors.title ? "input-error" : ""
                                    }`}
                                    placeholder="e.g Drinks"
                                />
                            )}
                        />
                        {errors.title && (
                            <span className="error-message">
                                {errors.title.message}
                            </span>
                        )}
                    </div>

                    {/* Menu Notes Field */}
                    <div>
                        <label className="label">Menu Notes:</label>
                        <Controller
                            name="notes"
                            control={control}
                            rules={{
                                required: "Menu Notes are required",
                                maxLength: {
                                    value: 100,
                                    message:
                                        "Menu Notes cannot exceed 100 characters",
                                },
                            }}
                            render={({ field }) => (
                                <TextArea
                                    {...field}
                                    className={`menu-input ${
                                        errors.notes ? "input-error" : ""
                                    }`}
                                    placeholder="Menu Notes"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                            )}
                        />
                        {errors.notes && (
                            <span className="error-message">
                                {errors.notes.message}
                            </span>
                        )}
                    </div>

                    {/* Slot Field */}
                    <div>
                        <label className="label">Slot:</label>
                        <Controller
                            name="slot"
                            control={control}
                            rules={{
                                required: "Please select a slot",
                            }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Select a Slot"
                                    style={{ width: "100%" }}
                                    options={[
                                        { value: "all", label: "All" },
                                        { value: "morning", label: "Morning" },
                                        { value: "lunch", label: "Lunch" },
                                        { value: "dinner", label: "Dinner" },
                                    ]}
                                />
                            )}
                        />
                        {errors.slot && (
                            <span className="error-message">
                                {errors.slot.message}
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="add-menu-button">
                        {isLoading ? "Submitting..." : "Add Product"}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
