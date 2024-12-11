import React, { useState } from "react";
import "./discountmenu.css";
import { Input, Modal, Select } from "antd";

const DiscountMenu: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false); // Specify boolean for state

    // Handlers for Modal
    const showModal = () => setOpen(true);
    const handleOk = () => setTimeout(() => setOpen(false), 1000);
    const handleCancel = () => setOpen(false);

    // Handler for Select input
    const onChange = (value: string) => {
        console.log(`Selected: ${value}`);
    };

    return (
        <div>
            {/* Button to trigger modal */}
            <button className="modal-button" onClick={showModal}>
                Discount menu
            </button>

            {/* Ant Design Modal */}
            <Modal
                open={open}
                title="Discount Menu"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null} // No default footer
                className="custom-modal"
                closeIcon={<span>×</span>} // Custom close icon
                width={900} // Custom modal width
            >
                {/* Form inside Modal */}
                <form>
                    <div className="top-section">
                        {/* Discount Title Field */}
                        <div className="field">
                            <label className="title">Discount Title</label>
                            <Input
                                className="menu-input"
                                placeholder="e.g. Drink"
                            />
                        </div>

                        {/* Discount Percentage Field */}
                        <div className="field">
                            <label className="title">Discount</label>
                            <Input
                                className="menu-input"
                                placeholder="Type Discount (%)"
                            />
                        </div>

                        {/* Slot Selection Field */}
                        <div className="field">
                            <label className="title">Slot</label>
                            <Select
                                placeholder="Pick a slot"
                                optionFilterProp="label"
                                onChange={onChange}
                                options={[
                                    { value: "Morning", label: "Morning" },
                                    { value: "Lunch", label: "Lunch" },
                                    { value: "Dinner", label: "Dinner" },
                                ]}
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DiscountMenu;
