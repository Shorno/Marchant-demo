import React, { useState } from "react";
import { Button, Card, Input, Modal } from "antd";
import "./menu.css";

export default function Menu() {
    const [open, setOpen] = useState(false);

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
            <Button className="add-menu-button " onClick={showModal}>
                Add new menu
            </Button>
            <Modal
                open={open}
                title="Add new menu"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="custom-modal"
                closeIcon={<span className="">×</span>}
            >
                <h4>Description</h4>
                <Card style={{ width: "100%" }}>
                    <div>
                        <label className="label">Menu Name</label>
                        <Input placeholder="" />
                    </div>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
                <button className="add-menu-button">Add Product</button>
            </Modal>
        </div>
    );
}
