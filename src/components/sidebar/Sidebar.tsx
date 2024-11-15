import {
    ArrowRightOutlined,
    BellOutlined,
    HomeOutlined,
    MobileOutlined,
    SettingOutlined,
    UsergroupDeleteOutlined,
} from '@ant-design/icons';
import {Menu} from 'antd';
import type {GetProp, MenuProps} from 'antd';



type MenuItem = GetProp<MenuProps, 'items'>[number];

const items: MenuItem[] = [
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
                icon: <ArrowRightOutlined/>,
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
                icon: <ArrowRightOutlined/>,
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
                icon: <ArrowRightOutlined/>,
                key: 'corporate-employee',
                label: 'Corporate Employee',
            },
            {
                icon: <ArrowRightOutlined/>,
                key: 'user-profile',
                label: 'User Profile',
            }
        ]

    },
    {
        key: 'offers',
        icon: <UsergroupDeleteOutlined/>,
        label: 'Offers',
        children: [
            {
                icon: <ArrowRightOutlined/>,
                key: 'new-offers',
                label: 'New Offers',
            },
            {
                icon: <ArrowRightOutlined/>,
                key: 'upcoming-offers',
                label: 'Upcoming Offers',
            }
        ]

    },
    {
        key: 'Admin Reports',
        icon: <UsergroupDeleteOutlined/>,
        label: 'Admin Reports',
        children: [
            {
                icon: <ArrowRightOutlined/>,
                key: 'daily-report',
                label: 'Daily Report',
            },
            {
                icon: <ArrowRightOutlined/>,
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
                icon: <ArrowRightOutlined/>,
                key: 'admin-settings',
                label: 'Admin Settings',
            },
            {
                icon: <ArrowRightOutlined/>,

                key: 'edit-admin',
                label: 'Edit',
            }
        ]

    },
    {
        key: 'customer-service',
        icon: <SettingOutlined/>,
        label: 'Customer Service',
        children: [
            {
                icon: <ArrowRightOutlined/>,
                key: 'customer-service-settings',
                label: 'Customer Service Settings',
            }
        ]

    },

];


export default function Sidebar() {


    return (
        <>
            <Menu
                style={{width: 256, height: "100vh", fontWeight: 600, boxShadow: "0 0 5px rgba(0,0,0,0.1)"}}
                items={items}
                mode={"inline"}
            />
        </>
    )
}
