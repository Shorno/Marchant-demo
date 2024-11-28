import { Outlet } from "react-router-dom";
import "./bookinglayout.css";
import { Steps } from "antd";
import logo from "../../../src/assets/ubaky_logo.png";
import bottomImg from "../../../src/assets/bottom-img.png";

const BookingLayout = () => {
    return (
        <div className="restarurant-container">
            <aside className="left-side">
                <div className="left-side-content">
                    <img className="logo" src={logo} alt="logo" />

                    <div>
                        <Steps
                            className="custom-steps"
                            direction="vertical"
                            current={2}
                            items={[
                                {
                                    title: "Owner Portfolio",
                                },
                                {
                                    title: "Restaurant Profile ",
                                },
                                {
                                    title: "Provide Service",
                                },
                                {
                                    title: "Location",
                                },
                                {
                                    title: "Gallery",
                                },
                                {
                                    title: "Agreement   ",
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className="bottom-img">
                    <img src={bottomImg} alt="" />
                </div>
            </aside>
            <div className="outlet-details">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default BookingLayout;
