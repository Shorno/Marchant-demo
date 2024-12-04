import { useState } from "react";
import { Button, Card, Input, Modal, Tooltip, DatePicker, Select } from "antd";
import type { DatePickerProps } from "antd";
import {
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    AlignLeftOutlined,
    AlignCenterOutlined,
    AlignRightOutlined,
    OrderedListOutlined,
    UnorderedListOutlined,
    //   FontSizeOutlined,
    LinkOutlined,
    PictureOutlined,
    UndoOutlined,
    RedoOutlined,
} from "@ant-design/icons";

import "./discountmenu.css";

interface NumericInputProps {
    style?: React.CSSProperties;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const NumericInput = (props: NumericInputProps) => {
    const { value, onChange, className } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
            onChange(inputValue);
        }
    };

    const handleBlur = () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === "." || value === "-") {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, "$1"));
    };

    const title = value ? (
        <span className="numeric-input-title">
            {value !== "-" ? formatNumber(Number(value)) : "-"}
        </span>
    ) : (
        "Input a number"
    );

    return (
        <Tooltip
            trigger={["focus"]}
            title={title}
            placement="topLeft"
            overlayClassName="numeric-input"
        >
            <Input
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Input a price"
                maxLength={16}
                className={className}
            />
        </Tooltip>
    );
};

