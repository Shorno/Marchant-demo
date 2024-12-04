import { Layout } from 'antd';
import './Header.css';
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { formatPathToTitle } from "../../../utils/getPageTitle.ts";

interface HeaderProps {
    onToggleSidebar: () => void;
    isMobile: boolean;
}

export const Header = ({ onToggleSidebar, isMobile }: HeaderProps) => {
    const { pathname } = useLocation();
    const title = formatPathToTitle(pathname);

    return (
        <Layout.Header className="app-header" style={{ marginLeft: isMobile ? 0 : "270px" }}>
            {isMobile && (
                <button
                    onClick={onToggleSidebar}
                    className="menu-trigger"
                    aria-label="Toggle Sidebar"
                    title="Toggle Sidebar"
                >
                    <MenuOutlined style={{ fontSize: "1.1rem", color: 'rgb(255, 181, 44)' }} />
                </button>
            )}
            <h2>{title}</h2>
        </Layout.Header>
    );
};
