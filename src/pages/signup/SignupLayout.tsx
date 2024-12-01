import React, { useState } from "react";
import { Layout, Steps } from "antd";
import "./SignupLayout.css";
const { Content } = Layout;
const { Step } = Steps;
import img from "../../assets/ubaky_logo.png";
import bottomImg from "../../assets/bottom-img.png";


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
        <Layout className=" restarurant-container">
            <aside className="left-side">
                <div className="left-side-content">
                    <img src={img} alt="" />
                    <div>
                        <Steps
                            className={"custom-steps"}
                            direction="vertical"
                            current={currentStep}
                        >
                            {steps.map((item, index) => (
                                <Step key={index} title={item.title} />
                            ))}
                        </Steps>
                    </div>
                </div>
                <div className="bottom-img">
                    <img src={bottomImg} alt="" />
                </div>
            </aside>
            <Content className="outlet-details">
                <CurrentStepComponent
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    isFirstStep={currentStep === 0}
                    isLastStep={currentStep === steps.length - 1}
                    stepData={formData}
                />
            </Content>
        </Layout>
    );
};

export default SignupLayout;
