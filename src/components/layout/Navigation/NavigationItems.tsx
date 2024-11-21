import {GetProp, MenuProps} from "antd";
import {
    ArrowRightOutlined,
    BellOutlined, CustomerServiceOutlined, FileTextOutlined,
    HomeOutlined,
    MobileOutlined, PercentageOutlined, SettingOutlined,
    UsergroupDeleteOutlined
} from "@ant-design/icons";

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const navigationItems: MenuItem[] = [
    {
        key: 'dashboard',
        icon: <HomeOutlined/>,
        label: 'Dashboard',
    },
    {
        key: 'notification',
        icon: <BellOutlined/>,
        label: 'Notification',
        children: [
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'logs',
                label: 'Logs',
            }
        ]
    },
    {
        key: 'app-settings',
        icon: <MobileOutlined/>,
        label: 'App Settings',
        children: [
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'settings',
                label: 'Settings',
            }
        ]
    },
    {
        key: 'membership',
        icon: <UsergroupDeleteOutlined/>,
        label: 'Membership',
        children: [
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'corporate-employee',
                label: 'Corporate Employee',
            },
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'user-profile',
                label: 'User Profile',
            }
        ]
    },
    {
        key: 'offers',
        icon: <PercentageOutlined/>,
        label: 'Offers',
        children: [
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'new-offers',
                label: 'New Offers',
            },
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'upcoming-offers',
                label: 'Upcoming Offers',
            }
        ]
    },
    {
        key: 'reports',
        icon: <FileTextOutlined/>,
        label: 'Reports',
        children: [
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'daily-report',
                label: 'Daily Report',
            },
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'monthly-report',
                label: 'Monthly Report',
            }
        ]
    },
    {
        key: 'admin',
        icon: <SettingOutlined/>,
        label: 'Admin',
        children: [
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'admin-settings',
                label: 'Admin Settings',
            },
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'edit-admin',
                label: 'Edit',
            }
        ]
    },
    {
        key: 'customer-service',
        icon: <CustomerServiceOutlined/>,
        label: 'Customer Service',
        children: [
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'customer-service-settings',
                label: 'Customer Service Settings',
            }
        ]
    },
];
