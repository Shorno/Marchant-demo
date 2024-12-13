import { useState } from "react";
import { Card, Input, Modal, Select, Checkbox, Upload, Image } from "antd";
import type { CheckboxProps } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./buffetmenu.css";

const BuffetMenu: React.FC = () => {
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

    // text editor
    const handleEditorChange = (html: string) => {
        setEditorHtml(html);
    };

    /// checkbox

    const onChange: CheckboxProps["onChange"] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    // Image upload

    type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-2",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-3",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-4",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },

        {
            uid: "-5",
            name: "image.png",
            status: "error",
        },
    ]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    // varient
    const [variants, setVariants] = useState<string[]>([""]);

    const addVariant = () => {
        setVariants([...variants, ""]);
    };

    return (
        <div>
            <button className="modal-button" onClick={showModal}>
                Buffet menu
            </button>
            <Modal
                open={open}
                title="Buffet menu"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="custom-modal"
                closeIcon={<span>×</span>}
                width={900}
               
            >
                <div className="main-content">
                    {/* Left side content */}
                    <div>
                        {/* //Description  */}
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

                        {/* Category */}
                        <p className="title">Category</p>
                        <Card style={{ width: "100%", marginBottom: "10px" }}>
                            <div>
                                <label className="label">Menu Type</label>
                                <Select
                                    placeholder="Select menu type"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={[
                                        { value: "1", label: "Jack" },
                                        { value: "2", label: "Lucy" },
                                        { value: "3", label: "Tom" },
                                    ]}
                                    style={{ width: "100%" }}
                                    className="custom-select normal-input"
                                />
                            </div>
                            <div>
                                <label className="label">Menu Category</label>
                                <Select
                                    placeholder="Select menu category"
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={[
                                        { value: "1", label: "Jack" },
                                        { value: "2", label: "Lucy" },
                                        { value: "3", label: "Tom" },
                                    ]}
                                    style={{ width: "100%" }}
                                    className="custom-select normal-input"
                                />
                            </div>
                        </Card>

                        {/* Selling type */}
                        <p className="title">Selling Type</p>
                        <Card style={{ width: "100%", marginBottom: "10px" }}>
                            <div>
                                <Checkbox onChange={onChange}>
                                    Dine-in selling only
                                </Checkbox>
                            </div>
                            <div>
                                <Checkbox
                                    onChange={onChange}
                                    style={{
                                        marginTop: "5px",
                                        marginBottom: "5px",
                                    }}
                                >
                                    Online selling only
                                </Checkbox>
                            </div>
                            <div>
                                <Checkbox onChange={onChange}>
                                    Available for both dine-in and online
                                </Checkbox>
                            </div>
                        </Card>

                        {/* Additional Variant */}

                        <p className="title">Additional Variant</p>
                        <div className="menu-variants-container">
                            <label className="menu-variants-label">
                                Menu variants
                            </label>
                            <div className="menu-variants-input-container">
                                <input
                                    type="text"
                                    className="menu-variants-input"
                                    placeholder="Enter variant name"
                                    value={variants[variants.length - 1]}
                                    onChange={(e) => {
                                        const newVariants = [...variants];
                                        newVariants[newVariants.length - 1] =
                                            e.target.value;
                                        setVariants(newVariants);
                                    }}
                                />
                                <button
                                    onClick={addVariant}
                                    className="menu-variants-add-button"
                                    type="button"
                                >
                                    + Add Variants
                                </button>
                            </div>
                            {variants.slice(0, -1).map((variant, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="menu-variants-input"
                                    placeholder="Enter variant name"
                                    value={variant}
                                    onChange={(e) => {
                                        const newVariants = [...variants];
                                        newVariants[index] = e.target.value;
                                        setVariants(newVariants);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right side content */}
                    <div>
                        <p className="title">Menu Images</p>
                        <Card style={{ width: "100%", marginBottom: "10px" }}>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: "none" }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) =>
                                            setPreviewOpen(visible),
                                        afterOpenChange: (visible) =>
                                            !visible && setPreviewImage(""),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Card>

                        <p className="title">Pricing</p>
                        <Card
                            className="price-card"
                            style={{ width: "100%", marginBottom: "10px" }}
                        >
                            <div className="price-input-group">
                                <div className="price-input-wrapper">
                                    <label className="label">Price</label>
                                    <div className="price-input-container">
                                        <Input
                                            prefix="$"
                                            placeholder=""
                                            className="price-input"
                                            type="number"
                                            min={0}
                                            step={0.01}
                                        />
                                    </div>
                                </div>
                                <div className="price-input-wrapper">
                                    <label className="label">
                                        Compare at Price
                                    </label>
                                    <div className="price-input-container">
                                        <Input
                                            prefix="$"
                                            placeholder=""
                                            className="price-input"
                                            type="number"
                                            min={0}
                                            step={0.01}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="button-container">
                            <button className="discard-btn">Discard</button>
                            <div className="action-buttons">
                                <button className="schedule-btn">
                                    Schedule
                                </button>
                                <button className="add-product-btn">
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
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

export default BuffetMenu;
