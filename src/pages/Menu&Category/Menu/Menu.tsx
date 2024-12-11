import { useState } from "react";
import { Input, Modal, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import "./menu.css";
import { usePostMenuMutation } from "../../../redux/api/Menu/menu";

const { TextArea } = Input;

type FormValues = {
    title: string;
    notes: string;
    slot: string;
};

export default function Menu() {
    const [menu, { isLoading }] = usePostMenuMutation();
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

    const onSubmit = async (data: FormValues) => {
        try {
            console.log("Form Submitted:", data);
            const result = await menu(data);
            console.log(result);
            setOpen(false);
            reset();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        reset();
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
                footer={null}
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
                                    className={`menu-input ${errors.title ? "input-error" : ""
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
                                    className={`menu-input ${errors.notes ? "input-error" : ""
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
