import {Button, Checkbox, Form} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import GetHelp from "../../pages/GetHelp/GetHelp.tsx";
import "../../pages/Agreement/agreement.css";

interface AgreementProps {
    onNext: (values: AgreementFormFields) => void;
    onPrevious: () => void;
}

interface AgreementFormFields {
    agreement: boolean;
}

export default function Agreement({onNext, onPrevious}: AgreementProps) {
    const [form] = Form.useForm<AgreementFormFields>();
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const handleSubmit = (values: AgreementFormFields) => {
        const isAgreed = form.getFieldValue('agreement');
        if (isAgreed) {
            console.log("Agreement values:", values);
            onNext(values);
        } else {
            form.setFields([{
                name: 'agreement',
                errors: ['You must agree to the terms and conditions']
            }]);
        }
    };

    return (
        <div>
            <GetHelp/>
            <p className="restaurant-title">AGREEMENT</p>
            <p className="restaurant-paragraph">
                Choose your files for agreement and upload
            </p>

            <Form
                form={form}
                size={`${isMobile ? "middle" : "large"}`}
                requiredMark={false}
                className="agreement-form"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <div className="terms-container">
                    <ul className="terms-list">
                        <li>
                            <strong>Accuracy of Information:</strong> You certify that all
                            information provided during registration, including business
                            identity number and other relevant details, is accurate and
                            up-to-date. You agree to promptly update any changes to this
                            information.
                        </li>
                        <li>
                            <strong>Compliance with Regulations:</strong> You agree to comply
                            with all applicable government regulations and guidelines related
                            to food safety, hygiene standards, and customer service practices.
                        </li>
                        <li>
                            <strong>Responsibility for Conduct:</strong> You acknowledge that
                            you are solely responsible for the conduct of your restaurant
                            staff and any third-party vendors operating within your
                            establishment.
                        </li>
                        <li>
                            <strong>Payment Cycle:</strong> Payment for reservations made
                            through our platform will be processed on a 10-day cycle. Failure
                            to make timely payments may result in temporary suspension of your
                            restaurant's access to our reservation platform.
                        </li>
                        <li>
                            <strong>Liability Waiver:</strong> You understand and agree that
                            our reservation platform acts solely as a facilitator for booking
                            reservations and does not assume responsibility for illegal or
                            unauthorized activities.
                        </li>
                        <li>
                            <strong>Indemnification:</strong> You agree to indemnify and hold
                            harmless our reservation platform from any claims, damages,
                            liabilities, or expenses arising out of or related to your
                            restaurant's operations.
                        </li>
                        <li>
                            <strong>Data Privacy:</strong> You understand that customer
                            information collected through our platform will be used solely for
                            improving the dining experience.
                        </li>
                        <li>
                            <strong>Termination of Agreement:</strong> We reserve the right
                            to terminate our agreement with your restaurant at any time if you
                            have violated any of these terms and conditions.
                        </li>
                        <li>
                            <strong>Contact Information:</strong> For any inquiries or
                            assistance, please contact us at support.ubaky@gmail.com.
                        </li>
                    </ul>
                </div>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error('You must agree to the terms and conditions'))
                        }
                    ]}
                >
                    <Checkbox>
                        By registering your restaurant on our reservation platform, you
                        acknowledge that you have read, understood, and agree to abide by
                        these terms and conditions.
                    </Checkbox>
                </Form.Item>

                <div className="form-footer">
                    <Button onClick={onPrevious}>
                        Previous
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="button-details"
                    >
                        Finish <ArrowRightOutlined/>
                    </Button>
                </div>
            </Form>
        </div>
    );
}