import { Outlet } from "react-router-dom";
import "./restaurentbookinglayout.css";
import { Steps } from "antd";

const BookingLayout = () => {
    return (
        <div>
            <aside>
                <div>
                    <Steps
                        direction="vertical"
                        current={2}
                        items={[
                            {
                                title: "Finished",
                               
                            },
                            {
                                title: "I",
                               
                            },
                            {
                                title: "Waiting",
                                
                            },
                            {
                                title: "Waiting",
                                
                            },
                            {
                                title: "Waiting",
                                
                            },
                            {
                                title: "Waiting",
                                
                            },
                        ]}
                    />
                </div>
                <div className="test"></div>
            </aside>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default BookingLayout;
