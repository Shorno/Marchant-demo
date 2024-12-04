import { useState } from "react";
import { Button, Card, Input, Modal } from "antd";

import "./specialmenu.css";

const SpecialMenu: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button className="modal-button" onClick={showModal}>
                Special menu
            </Button>
            <Modal
                open={open}
                title="Special menu"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="custom-modal"
                closeIcon={<span>×</span>}
            >
                <div>
                    {/* Left side content */}
                    <div>
                        <p className="title">Description</p>
                        <Card style={{ width: "100%" }}>
                            <label className="label">Menu Name</label>
                            <Input
                                className="normal-input"
                                placeholder="Basic usage"
                            />

                            
                        </Card>
                    </div>

                    {/* Right side content */}
                </div>
            </Modal>
        </div>
    );
};

export default SpecialMenu;
