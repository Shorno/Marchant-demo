import {Steps} from 'antd';
import {ReactNode} from "react";
import logo from "../../assets/ubaky_logo.png";
import bottomImg from "../../assets/bottom-img.png";
import "../../layouts/RestaurantBookingLayout/bookinglayout.css"


const steps = [
    {title: 'Get Started', description: 'Basic information'},
    {title: 'Restaurant Profile', description: 'Restaurant details'},
    {title: 'Provide Service', description: 'Service information'},
    {title: 'Location', description: 'Address details'},
    {title: 'Gallery', description: 'Upload images'},
    {title: 'Agreement', description: 'Terms & conditions'},
];

interface SignupLayoutProps {
    children: ReactNode;
    currentStep: number;
}

export default function SignupLayout({children, currentStep}: SignupLayoutProps) {
    return (
        <div className="restarurant-container">
            <aside className={"left-side"}>
                <div className={"left-side-content"}>
                    <img className="logo" src={logo} alt="logo"/>
                    <div>
                        <Steps
                            className={"custom-steps"}
                            direction="vertical"
                            current={currentStep}
                            items={steps}
                        />
                    </div>
                </div>
                <div className="bottom-img">
                    <img src={bottomImg} alt=""/>
                </div>
            </aside>
            <div className="outlet-details">
                {children}
            </div>
        </div>
    );
};