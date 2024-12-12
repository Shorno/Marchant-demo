/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { CaretRightOutlined, DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Collapse, Image, theme, Row, Col, Spin, Modal, Form, Input, InputNumber, Select, Button, Upload, message } from 'antd';
import './menuList.css';
import { useImageUploadMutation } from '../../../../redux/api/ImageUpload/imageUpload';
import { useDeleteMenuCategoryMutation, usePostMenuCategoryMutation } from '../../../../redux/api/Menu/menu';
import { useAlertQuery } from '../../../../redux/api/FoodAlert/foodAlert';
import EditMenuModal from '../../../../components/menu/EditMenuModal';
import EditMenuCategoryModal from '../../../../components/menu/EditMenuCategoryModal';

const MenuList = ({ data, refetch, isLoading, error }: any) => {
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    const [imageUpload] = useImageUploadMutation();
    const [menuCategory] = usePostMenuCategoryMutation();
    const [deleteCategory] = useDeleteMenuCategoryMutation();

    const { data: alert } = useAlertQuery({})


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] = useState(false);
    const [setEditMenuData] = useState<any>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
    const [menuID, SetMenuID] = useState();
    const [categoryMenuID, SetCategoryMenuID] = useState();



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
    const showEditCategoryModal = () => {
        setIsEditCategoryModalVisible(true);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };
    const handleEditCategoryCancel = () => {
        setIsEditCategoryModalVisible(false);
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



    const handleViewClick = async (menuId: number) => {
        try {
            const token = localStorage.getItem("access");

            // Fetch the current menu data
            const currentMenuResponse = await fetch(
                `${import.meta.env.VITE_BASE_URL}/restaurants/info/menu/${menuId}/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!currentMenuResponse.ok) {
                throw new Error("Failed to fetch current menu data");
            }

            const currentMenuData = await currentMenuResponse.json();

            const payload = {
                id: menuId,
                is_active: !currentMenuData.is_active,
                slot: currentMenuData.slot || '',
                title: currentMenuData.title || '',
            };

            const updateResponse = await fetch(
                `${import.meta.env.VITE_BASE_URL}/restaurants/info/menu/${menuId}/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!updateResponse.ok) {
                const errorDetails = await updateResponse.json();
                throw new Error(errorDetails.detail || "Failed to update menu status");
            }

            await updateResponse.json();
            message.success(`Menu ${!currentMenuData.is_active ? "Opened" : "Closed"} successfully!`);
            refetch();
        } catch (error: any) {
            console.error("Error updating menu status:", error);
            message.error(error.message || "Failed to update the menu status.");
        }
    };





    const handleCategoryViewClick = async (categoryId: number) => {
        try {
            const token = localStorage.getItem("access");

            // Fetch the current menu data
            const currentMenuResponse = await fetch(
                `${import.meta.env.VITE_BASE_URL}/restaurants/info/category/${categoryId}/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!currentMenuResponse.ok) {
                throw new Error("Failed to fetch current menu data");
            }

            const currentMenuData = await currentMenuResponse.json();

            const payload = {
                id: categoryId,
                is_active: !currentMenuData.is_active, 
                slot: currentMenuData.slot || '',
                title: currentMenuData.title || '',
                price:currentMenuData.price ||'',
                menu: currentMenuData.menu
            };

            const updateResponse = await fetch(
                `${import.meta.env.VITE_BASE_URL}/restaurants/info/category/${categoryId}/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!updateResponse.ok) {
                const errorDetails = await updateResponse.json();
                throw new Error(errorDetails.detail || "Failed to update category status");
            }

            await updateResponse.json();
            message.success(`Menu ${!currentMenuData.is_active ? "Opened" : "Closed"} successfully!`);
            refetch();
        } catch (error: any) {
            console.error("Error updating category status:", error);
            message.error(error.message || "Failed to update the category status.");
        }
    };





    const handleDeleteMenu = async (menuId: number) => {
        try {
            const token = localStorage.getItem("access");
            const payload = {
                id: menuId,
            };

            const updateResponse = await fetch(
                `${import.meta.env.VITE_BASE_URL}/restaurants/info/menu/${menuId}/`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!updateResponse.ok) {
                const errorDetails = await updateResponse.json();
                throw new Error(errorDetails.detail || "Failed to Dlete menu");
            }

            refetch();
            message.success(`Menu Delete successfully!`);
        } catch (error: any) {
            console.error("Error Delete menu :", error);
            message.error(error.message || "Failed to delete the menu.");
        }
    };


    const handleDeteteCategory = async (id: number) => {
        try {
            const res = await deleteCategory({ id });
            message.success(res?.data?.message || "successfully delete the category.");
            refetch();
        } catch (error: any) {
            message.error(error.message || "Failed to delete the category.");
        }
    }



    const items = data?.results.map((menu: any) => ({
        key: menu.id,
        label: (
            <div className="menu-label">
                <h3>{menu.title}</h3>
                <div className="action-icons">
                    <span
                        className="icon edit-icon"
                        title="Add"
                        onClick={(e) => {
                            e.stopPropagation();
                            showModal();
                            SetMenuID(menu?.id)
                        }}
                    >
                        <PlusOutlined />
                    </span>


                    <span
                        className="icon edit-icon"
                        title="Edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            SetMenuID(menu?.id)
                            setEditMenuData(menu);
                            setIsEditModalVisible(true);
                        }}
                    >
                        <EditOutlined />
                    </span>

                    <span
                        className="icon view-icon"
                        title={menu.is_active ? "Hide" : "View"}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleViewClick(menu.id);
                        }}
                    >
                        {menu.is_active ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </span>

                    <span className="icon delete-icon" title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMenu(menu.id);
                        }}
                    >
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
                                    <h3>{category?.title}</h3>
                                    <p>{category?.description}</p>
                                </div>
                                <div className="action-icons">
                                    <span
                                        className="icon edit-icon"
                                        title="Edit"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            SetMenuID(menu?.id)
                                            showEditCategoryModal()
                                            SetCategoryMenuID(category?.id)
                                            showEditCategoryModal()
                                        }}
                                    >
                                        <EditOutlined />
                                    </span>
                                    <span className="icon view-icon" title="View" onClick={(e) => {
                                        e.stopPropagation();
                                        handleCategoryViewClick(category?.id);
                                    }}
                                    >
                                        {category?.is_active ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                    </span>
                                    <span className="icon delete-icon" title="Delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeteteCategory(category?.id);
                                        }}
                                    >
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

            {/* Modal for Add  menu  cetagory*/}
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
                                alert.map((item: any) => (
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

            {/* Modal for update Add menu */}

            <Modal
                title="Edit Menu"
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={null}
            >
                <EditMenuModal id={menuID} refetch={refetch} />
            </Modal>

            <Modal
                title="Edit Category Menu"
                visible={isEditCategoryModalVisible}
                onCancel={handleEditCategoryCancel}
                footer={null}
            >
                <EditMenuCategoryModal data={data} id={categoryMenuID} menuId={menuID} refetch={refetch} modalClose={handleEditCategoryCancel} />
            </Modal>
        </>
    );
};

export default MenuList;
