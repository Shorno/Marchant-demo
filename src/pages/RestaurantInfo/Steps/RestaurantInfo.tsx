import { useState } from 'react';
import { Steps, Button, message } from 'antd';
import logo from "../../../../src/assets/ubaky_logo.png";
import RestaurantInfoForm from './RestaurantBookingInfo/RestaurantInfoForm';
import ProvideService from './ProvideService/ProvideService';
import Location from './Location/Location';
import Gallery from './Gallery/Gallery';
import Agreement from './Agreement/Agreement';
import './RestaurantInfo.css';

const { Step } = Steps;

const steps = [
    { title: 'Restaurant Information', children: <RestaurantInfoForm /> },
    { title: 'Provide Service', children: <ProvideService /> },
    { title: 'Location', children: <Location /> },
    { title: 'Gallery', children: <Gallery /> },
    { title: 'Agreement', children: <Agreement /> },
];

const RestaurantInfo = () => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    return (
        <div className="steps-container">
            <div className="steps-sidebar">
                <img className="logo" src={logo} alt="logo" />
                <Steps direction="vertical" current={current}>
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                {/* //bottom image */}
            </div>
            <div className="steps-content-container">
                <div className="steps-content">{steps[current].children}</div>
                <div className="steps-action">
                    {current > 0 && (
                        <Button className="custom-button" onClick={prev}>
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 ? (
                        <Button className="custom-button" type="default" onClick={next}>
                            Next
                        </Button>
                    ) : (
                        <Button type="default" className="custom-button" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantInfo;
