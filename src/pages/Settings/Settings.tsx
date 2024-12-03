import { Typography} from 'antd';
import CalendarPage from './View/Calendar';
import TimeSlots from './View/TimeSlots';
import './Settings.css';

const { Title, Text } = Typography;

export default function Settings() {
    return (
        <div className="settings-container">
            <div className="settings-header">
                <Title level={2} className="settings-header-title">Settings</Title>
                <Text className="settings-header-description">
                    Manage your calendar and time slots below.
                </Text>
            </div>
            <div className="settings">
                <div className="calendar">
                    <CalendarPage />
                </div>
                <div className="timeSlot">          
                    <TimeSlots />
                </div>
            </div>
        </div>
    );
}

