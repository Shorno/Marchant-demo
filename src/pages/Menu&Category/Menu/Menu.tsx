/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input, Modal, Select,message } from "antd";
import { useForm, Controller } from "react-hook-form";
import "./menu.css";
import { useMenuQuery, usePostMenuMutation } from "../../../redux/api/Menu/menu";
import MenuList from "./View/MenuList";

const { TextArea } = Input;

type FormValues = {
    title: string;
    notes: string;
    slot: string;
};

export default function Menu() {
    const [menu, { isLoading }] = usePostMenuMutation();
    const { data, isLoading:loading, error ,refetch} = useMenuQuery({});
    const [open, setOpen] = useState(false);

    const {handleSubmit,control,formState: { errors },reset,} = useForm<FormValues>({defaultValues: {title: "",notes: "",slot: "",},});

    const onSubmit = async (data: FormValues) => {
        try {
            const result = await menu(data);
            message.success(result?.data?.message || "Menu added successfully");
            setOpen(false);
            refetch()
            reset();
        } catch (error:any) {
            message.error("Error submitting form:", error);
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
        <div className="menu">
            <div className="add-menu">
                <button className="modal-button" onClick={showModal}>
                    Add new Category
                </button>
            </div>
            {/* menu list */}
            <div className="list">
                <MenuList data={data} isLoading={loading} error={error} refetch={refetch}   />
            </div>


            <div>
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
                            {isLoading ? "Submitting..." : "Add Categoty"}
                        </button>
                    </form>
                </Modal>
            </div>

        </div>
    );
}
