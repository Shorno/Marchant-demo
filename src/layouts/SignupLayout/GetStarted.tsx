import logo from "../../assets/ubaky_logo.png";
import author from "../../assets/author-image.jpeg";
import {Form, Input, Select, Steps, Button, Grid} from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {ArrowRightOutlined} from "@ant-design/icons";
import "../../pages/Registration/signup.css"

interface GetStartedFormFields {
    first_name: string;
    last_name: string;
    email: string;
    country: string [];
    city: string [];
    phone: string;
    password: string;
    confirmPassword: string;
}


const {useBreakpoint} = Grid

interface GetStartedProps {
    onNext: (values: any) => void;
}

export default function GetStarted({onNext}: GetStartedProps) {
    const [form] = Form.useForm<GetStartedFormFields>();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    // const onFinish = (values: GetStartedFormFields) => {
    //     console.log("Form Data:", values);
    // };

    const handleSubmit = (values: GetStartedFormFields) => {
        console.log("Form Data:", values);
        onNext(values);
    };

    return (
        <div className="signup-container">
            <div className="left-section">
                <img className="logo" src={logo} alt="logo"/>
                <div className="info">
                    <h1 className="left-title">
                        Let's Setup your Restaurant Portal
                    </h1>
                    <p className="left-paragraph">
                        All-in-one solution for your business in the state. Form
                        a new company from scratch or onboard your existing US
                        company.
                    </p>
                </div>
                <div className="testimonial">
                    <p className="quote">"I barely had to do anything"</p>
                    <p className="description">
                        Love the experience. Got my business set up and all
                        necessary details in about a month and I barely had to
                        do anything. Definitely recommend!
                    </p>
                    <div className="author">
                        <div className="author-info">
                            <span>
                                <img
                                    className="author-image"
                                    src={author}
                                    alt="Author"
                                />
                            </span>
                            <span className="author-name">Khorshed Alom</span>
                        </div>
                        <span className="star1">★ ★ ★ ★ ★</span>
                    </div>
                </div>
                <div className="page-dots">
                    <span className="dot active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>

            {/* Right side */}
            <div className="right-section">
                <div className="progress-bar">
                    <Steps
                        current={1}
                        direction="horizontal"
                        labelPlacement="horizontal"
                        items={[{}, {}, {}, {}]}
                    />
                </div>
                <div className="signup-info">
                    <h1 className="signup-title">Let's get started</h1>

                    <Form
                        size={`${isMobile ? "middle" : "large"}`}
                        requiredMark={false}
                        form={form}
                        className="signup-form"
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <div className="form-row">
                            <Form.Item
                                name="first_name"
                                label="First Name"
                                className="form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: "First Name is required",
                                    },
                                ]}
                            >
                                <Input placeholder="First name"/>
                            </Form.Item>
                            <Form.Item
                                name="last_name"
                                label="Last Name"
                                className="form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: "Last Name is required",
                                    },
                                ]}
                            >
                                <Input placeholder="Last name"/>
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email is required",
                                },
                                {
                                    type: "email",
                                    message: "Please enter a valid email",
                                },
                            ]}
                        >
                            <Input placeholder="Email"/>
                        </Form.Item>

                        <div className="form-row">
                            <Form.Item
                                name="country"
                                label="Country"
                                className="form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: "Country is required",
                                    },
                                ]}
                            >
                                <Select placeholder="Select Country">
                                    <Select.Option value="USA">USA</Select.Option>
                                    <Select.Option value="Canada">Canada</Select.Option>
                                    <Select.Option value="UK">UK</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="city"
                                label="City"
                                className="form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: "City is required",
                                    },
                                ]}
                            >
                                <Select placeholder="Select City">
                                    <Select.Option value="New York">New York</Select.Option>
                                    <Select.Option value="Toronto">Toronto</Select.Option>
                                    <Select.Option value="London">London</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Phone number is required",
                                },
                                {
                                    validator: (_, value) =>
                                        value && value.length >= 10
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                new Error("Enter a valid phone number")
                                            ),
                                },
                            ]}
                        >
                            <PhoneInput
                                country={"us"}
                                inputProps={{
                                    name: "phone",
                                    required: true,
                                }}
                                containerClass="phone-input-container"
                                inputClass="phone-input-field"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Password is required",
                                },
                                {
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Password must include 1 uppercase, 1 lowercase, 1 number, 1 symbol, and at least 8 characters",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password"/>
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password",
                                },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("Passwords do not match")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm Password"/>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="submit"
                                block
                            >
                                GET STARTED <ArrowRightOutlined/>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

