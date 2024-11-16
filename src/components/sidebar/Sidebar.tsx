import {
    ArrowRightOutlined,
    BellOutlined,
    HomeOutlined, LogoutOutlined,
    MobileOutlined,
    SettingOutlined,
    UsergroupDeleteOutlined,
} from '@ant-design/icons';
import {Divider, Menu} from 'antd';
import type {GetProp, MenuProps} from 'antd';
import "./sidebar.css"

type MenuItem = GetProp<MenuProps, 'items'>[number];

const Logout : MenuItem[] = [
    {
        key: 'logout',
        icon: <LogoutOutlined/>,
        label: 'Account Logout',
    }
]

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
        icon: <UsergroupDeleteOutlined/>,
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
        key: 'Admin Reports',
        icon: <UsergroupDeleteOutlined/>,
        label: 'Admin Reports',
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
        icon: <SettingOutlined/>,
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


export default function Sidebar() {


    return (
        <>
            <div className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div>
                        <div className="logo-container">
                            <img className="site-logo" src="/src/assets/site-logo.png" alt="site-logo"/>
                        </div>
                        <div className="user-banner">
                            <p className="user-name">rabiussanym</p>
                        </div>
                    </div>
                    <div className="menu-container">
                        <Menu
                            className="menu-items"
                            items={items}
                            mode="inline"
                            defaultActiveFirst={true}
                            defaultSelectedKeys={['dashboard']}
                        />
                    </div>
                </div>
                <div className="logout-section">
                    <Divider style={{padding: 0, margin: 0}}/>
                    <Menu
                        className="menu-items"
                        items={Logout}
                        mode="inline"
                        defaultActiveFirst={false}
                    />
                </div>
            </div>
        </>
    )
}
