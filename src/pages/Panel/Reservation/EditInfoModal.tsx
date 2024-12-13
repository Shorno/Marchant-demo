import {Button, DatePicker, Flex, Form, Input, Modal, Select} from "antd";
import {TableReservationTypes} from "../../../../types/reservationTypes.ts";
import dayjs from "dayjs";

const {TextArea} = Input;

interface EditInfoModalProps {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    data: TableReservationTypes
}

export default function EditInfoModal({isModalOpen, handleOk, handleCancel, data}: EditInfoModalProps) {

    const onFinish = (values: never) => {
        console.log('Received values of form: ', values);
    };

    return (
        <>
            <Modal
                className={"custom-modal"}
                title={"Edit Table"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    requiredMark={false}
                    name="edit-table"
                    onFinish={onFinish}
                    colon={false}
                    labelCol={{span: 12}}
                    labelAlign={"left"}

                >
                    <Form.Item
                        label={"Pax"}
                        name="pax"
                        rules={[{required: true, message: 'Pax is required!'}]}
                    >
                        <Input placeholder="Enter pax no"/>
                    </Form.Item>
                    <Form.Item
                        label={"Table"}
                        name="table"
                        rules={[{required: true, message: 'Table is required!'}]}
                        initialValue={data.table_number}
                    >
                        <Input placeholder="Enter table no"/>
                    </Form.Item>
                    <Form.Item
                        label={"Date"}
                        name="date"
                        initialValue={dayjs(data.date)}
                        rules={[{required: true, message: 'Date is required!'}]}
                    >
                        <DatePicker/>
                    </Form.Item>
                    <Form.Item
                        label={"Slot"}
                        name="slot"
                        rules={[{required: true, message: 'Slot is required!'}]}
                        initialValue={data.slot}
                    >
                        <Input placeholder="Enter slot"/>
                    </Form.Item>

                    <Form.Item
                        label={"Time"}
                        name="time"
                        initialValue={data.time}
                        rules={[{required: true, message: 'Time is required!'}]}
                    >
                        <Input placeholder="Enter time"/>
                    </Form.Item>
                    <Form.Item
                        label={"Status"}
                        name="status"
                        initialValue={data.status}
                    >
                        <Select placeholder="Select status">
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="cancelled">Cancelled</Select.Option>
                            <Select.Option value="completed">Completed</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={"Customer comment"}
                        name="customerComment"
                        initialValue={data.comment}
                        rules={[{required: true, message: 'Customer comment is required!'}]}

                    >
                        <TextArea placeholder="Customer comment.."/>
                    </Form.Item>


                    <Form.Item
                        label={"Remark"}
                        name="remark"
                        rules={[{required: true, message: 'Remark is required!'}]}
                        initialValue={data.remark}
                    >
                        <TextArea placeholder="You need to specify the remark"/>
                    </Form.Item>

                    <Flex justify={"center"}>
                        <Form.Item>
                            <Button className={"ubaky-primary-button"} block type="primary" htmlType="submit">
                                Confirm
                            </Button>
                        </Form.Item>
                    </Flex>
                </Form>
            </Modal>
        </>
    )
}