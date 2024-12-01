import  {ComponentType, useState} from "react";
import {Layout, Steps} from "antd";
import "./SignupLayout.css";
const {Content} = Layout;
const {Step} = Steps;
import img from "../../assets/ubaky_logo.png";
import bottomImg from "../../assets/bottom-img.png";

interface SignupLayoutProps {
    steps: { title: string; content: ComponentType<StepProps> }[];
    onFinish: (values: any) => void;
}

interface StepProps {
    onNext: (data: any) => void;
    onPrevious: () => void;
    stepData: any;
}

export default function SignupLayout({steps, onFinish}: SignupLayoutProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});

    const handleNext = (stepData: any) => {
        setFormData({...formData, ...stepData});
        if (currentStep === steps.length - 1) {
            onFinish({...formData, ...stepData});
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const CurrentStepComponent = steps[currentStep].content;

    return (
        <div className="restarurant-container">
            <aside className="left-side">
                <div className="left-side-content">
                    <img className={"logo"} src={img} alt="ubaky-logo"/>
                    <div>
                        <Steps
                            direction={"vertical"}
                            className={"custom-steps"}
                            current={currentStep}
                        >
                            {steps.map((item, index) => (
                                <Step key={index} title={item.title}/>
                            ))}
                        </Steps>
                    </div>
                </div>
                <div className="bottom-img">
                    <img src={bottomImg} alt=""/>
                </div>
            </aside>
            <Content className="outlet-details ">
                <CurrentStepComponent
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    stepData={formData}
                />
            </Content>
        </div>
    );
}
