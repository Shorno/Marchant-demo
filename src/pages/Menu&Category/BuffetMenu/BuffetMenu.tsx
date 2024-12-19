/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Modal, Form, Input, Upload, Image, Select, message, Pagination, Spin, Card } from "antd";
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { useImageUploadMutation } from "../../../redux/api/ImageUpload/imageUpload";
import { useDeleteBuffetMenuMutation, useGetBuffetMenuQuery, usePostBuffetMenuMutation, useUpdateBuffetMenuMutation } from "../../../redux/api/Menu/BuffetMenu";
import './buffetMenu.css';
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<any>(null);
    const [form] = Form.useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [buffetMenu] = usePostBuffetMenuMutation();
    const [updateBuffetMenu] = useUpdateBuffetMenuMutation();
    const [DeleteBuffetMenu] = useDeleteBuffetMenuMutation();
    const [imageUpload] = useImageUploadMutation();
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Pass page and page_size as parameters
    const { data, isFetching, refetch } = useGetBuffetMenuQuery({ page: currentPage, page_size: pageSize });

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
            images: uploadedImageUrl ? [uploadedImageUrl] : selectedMenu?.images || [],
        };

        try {
            if (isEditMode) {
                await updateBuffetMenu({ id: selectedMenu.id, data: payload }).unwrap();
                message.success("Buffet menu updated successfully!");
                refetch()
            } else {
                await buffetMenu(payload).unwrap();
                message.success("Buffet menu created successfully!");
                refetch()
            }

            form.resetFields();
            setUploadedImageUrl("");
            setIsModalVisible(false);
        } catch (error: any) {
            message.error("Failed to save the Buffet menu. Please try again.", error);
        }
    };

    const handleEditClick = (menu: any) => {
        setSelectedMenu(menu);
        setIsEditMode(true);
        form.setFieldsValue({
            title: menu.title || "",
            price: menu.price || "",
            description: menu.description || "",
            days: menu.days || [],
            images: menu.images || [],
        });
        setUploadedImageUrl(menu.images?.[0] || "");
        setIsModalVisible(true);
    };

    const handleAddClick = () => {
        setSelectedMenu(null);
        setIsEditMode(false);
        form.resetFields();
        setUploadedImageUrl("");
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setUploadedImageUrl("");
    };

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) setPageSize(pageSize);
    };

    const handleViewClick = async (menu: any, menuID: number, currentStatus: boolean) => {
        try {
            const updatedStatus = !currentStatus;
            const payload = {
                title: menu.title || "",
                price: menu.price || "",
                description: menu.description || "",
                days: menu.days || [],
                images: menu.images || [],
                is_active: updatedStatus,
            };

            form.setFieldsValue(payload);

            await updateBuffetMenu({
                id: menuID,
                data: payload,
            }).unwrap();

            message.success(
                `Menu item has been ${updatedStatus ? "activated" : "deactivated"} successfully!`
            );
            refetch();
        } catch (error) {
            console.error("Error updating menu status:", error);
            message.error("Failed to update menu status. Please try again.");
        }
    };


    const handleDeleteMenu = async (menuID: number) => {
        try {
            await DeleteBuffetMenu({ id: menuID, }).unwrap();

            message.success('Buffet menu Deleted successfully');
            refetch();
        } catch (error) {
            console.error("Error updating Buffet menu:", error);
            message.error("Failed to delete Buffet menu. Please try again.");
        }
    }

    return (
        <div className="buffet">
            <div className="modal-btn">
                <button onClick={handleAddClick}>Add Buffet Menu</button>
            </div>

            <div className="buffet-item">
                {isFetching ? (
                    <div className="loading">
                        <Spin />
                    </div>
                ) : (
                    data?.results?.map((menu: any) => (
                        <Card hoverable key={menu.id}>
                            <div className="buffet-list">
                                <div className="title">
                                    <h3>{menu.title}</h3>
                                </div>
                                <div className="action">
                                    <div>
                                        <EditOutlined className="edit" onClick={() => handleEditClick(menu)} />
                                    </div>
                                    <div
                                        title={menu.is_active ? "Hide" : "View"}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleViewClick(menu, menu.id, menu.is_active);
                                        }}
                                    >
                                        {menu.is_active ? <EyeOutlined className="eye" /> : <EyeInvisibleOutlined className="eye" />}
                                    </div>

                                    <div title="Delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteMenu(menu.id);
                                        }}
                                    >
                                        <DeleteOutlined className="delete" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={data?.count || 0}
                    onChange={handlePageChange}
                />
            </div>

            {/* Modal for adding/editing */}
            <Modal
                title={isEditMode ? "Edit Buffet Menu" : "Add Buffet Menu"}
                visible={isModalVisible}
                width={900}
                onOk={() => form.submit()}
                onCancel={handleModalCancel}
                okText={isEditMode ? "Save" : "Add"}
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        title: "",
                        description: "",
                        price: "",
                        days: [],
                        images: [],
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

                    <Form.Item label="Upload Image">
                        <div className="image-upload">
                            <div>
                                {uploadedImageUrl && (
                                    <Image
                                        width={100}
                                        height={100}
                                        src={uploadedImageUrl || selectedMenu?.image}
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
                </Form>
            </Modal>
        </div>
    );
};

export default BuffetMenu;

