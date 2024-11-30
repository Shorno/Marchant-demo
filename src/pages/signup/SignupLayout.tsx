import React, { useState } from 'react';
import { Layout, Steps } from 'antd';
import "./SignupLayout.css"
const { Content, Sider } = Layout;
const { Step } = Steps;

interface SignupLayoutProps {
    steps: { title: string; content: React.ComponentType<StepProps> }[];
    onFinish: (values: any) => void;
}

interface StepProps {
    onNext: (data: any) => void;
    onPrevious: () => void;
    isFirstStep: boolean;
    isLastStep: boolean;
    stepData: any;
}

const SignupLayout: React.FC<SignupLayoutProps> = ({ steps, onFinish }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});

    const handleNext = (stepData: any) => {
        setFormData({ ...formData, ...stepData });
        if (currentStep === steps.length - 1) {
            onFinish({ ...formData, ...stepData });
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const CurrentStepComponent = steps[currentStep].content;

    return (
        <Layout className="signup-layout">
            <Sider width={250} className="signup-sider">
                <div className="logo">
                    <div className="logo-icon"></div>
                    <span className="logo-text">Ubaky</span>
                </div>
                <Steps className={"custom-steps"} direction="vertical" current={currentStep}>
                    {steps.map((item, index) => (
                        <Step key={index} title={item.title} />
                    ))}
                </Steps>
            </Sider>
            <Content className="signup-content">
                <div className="signup-form-container">
                    <CurrentStepComponent
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        isFirstStep={currentStep === 0}
                        isLastStep={currentStep === steps.length - 1}
                        stepData={formData}
                    />
                </div>
            </Content>
        </Layout>
    );
};

export default SignupLayout;

