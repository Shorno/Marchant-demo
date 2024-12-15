/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input, Modal, Select, Upload, Image, Button, Form, message, } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useImageUploadMutation } from "../../../redux/api/ImageUpload/imageUpload";
import "./buffetmenu.css";
import { usePostBuffetMenuMutation } from "../../../redux/api/Menu/BuffetMenu";

const daysOfWeek = [
    { value: "mon", label: "Monday" },
    { value: "tue", label: "Tuesday" },
    { value: "wed", label: "Wednesday" },
    { value: "thu", label: "Thursday" },
    { value: "fri", label: "Friday" },
    { value: "sat", label: "Saturday" },
    { value: "sun", label: "Sunday" },
];

const BuffetMenu = () => {
    const [open, setOpen] = useState(false);
    const [buffetMenu] = usePostBuffetMenuMutation();
    const [imageUpload] = useImageUploadMutation();
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    const [form] = Form.useForm();

    const handleImageUpload = async (file: any) => {
        const formData = new FormData();
        formData.append("image", file);
        try {
            const result = await imageUpload(formData).unwrap();
            setUploadedImageUrl(result?.image_url);
            return result?.image_url;
        } catch (error: any) {
            message.error("Image upload failed. Please try again.", error);
            return null;
        }
    };

    const handleSubmit = async (values: any) => {
        const payload = {
            ...values,
            images: uploadedImageUrl ? [uploadedImageUrl] : [],
        };

        console.log(payload);
        try {
            const result = await buffetMenu(payload).unwrap();
            console.log(result)
            message.success("Buffet menu created successfully!");
            form.resetFields();
            setUploadedImageUrl("");
            setOpen(false);
        } catch (error) {
            console.error("API Error:", error);
            message.error("Failed to create the buffet menu. Please try again.");
        }
    };

    return (
        <div className="buffet-menu-container">
            <Button type="primary" onClick={() => setOpen(true)}>
                Buffet Menu
            </Button>

            <Modal
                open={open}
                title="Bufet Menu"
                onCancel={() => setOpen(false)}
                footer={null}
                width={900}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        title: "",
                        description: "",
                        // menuType: null,
                        // menuCategory: null,
                        sellingType: [],
                        price: "",
                        // compareAtPrice: "",
                        days: [],
                    }}
                >
                    <div className="menu-title-price">
                        <div className="title">
                            <Form.Item
                                name="title"
                                label="Menu Name"
                                rules={[{ required: true, message: "Menu Name is required" }]}
                            >
                                <Input placeholder="Menu Name" />
                            </Form.Item>
                        </div>


                        <div className="price">
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{ required: true, message: "Price is required" }]}
                            >
                                <Input type="number" placeholder="Price" />
                            </Form.Item>
                        </div>
                    </div>


                    <Form.Item
                        name="days"
                        label="Select Days"
                        rules={[{ required: true, message: "Select at least one day" }]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Select Days"
                            options={daysOfWeek}
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Menu Description"
                        rules={[{ required: true, message: "Description is required" }]}
                    >
                        <ReactQuill placeholder="Menu Description" />
                    </Form.Item>

                    {/* <Form.Item
                        name="menuType"
                        label="Menu Type"
                        rules={[{ required: true, message: "Menu Type is required" }]}
                    >
                        <Select
                            placeholder="Menu Type"
                            options={[
                                { value: "1", label: "Breakfast" },
                                { value: "2", label: "Lunch" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        name="menuCategory"
                        label="Menu Category"
                        rules={[{ required: true, message: "Category is required" }]}
                    >
                        <Select
                            placeholder="Menu Category"
                            options={[
                                { value: "1", label: "Appetizer" },
                                { value: "2", label: "Dessert" },
                            ]}
                        />
                    </Form.Item> */}

                    {/* <Form.Item
                        name="compareAtPrice"
                        label="Compare at Price"
                        rules={[{ required: true, message: "Compare at Price is required" }]}
                    >
                        <Input type="number" placeholder="Compare at Price" />
                    </Form.Item>

                    <Form.Item
                        name="sellingType"
                        label="Selling Type"
                        rules={[{ required: true, message: "At least one selling type is required" }]}
                    >
                        <Checkbox.Group
                            options={["Dine-in", "Online", "Both"]}
                        />
                    </Form.Item> */}

                    <Form.Item label="Upload Image">
                        <div className="image-upload">
                            <div>
                                {uploadedImageUrl && (
                                    <Image
                                        width={100}
                                        height={100}
                                        src={uploadedImageUrl}
                                        alt="Preview"
                                        style={{ marginBottom: 10 }}
                                    />
                                )}
                            </div>
                            <div>
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    showUploadList={false}
                                    customRequest={({ file }) => {
                                        handleImageUpload(file).then((imageUrl) => {
                                            if (imageUrl) {
                                                form.setFieldValue("images", [imageUrl]);
                                            }
                                        });
                                    }}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div>Upload</div>
                                    </div>
                                </Upload>
                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BuffetMenu;


