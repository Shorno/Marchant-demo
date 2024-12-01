import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Upload, Row, Col, message, Button } from "antd";
import {
    ArrowRightOutlined,
    LoadingOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import GetHelp from "../GetHelp/GetHelp";
// import "./restaurantbookingform.css";
import { UploadChangeParam } from "antd/es/upload";

const { Option } = Select;

interface FormData {
    restaurantName: string;
    restaurantEmail: string;
    restaurantWebsite: string;
    restaurantAddress: string;
    city: string;
    zipCode: string;
    country: string;
    identifyAddress?: string;
    reservationPerDay: string;
    seatCapacity: string;
    averageBill: string;
    currency: string;
    cuisineType: string;
}

const getBase64 = (
    img: File,
    callback: (result: string | ArrayBuffer | null) => void
) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
};


const RestaurantInfoForm: React.FC<{ onNext: () => void }>= ({onNext}) => {
    const fields = [
        {
            label: "Restaurant Name",
            name: "restaurantName",
            type: "input",
            required: true,
        },
        {
            label: "Restaurant Email",
            name: "restaurantEmail",
            type: "input",
            required: true,
        },
        {
            label: "Restaurant Website",
            name: "restaurantWebsite",
            type: "input",
            required: true,
        },
        {
            label: "Restaurant Address/Street",
            name: "restaurantAddress",
            type: "input",
            required: true,
        },
        {
            label: "City",
            name: "city",
            type: "select",
            required: true,
            options: ["City 1", "City 2"],
        },
        { label: "Zip Code", name: "zipCode", type: "input", required: true },
        {
            label: "Country",
            name: "country",
            type: "select",
            required: true,
            options: ["Country 1", "Country 2"],
        },
        { label: "Identify Address", name: "identifyAddress", type: "input" },
        {
            label: "Reservation You Get Per Day",
            name: "reservationPerDay",
            type: "input",
            required: true,
        },
        {
            label: "Restaurant Seat Capacity",
            name: "seatCapacity",
            type: "input",
            required: true,
        },
        {
            label: "Average Bill Per Customer",
            name: "averageBill",
            type: "input",
            required: true,
        },
        {
            label: "Your Currency",
            name: "currency",
            type: "input",
            required: true,
        },
        {
            label: "Cuisine Type",
            name: "cuisineType",
            type: "select",
            required: true,
            options: ["Cuisine 1", "Cuisine 2"],
        },
    ];

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState<string>();
    const [coverImage, setCoverImage] = useState<string>();

    const handleChange =
        (setImage: React.Dispatch<React.SetStateAction<string | undefined>>) =>
        (info: UploadChangeParam) => {
            if (info.file.status === "uploading") {
                setLoading(true);
                return;
            }
            if (info.file.status === "done") {
                getBase64(info.file.originFileObj as File, (url) => {
                    setLoading(false);
                    setImage(url as string);
                });
            }
        };

    const onSubmit = (data: FormData) => {
        console.log("Form Submitted:", data);
    };

    const uploadButton = (
        <button
            style={{
                border: 2,
                background: "#FCFCFC",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
        </button>
    );

    return (
        <div>
            <GetHelp />
            <p className="restaurant-title">Restaurant Information</p>
            <p className="restaurant-paragraph">
                All info of your restaurant shown below.
            </p>

            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row gutter={[16, 16]}>
                        {fields.map((field, index) => (
                            <Col key={index} xs={24} sm={12} md={12} lg={12}>
                                <div className="form-item">
                                    <label>
                                        {field.label}
                                        {field.required && (
                                            <span className="star"> *</span>
                                        )}
                                    </label>
                                    <Controller
                                        name={field.name as keyof FormData}
                                        control={control}
                                        rules={{ required: field.required }}
                                        render={({ field: controllerField }) =>
                                            field.type === "input" ? (
                                                <Input
                                                    {...controllerField}
                                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                                    status={
                                                        errors[
                                                            field.name as keyof FormData
                                                        ]
                                                            ? "error"
                                                            : ""
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            "#F5F5F5",
                                                    }}
                                                />
                                            ) : (
                                                <Select
                                                    {...controllerField}
                                                    placeholder={`Select ${field.label.toLowerCase()}`}
                                                    status={
                                                        errors[
                                                            field.name as keyof FormData
                                                        ]
                                                            ? "error"
                                                            : ""
                                                    }
                                                    className="custom-select"
                                                    style={{ backgroundColor: "#F5F5F5" }} 
                                                >
                                                    {field.options?.map(
                                                        (option, idx) => (
                                                            <Option
                                                                key={idx}
                                                                value={option}
                                                            >
                                                                {option}
                                                            </Option>
                                                        )
                                                    )}
                                                </Select>
                                            )
                                        }
                                    />
                                    {errors[field.name as keyof FormData] && (
                                        <span className="error-message">
                                            {field.label} is required
                                        </span>
                                    )}
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <div className="form-item">
                                <label>Restaurant Profile *</label>
                                <Upload
                                    name="restaurantProfile"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange(setProfileImage)}
                                >
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="profile"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </div>
                        </Col>
                        <Col xs={24} sm={12}>
                            <div className="form-item">
                                <label>Restaurant Cover *</label>
                                <Upload
                                    name="restaurantCover"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange(setCoverImage)}
                                >
                                    {coverImage ? (
                                        <img
                                            src={coverImage}
                                            alt="cover"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        uploadButton
                                    )}
                                </Upload>
                            </div>
                        </Col>
                    </Row>

                    <div className="form-footer">
                        <a href="#" className="previous">
                            Previous Step
                        </a>
                        <Button onClick={onNext} className="button-details" htmlType="submit">
                            Next <ArrowRightOutlined />
                        </Button>

                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestaurantInfoForm;
