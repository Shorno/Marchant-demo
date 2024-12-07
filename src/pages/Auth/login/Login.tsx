/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import LoginBG from '../../../assets/manager-login-bg.png';
import "./Login.css";
import { useUserLoginMutation } from "../../../redux/api/Auth/authApi";
import { storeUserInfo } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

export interface LoginData {
    username: string;
    password: string;
}
export interface Response {
    access: string;
    refresh: string;
    role: string;
}

export default function Login() {
    const navigate = useNavigate()
    const [userLogin] = useUserLoginMutation()

    const handleSubmit = async (value: LoginData) => {
        console.log("Received values of form: ", value);
        try {
            const res = await userLogin(value).unwrap();
            if (res?.access) {
                storeUserInfo({ access: res?.access, refresh: res?.refresh });
                navigate("/dashboard", { replace: true });
                message.success('Login successfully ');
              }
        } catch (err: any) {
            message.error(err?.message)
            console.log(err.message)
        }
    };

    return (
        <div className="login-container">
            {/* Left Section with Background Image */}
            <div className="login-left">
                <img src={LoginBG} alt="Background" />
            </div>

            {/* Right Section with Login Form */}
            <div className="login-right">
                <Form
                    layout="vertical"
                    name="login"
                    className="login-form"
                    onFinish={handleSubmit}
                >
                    <h2>Login</h2>
                    <p className="login-description">
                        Please log in to your account.
                    </p>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            size="large"
                            className="login-input"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                            size="large"
                            className="login-input"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit" className="login-button">
                            Log in
                        </Button>

                    </Form.Item>
                    <div className="login-register">
                        <span> Or </span>
                        <a href="/registration">Register now!</a>
                    </div>
                </Form>
            </div>

        </div>
    );
}
