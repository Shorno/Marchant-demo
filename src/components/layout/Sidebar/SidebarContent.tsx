import { Logo } from "../../Icon/Logo.tsx";
import { Navigation } from "../Navigation/Navigation.tsx";
import { Menu, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const logoutItem = {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Logout',
    className: 'logout-item',
};

interface SidebarContentProps {
    onClose: () => void;
}


export default function SidebarContent({ onClose }: SidebarContentProps) {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        localStorage.removeItem("access");
        message.success("Logged out successfully!");
        navigate("/login");
        onClose();
    }

    return (
        <>
            <div className="sidebar-content">
                <Logo />
                <div className="restaurant-banner">
                    <p className={"restaurant-name"}>X Restaurant</p>
                </div>
                <div className={"navigation-container"}>
                    <Navigation onClose={onClose} />
                </div>
                <Menu
                    defaultActiveFirst={false}
                    mode="inline"
                    className="logout-menu"
                    items={[logoutItem]}
                    onClick={handleLogoutClick}
                />
            </div>
        </>
    )
}
