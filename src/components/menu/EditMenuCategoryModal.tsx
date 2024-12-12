/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Image, Input, InputNumber, message, Select, Upload } from "antd";
import { useGetSingleMenuCategoryQuery, useUpdateMenuCategoryMutation } from "../../redux/api/Menu/menu";
import { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useImageUploadMutation } from "../../redux/api/ImageUpload/imageUpload";

const EditMenuCategoryModal = ({ id, menuId, refetch: fetch, modalClose }: any) => {

    console.log('idddddddd', id)
    console.log('menuiddddddddd', menuId)
    // Fetch menu data based on id
    const { data, isLoading, isError, error, refetch } = useGetSingleMenuCategoryQuery({ id });

    console.log(data)
    const [imageUpload] = useImageUploadMutation();
    const [updateCategoty] = useUpdateMenuCategoryMutation()
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
    const [form] = Form.useForm();

    // Trigger refetch when id changes
    useEffect(() => {
        refetch();
    }, [id, refetch]);

    // Handle image upload
    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const result = await imageUpload(formData).unwrap();
            setUploadedImageUrl(result?.image_url);
            return result?.image_url;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        const values = form.getFieldsValue();
        const payload = {
            ...values,
            title: values.itemName,
            menu: menuId,
            image: uploadedImageUrl || data?.image,
        };

        try {
            const res = await updateCategoty({ id, data: payload }).unwrap();
            message.success(res.message || "category upsate successfully");
            refetch();
            fetch();
            modalClose();
        } catch (error: any) {
            console.log(error.message);
        }

        console.log('Form submission payload:', payload);
    };


    // Update form when data is fetched
    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                itemName: data?.title,
                price: parseFloat(data?.price),
                currency: "BDT", // Replace with the appropriate value if available
                description: data?.description,
                foodAlert: data?.food_alert,
                image: data?.image,
            });
        }
    }, [data, form]);

    // Show loading or error state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {(error as Error).message}</div>;
    }



    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    itemName: data?.title,
                    price: parseFloat(data?.price),
                    currency: "BDT", // Replace with the appropriate value if available
                    description: data?.description,
                    foodAlert: data?.food_alert,
                    image: data?.image,
                }}
            >
                <Form.Item
                    label="Menu Item Name"
                    name="itemName"
                    rules={[{ required: true, message: 'Please enter the menu item name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Item Price"
                    name="price"
                    rules={[{ required: true, message: 'Please enter the price!' }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Currency"
                    name="currency"
                    rules={[{ required: true, message: 'Please select a currency!' }]}>
                    <Select>
                        <Select.Option value="BDT">BDT</Select.Option>
                        <Select.Option value="Euro">Euro</Select.Option>
                        <Select.Option value="USD">USD</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter the description!' }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Food Alerts"
                    name="foodAlert">
                    <Select mode="multiple" placeholder="Select food alerts">
                        {(data?.food_alert || []).map((alert: string) => (
                            <Select.Option key={alert} value={alert}>
                                {alert}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Menu Image"
                    name="image">
                    <div className='image-upload-from-preview'>
                        <div>
                            {uploadedImageUrl || data?.image ? (
                                <Image width={100} height={100} src={uploadedImageUrl || data?.image} alt="Preview" />
                            ) : null}
                        </div>
                        <Upload
                            name="image"
                            listType="picture-card"
                            showUploadList={false}
                            customRequest={({ file }: any) => {
                                handleImageUpload(file).then((imageUrl) => {
                                    if (imageUrl) {
                                        setUploadedImageUrl(imageUrl);
                                    }
                                });
                            }}>
                            <div>
                                <PlusOutlined />
                                <div>Upload</div>
                            </div>
                        </Upload>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#FFA500', borderColor: '#FFA500' }}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditMenuCategoryModal;
