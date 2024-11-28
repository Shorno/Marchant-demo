import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import './bookingbutton.css'

const BookingButton = () => {
    return (
        <div className="form-footer">
            <a href="#" className="previous">
                Previous Step
            </a>
            <Button className="button-details" htmlType="submit">
                Next <ArrowRightOutlined />
            </Button>
        </div>
    );
};

export default BookingButton;
