import {Menu} from 'antd';
import './Navigation.css';
import {navigationItems} from "./NavigationItems.tsx";
import "./Navigation.css"


interface NavigationProps {
    className?: string;
    onClose: () => void;
}


export const Navigation = ({className, onClose}: NavigationProps) => {

    const handleMenuItemClick = () => {
        onClose();
    }

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            items={navigationItems}
            className={`navigation-menu ${className}`}
            theme="light"
            onClick={handleMenuItemClick}

        />
    );
};