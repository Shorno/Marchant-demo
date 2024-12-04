import  { useState } from "react";
import { Input, Modal, Select } from "antd";
import "./menu.css";

const { TextArea } = Input;

export default function Menu() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        // setLoading(true);
        setTimeout(() => {
            // setLoading(false);
            setOpen(false);
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className="modal-button " onClick={showModal}>
                Add new menu
            </button>
            <Modal
                open={open}
                title="Add new menu"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="custom-modal"
                closeIcon={<span className="">×</span>}
                
            >
                <form>
                    <div>
                        <label className="label">Menu Name:</label>
                        <Input
                            className="menu-input"
                            placeholder="e.g Drinks"
                        />
                    </div>
                    <div>
                        <label className="label">Menu Notes:</label>
                        <TextArea
                            value={value}
                            className="menu-input"
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="menu Notes"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </div>
                    <div>
                        <label className="label">Slot:</label>
                        <Select
                            placeholder="Outlined"
                            style={{ flex: 1 }}
                            options={[
                                { value: "all", label: "All" },
                                { value: "morning", label: "Morning" },
                                { value: "lunch", label: "Lunch" },
                                { value: "Dinner", label: "Dinner" },
                            ]}
                        />
                    </div>
                </form>

                <button className="add-menu-button">Add Product</button>
            </Modal>
        </div>
    );
}
