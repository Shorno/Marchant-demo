import {Logo} from "../../shared/Logo.tsx";
import {Navigation} from "../Navigation/Navigation.tsx";
import {Menu} from "antd";
import {LogoutOutlined} from "@ant-design/icons";

const logoutItem = {
    key: 'logout',
    icon: <LogoutOutlined/>,
    label: 'Logout',
    className: 'logout-item',
};


export default function SidebarContent() {
    return (
        <>
            <div className="sidebar-content">
                <Logo/>
                <div className="restaurant-banner">
                    <p className={"restaurant-name"}>X Restaurant</p>
                </div>
                <div className={"navigation-container"}>
                    <Navigation/>
                </div>
                <Menu
                    defaultActiveFirst={false}
                    mode="inline"
                    className="logout-menu"
                    items={[logoutItem]}
                />
            </div>
        </>
    )
}
