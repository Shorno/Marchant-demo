import {Layout} from 'antd';
import './Header.css';
import {MenuOutlined} from "@ant-design/icons";


interface HeaderProps {
    onToggleSidebar: () => void;
    isMobile: boolean;
}

export const Header = ({onToggleSidebar, isMobile}: HeaderProps) => {
    return (
        <Layout.Header className="app-header" style={{marginLeft: isMobile ? 0 : "272px"}}>
            {isMobile && (
                <button onClick={onToggleSidebar} className="menu-trigger">
                    <MenuOutlined style={{fontSize : "1.1rem"}}/>
                </button>
            )}
            <h2>Page Title</h2>
        </Layout.Header>
    );
};