const DiscountMenu: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState<string>(""); // State for price input
    const [fontSize, setFontSize] = useState<string>("16px");

    const fontSizes = [
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "24px",
        "28px",
        "32px",
    ];

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

    const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
        if (typeof dateString === "string") {
            console.log("Selected Date:", dateString);
        } else {
            console.error("Unexpected value for dateString:", dateString);
        }
    };

    // Handle text formatting
    const handleCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
    };

    // Set the font size for the selected text
    const handleFontSizeChange = (size: string) => {
        setFontSize(size);
        // Apply font size to the selected text
        document.execCommand("fontSize", false, "7"); // "7" is the largest available size
        const element = document.querySelector("font[size='7']") as HTMLElement;
        if (element) {
            element.style.fontSize = size;
        }
    };

    return (
        <div>
            <Button className="modal-button" onClick={showModal}>
                Discount menu
            </Button>
            <Modal
                open={open}
                title="Discount menu"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="custom-modal"
                closeIcon={<span>×</span>}
            >
                <p className="title1">Description</p>
                <Card style={{ width: "100%" }}>
                    <div className="special-menu-input">
                        <div>
                            <label className="label">Menu Name</label>
                            <Input
                                className="menu-input"
                                placeholder="Enter menu name"
                            />
                        </div>
                        <div>
                            <label className="label">Price</label>
                            <NumericInput
                                className="menu-input"
                                value={price}
                                onChange={setPrice}
                            />
                        </div>
                        <div>
                            <label className="label">Select Days</label>
                            <DatePicker
                                onChange={onDateChange}
                                className="menu-input"
                                placeholder="Select a date"
                            />
                        </div>
                    </div>
                    <div className="editor-container">
                        <div className="toolbar">
                            {/* Undo and Redo */}
                            <div className="toolbar-group">
                                <Tooltip title="Undo">
                                    <Button
                                        type="text"
                                        icon={<UndoOutlined />}
                                        onClick={() => handleCommand("undo")}
                                    />
                                </Tooltip>
                                <Tooltip title="Redo">
                                    <Button
                                        type="text"
                                        icon={<RedoOutlined />}
                                        onClick={() => handleCommand("redo")}
                                    />
                                </Tooltip>
                            </div>

                            {/* Text formatting: Normal, Headings, Font Size */}
                            <div className="toolbar-group">
                                <Select
                                    defaultValue="Normal"
                                    className="format-select"
                                    dropdownMatchSelectWidth={false}
                                >
                                    <Select.Option
                                        value="normal"
                                        onClick={() =>
                                            handleCommand("formatBlock", "p")
                                        }
                                    >
                                        Normal
                                    </Select.Option>
                                    <Select.Option
                                        value="h1"
                                        onClick={() =>
                                            handleCommand("formatBlock", "h1")
                                        }
                                    >
                                        Heading 1
                                    </Select.Option>
                                    <Select.Option
                                        value="h2"
                                        onClick={() =>
                                            handleCommand("formatBlock", "h2")
                                        }
                                    >
                                        Heading 2
                                    </Select.Option>
                                    <Select.Option
                                        value="h3"
                                        onClick={() =>
                                            handleCommand("formatBlock", "h3")
                                        }
                                    >
                                        Heading 3
                                    </Select.Option>
                                </Select>

                                <Select
                                    value={fontSize}
                                    onChange={handleFontSizeChange}
                                    className="font-size-select"
                                    dropdownMatchSelectWidth={false}
                                >
                                    {fontSizes.map((size) => (
                                        <Select.Option key={size} value={size}>
                                            {size}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>

                            {/* Bold, Italic, Underline */}
                            <div className="toolbar-group">
                                <Tooltip title="Bold">
                                    <Button
                                        type="text"
                                        icon={<BoldOutlined />}
                                        onClick={() => handleCommand("bold")}
                                    />
                                </Tooltip>
                                <Tooltip title="Italic">
                                    <Button
                                        type="text"
                                        icon={<ItalicOutlined />}
                                        onClick={() => handleCommand("italic")}
                                    />
                                </Tooltip>
                                <Tooltip title="Underline">
                                    <Button
                                        type="text"
                                        icon={<UnderlineOutlined />}
                                        onClick={() =>
                                            handleCommand("underline")
                                        }
                                    />
                                </Tooltip>
                            </div>

                            {/* Alignments */}
                            <div className="toolbar-group">
                                <Tooltip title="Align Left">
                                    <Button
                                        type="text"
                                        icon={<AlignLeftOutlined />}
                                        onClick={() =>
                                            handleCommand("justifyLeft")
                                        }
                                    />
                                </Tooltip>
                                <Tooltip title="Align Center">
                                    <Button
                                        type="text"
                                        icon={<AlignCenterOutlined />}
                                        onClick={() =>
                                            handleCommand("justifyCenter")
                                        }
                                    />
                                </Tooltip>
                                <Tooltip title="Align Right">
                                    <Button
                                        type="text"
                                        icon={<AlignRightOutlined />}
                                        onClick={() =>
                                            handleCommand("justifyRight")
                                        }
                                    />
                                </Tooltip>
                            </div>

                            {/* List formatting */}
                            <div className="toolbar-group">
                                <Tooltip title="Ordered List">
                                    <Button
                                        type="text"
                                        icon={<OrderedListOutlined />}
                                        onClick={() =>
                                            handleCommand("insertOrderedList")
                                        }
                                    />
                                </Tooltip>
                                <Tooltip title="Unordered List">
                                    <Button
                                        type="text"
                                        icon={<UnorderedListOutlined />}
                                        onClick={() =>
                                            handleCommand("insertUnorderedList")
                                        }
                                    />
                                </Tooltip>
                            </div>

                            {/* Insert Link and Image */}
                            <div className="toolbar-group">
                                <Tooltip title="Insert Link">
                                    <Button
                                        type="text"
                                        icon={<LinkOutlined />}
                                        onClick={() => {
                                            const url = prompt("Enter URL", "");
                                            if (url) {
                                                handleCommand(
                                                    "createLink",
                                                    url
                                                );
                                            }
                                        }}
                                    />
                                </Tooltip>

                                <Tooltip title="Insert Image">
                                    <Button
                                        type="text"
                                        icon={<PictureOutlined />}
                                        onClick={() => {
                                            const imageUrl = prompt(
                                                "Enter Image URL",
                                                ""
                                            );
                                            if (imageUrl) {
                                                handleCommand(
                                                    "insertImage",
                                                    imageUrl
                                                );
                                            }
                                        }}
                                    />
                                </Tooltip>
                            </div>
                        </div>

                        {/* Editable content area */}
                        <div
                            className="editor-content"
                            contentEditable="true"
                            style={{
                                minHeight: "150px",
                                border: "1px solid #d9d9d9",
                                padding: "10px",
                                borderRadius: "4px",
                                fontSize: fontSize,
                            }}
                        />
                    </div>
                </Card>
                <Button className="add-menu-button">Add Product</Button>
            </Modal>
        </div>
    );
};

export default DiscountMenu;
