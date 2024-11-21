import {Layout, Drawer} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import SidebarContent from "./SidebarContent.tsx";
import './Sidebar.css';


const {Sider} = Layout;

interface SidebarProps {
    isOpen: boolean;
    isMobile: boolean;
    onClose: () => void;
}

export const Sidebar = ({isOpen, isMobile, onClose}: SidebarProps) => {


    if (isMobile) {
        return (
            <Drawer
                placement="left"
                onClose={onClose}
                open={isOpen}
                width={256}
                className="mobile-drawer"
                closeIcon={<CloseOutlined className="drawer-close-icon"/>}
                styles={{
                    header: {display: 'none'},
                    body: {padding: 0},
                }}
            >
                <SidebarContent/>
            </Drawer>
        );
    }

    return (
        <Sider
            theme={"light"}
            className="app-sidebar desktop"
            width={256}
        >
            <SidebarContent/>
        </Sider>

    );
};