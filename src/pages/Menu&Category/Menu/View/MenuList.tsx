/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { CaretRightOutlined, DeleteOutlined, EditOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Collapse, Image, theme, Row, Col, Spin, Modal, Form, Input, InputNumber, Select, Button, Upload } from 'antd';
import './menuList.css';
import { useImageUploadMutation } from '../../../../redux/api/ImageUpload/imageUpload';
import { usePostMenuCategoryMutation } from '../../../../redux/api/Menu/menu';
import { useAlertQuery } from '../../../../redux/api/FoodAlert/foodAlert';

const MenuList = ({ data, refetch, isLoading, error }: any) => {
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    const [imageUpload] = useImageUploadMutation();
    const [menuCategory] = usePostMenuCategoryMutation();
    const { data: alert } = useAlertQuery({})


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
    const [menuID, SetMenuID] = useState();

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    };

    if (isLoading) {
        return <Spin className='loader' indicator={<LoadingOutlined className='loader-icon' spin />} />;
    }

    if (error) {
        return <p>Error fetching menu data.</p>;
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const result = await imageUpload(formData).unwrap();
            setUploadedImageUrl(result?.image_url);
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    };


    const handleSubmit = async (values: any) => {
        // Constructing payload
        const payload = {
            currency: values.currency,
            title: values.itemName,
            price: values.price.toString(),
            description: values.description,
            food_alert: values.foodAlert,
            image: uploadedImageUrl || '',
            menu: menuID,
        };

        console.log(payload);
        try {
            const result = await menuCategory(payload).unwrap();
            console.log(result);
            setIsModalVisible(false);
            form.resetFields();
            refetch()
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }

    };

    const items = data?.results.map((menu: any) => ({
        key: menu.id,
        label: (
            <div onClick={() => SetMenuID(menu?.id)} className="menu-label">
                <h3>{menu.title}</h3>
                <div className="action-icons">
                    <span className="icon edit-icon" title="Add" onClick={showModal}>
                        <PlusOutlined />
                    </span>
                    <span className="icon edit-icon" title="Edit">
                        <EditOutlined />
                    </span>
                    <span className="icon view-icon" title="View">
                        <EyeOutlined />
                    </span>
                    <span className="icon delete-icon" title="Delete">
                        <DeleteOutlined />
                    </span>
                </div>
            </div>
        ),
        children: (
            <div className="menu">
                {menu.categories.map((category: any) => (
                    <Row className="menu-list" key={category.id} gutter={24}>
                        <Col xs={24} sm={8} md={3}>
                            <Image
                                width={100}
                                height={100}
                                src={category?.image}
                                alt={category?.title}
                                style={{ borderRadius: 8 }}
                            />
                        </Col>
                        <Col xs={24} sm={16} md={20} className="category">
                            <div className="category-title-action">
                                <div>
                                    <h3>{category.title}</h3>
                                    <p>{category.description}</p>
                                </div>
                                <div className="action-icons">
                                    {/* <span className="icon edit-icon" title="Edit">
                                        <PlusOutlined />
                                    </span> */}
                                    <span className="icon edit-icon" title="Edit">
                                        <EditOutlined />
                                    </span>
                                    <span className="icon view-icon" title="View">
                                        <EyeOutlined />
                                    </span>
                                    <span className="icon delete-icon" title="Delete">
                                        <DeleteOutlined />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className='alert'>
                                    <strong>Food Alerts:</strong> {category.food_alert.join(', ')}
                                </p>
                                <p className='price'>{category.price} €</p>
                            </div>
                        </Col>
                    </Row>
                ))}
            </div>
        ),
        style: panelStyle,
    }));

    return (
        <>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                style={{ background: token.colorBgContainer }}
                items={items}
            />

            {/* Modal for Add Action */}
            <Modal
                title="Add Menu"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        label="Menu Item Name"
                        name="itemName"
                        rules={[{ required: true, message: 'Please enter the menu item name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Item Price"
                        name="price"
                        rules={[{ required: true, message: 'Please enter the price!' }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Currency"
                        name="currency"
                        rules={[{ required: true, message: 'Please select a currency!' }]}
                    >
                        <Select>
                            <Select.Option value="GBP">BDT</Select.Option>
                            <Select.Option value="Euro">Euro</Select.Option>
                            <Select.Option value="USD">USD</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please enter the description!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Food Alerts"
                        name="foodAlert"
                    >
                        <Select mode="multiple" placeholder="Select food alerts">
                            {alert &&
                                alert.map((item:any) => (
                                    <Select.Option key={item.value} value={item.value}>
                                        {item.label}
                                    </Select.Option>
                                ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        layout="vertical"
                        label="Menu Image"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={(e: any) => e?.fileList}
                    >
                        <div className='image-upload-from-preview'>
                            <div>
                                {uploadedImageUrl && (

                                    <Image width={100} height={100} src={uploadedImageUrl} alt="Preview" />
                                )}
                            </div>
                            <Upload
                                name="image"
                                listType="picture-card"
                                showUploadList={false}
                                customRequest={({ file }: any) => {
                                    handleImageUpload(file).then((imageUrl) => {
                                        form.setFieldsValue({
                                            image: [{ url: imageUrl }],
                                        });
                                    });
                                }}
                            >
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
            </Modal>
        </>
    );
};

export default MenuList;
