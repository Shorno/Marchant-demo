import { useState } from "react";
import { Button, Card, Input, Modal, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./specialmenu.css";

const SpecialMenu: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [editorHtml, setEditorHtml] = useState("");
    // const [theme, setTheme] = useState<"snow" | "bubble">("snow"); // Restrict theme to 'snow' or 'bubble'

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

    const handleEditorChange = (html: string) => {
        setEditorHtml(html);
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
                        <Card style={{ width: "100%", marginBottom: "10px" }}>
                            <label className="label">Menu Name</label>
                            <Input
                                className="normal-input"
                                placeholder="Basic usage"
                            />
                            <label className="label">Menu Description</label>
                            <div>
                                {/* ReactQuill editor inside the blank div */}
                                <ReactQuill
                                    // theme={theme}
                                    onChange={handleEditorChange}
                                    value={editorHtml}
                                    modules={Editor.modules}
                                    formats={Editor.formats}
                                    bounds={".app"}
                                    placeholder="Enter menu description"
                                    className="normal-input"
                                />
                            </div>
                        </Card>

                        <p className="title">Category</p>
                        <Card>
                            <div>
                                <label className="label">Menu Name</label>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                            </div>
                        </Card>
                    </div>

                    {/* Theme selector */}
                    {/* <div>
                        <label htmlFor="theme">Select Theme: </label>
                        <select
                            id="theme"
                            onChange={handleThemeChange}
                            value={theme}
                        >
                            <option value="snow">Snow</option>
                            <option value="bubble">Bubble</option>
                        </select>
                    </div> */}

                    {/* Right side content */}
                </div>
            </Modal>
        </div>
    );
};

// Editor component modules and formats
const Editor = {
    modules: {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
        ],
        clipboard: {
            matchVisual: false,
        },
    },
    formats: [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
    ],
};

export default SpecialMenu;
