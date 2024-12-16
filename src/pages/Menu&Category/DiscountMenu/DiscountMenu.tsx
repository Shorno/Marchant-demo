/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal, Form, Input, Select, message, Pagination, Spin, Card, DatePicker } from "antd";
import { EditOutlined, RightCircleFilled } from "@ant-design/icons";
import { useGetSlotQuery } from "../../../redux/api/TimeSlot/timeSlot";
import { useGetDiscountQuery, usePostDiscountMenuMutation, useUpdateDiscountMutation } from "../../../redux/api/Menu/DiscountMenu";
import "./discountmenu.css";
import QuillEditor from "../../../components/QuillEditor/QuillEditor";
import dayjs from "dayjs";

const DiscountMenu = () => {
    const [slot, setSlot] = useState("morning");
    const [activeTime, setActiveTime] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<any>(null);
    const [form] = Form.useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [discount] = usePostDiscountMenuMutation();
    const [updateDiscount] = useUpdateDiscountMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
        setCurrentDate(formattedDate);
    }, []);

    const { data, isFetching, refetch } = useGetDiscountQuery({
        page: currentPage,
        page_size: pageSize,
        date: currentDate,
    });

    const { data: activeTimes, isLoading: isTimeLoading } = useGetSlotQuery(slot);

    const handleSubmit = async (values: any) => {
        const start_date = values.start_date?.format("YYYY-MM-DD");
        const end_date = values.end_date?.format("YYYY-MM-DD");

        const payload = {
            title: values.title,
            description,
            start_date,
            end_date,
            discount: values.discount,
            slot: values.slot,
            time: values.time,
        };

        try {
            if (isEditMode) {
                await updateDiscount({ id: selectedMenu.id, data: payload, date: currentDate }).unwrap();
                message.success("Discount updated successfully!");
            } else {
                await discount(payload).unwrap();
                message.success("Discount created successfully!");
            }

            refetch();
            form.resetFields();
            setDescription("");
            setIsModalVisible(false);
        } catch (error: any) {
            console.error(error);
            message.error("Failed to save the Discount. Please try again.");
        }
    };

    const handleEditClick = (menu: any) => {
        setSelectedMenu(menu);
        setIsEditMode(true);
        form.setFieldsValue({
            title: menu.title || "",
            discount: menu.discount || "",
            start_date: menu.start_date ? dayjs(menu.start_date) : null,
            end_date: menu.end_date ? dayjs(menu.end_date) : null,
            slot: menu.slot || "",
            time: menu.time || [],
            description: menu.description || "",
        });
        setDescription(menu.description || "");
        setIsModalVisible(true);
    };

    const handleAddClick = () => {
        setSelectedMenu(null);
        setIsEditMode(false);
        form.resetFields();
        setDescription("");
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setDescription("");
    };

    const handlePageChange = (page: number, pageSize?: number) => {
        setCurrentPage(page);
        if (pageSize) setPageSize(pageSize);
    };

    return (
        <div className="discount">
            <div className="modal-btn">
                <button onClick={handleAddClick}>Add Discount</button>
            </div>

            <div className="discount-item">
                {isFetching ? (
                    <div className="loading">
                        <Spin />
                    </div>
                ) : (
                    data?.results?.map((menu: any) => (
                        <Card hoverable key={menu.id}>
                            <div className="discount-list">
                                <div className="title">
                                    <h3>{menu.title}</h3>
                                    <div>
                                        {menu?.status === "pending" ? (
                                            <Spin tip="Loading..." />
                                        ) : (
                                            <div><RightCircleFilled /></div>
                                        )}

                                    </div>
                                </div>

                                <div className="action">
                                    <EditOutlined
                                        className="edit"
                                        onClick={() => handleEditClick(menu)}
                                    />
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
                title={isEditMode ? "Edit Discount" : "Add Discount"}
                open={isModalVisible}
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
                        discount: "",
                        start_date: null,
                        end_date: null,
                        slot: "",
                        time: [],
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Discount Title"
                        rules={[{ required: true, message: "Discount Title is required" }]}
                    >
                        <Input placeholder="Discount Title" />
                    </Form.Item>

                    <Form.Item
                        name="discount"
                        label="Discount Percentage"
                        rules={[{ required: true, message: "Discount Percentage is required" }]}
                    >
                        <Input type="number" placeholder="Discount Percentage" />
                    </Form.Item>

                    <div className="date">
                        <Form.Item
                            name="start_date"
                            label="Start Date"
                            rules={[{ required: true, message: "Select start date" }]}
                        >
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                        <Form.Item
                            name="end_date"
                            label="End Date"
                            rules={[{ required: true, message: "Select end date" }]}
                        >
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                    </div>

                    <div className="slot-time">
                        <div className="slot">
                            <Form.Item name="slot" label="Slot">
                                <Select
                                    placeholder="Select a slot"
                                    value={slot}
                                    onChange={(value) => {
                                        setSlot(value);
                                        setActiveTime([]);
                                    }}
                                >
                                    <Select.Option value="morning">Morning</Select.Option>
                                    <Select.Option value="lunch">Lunch</Select.Option>
                                    <Select.Option value="dinner">Dinner</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="time">
                            <Form.Item name="time" label="Time">
                                <Select
                                    mode="multiple"
                                    placeholder="Select time slots"
                                    value={activeTime}
                                    loading={isTimeLoading}
                                    onChange={(value) => setActiveTime(value)}
                                    options={(activeTimes?.active_slot || []).map((time: string) => ({
                                        label: time,
                                        value: time,
                                    }))}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item
                        name="description"
                        label="Menu Description"
                        rules={[{ required: true, message: "Description is required" }]}
                    >
                        <QuillEditor
                            value={description}
                            onChange={setDescription}
                            placeholder="Enter menu description here..."
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DiscountMenu;
