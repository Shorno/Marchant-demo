import {Menu} from 'antd';
import './Navigation.css';
import {navigationItems} from "./NavigationItems.tsx";
import "./Navigation.css"


interface NavigationProps {
    className?: string;
}


export const Navigation = ({className}: NavigationProps) => {
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            items={navigationItems}
            className={`navigation-menu ${className}`}
            theme="light"
        />
    );
};