/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Input, Modal, Select, Button, Form, DatePicker, message, } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { usePostDiscountMenuMutation } from "../../../redux/api/Menu/DiscountMenu";
import { useGetSlotQuery } from "../../../redux/api/TimeSlot/timeSlot";
import "./discountmenu.css";

const { RangePicker } = DatePicker;

const DiscountMenu = () => {
    const [open, setOpen] = useState(false);
    const [slot, setSlot] = useState("morning");
    const [activeTime, setActiveTime] = useState<string[]>([]);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [form] = Form.useForm();

    const [discountMenu] = usePostDiscountMenuMutation();
    const { data: activeTimes, isLoading: isTimeLoading } = useGetSlotQuery(slot);

    const handleSubmit = async (values: any) => {
        const payload = {
            ...values,
            start_date: values.dateRange[0].format("YYYY-MM-DD"),
            end_date: values.dateRange[1].format("YYYY-MM-DD"),
            time: values.time,
            images: uploadedImageUrl ? [uploadedImageUrl] : [],
        };

        try {
            const result = await discountMenu(payload).unwrap();
            console.log(result);
            message.success("Discount menu created successfully!");
            form.resetFields();
            setUploadedImageUrl("");
            setOpen(false);
        } catch (error) {
            console.error("API Error:", error);
            message.error("Failed to create the discount menu. Please try again.");
        }
    };

    return (
        <div className="discount-menu-container">
            <Button type="primary" onClick={() => setOpen(true)}>
                Discount Menu
            </Button>

            <Modal
                open={open}
                title="Discount Menu"
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
                        discount: "",
                        slot: "",
                        time: [],
                    }}
                >
                    <div className="from-header">
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


                        <Form.Item
                            name="dateRange"
                            label="Discount Duration"
                            rules={[{ required: true, message: "Select start and end date" }]}
                        >
                            <RangePicker />
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
                        <ReactQuill
                            value={form.getFieldValue("description")}
                            onChange={(value) => form.setFieldsValue({ description: value })}
                            placeholder="Menu Description"
                        />
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

export default DiscountMenu;
