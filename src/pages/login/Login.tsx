import {Button, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

export default function Login() {

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    return (
        <>
            <div style={{height: "100dvh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Form
                    layout={"vertical"}
                    name="login"
                    style={{
                        maxWidth: 500,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        label={"Email"}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined/>} placeholder="Emails"/>
                    </Form.Item>
                    <Form.Item
                        label={"Password"}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input prefix={<LockOutlined/>} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        or <a href="">Register now!</a>
                    </Form.Item>
                </Form>

            </div>
        </>
    )
}