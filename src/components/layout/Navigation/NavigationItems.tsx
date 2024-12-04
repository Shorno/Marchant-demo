import {GetProp, MenuProps} from "antd";
import {
    AccountBookOutlined,
    ArrowRightOutlined,
    FileTextOutlined,
    HomeOutlined, KeyOutlined, MenuOutlined, StarOutlined,
    ToolOutlined,
    UserOutlined, VideoCameraAddOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom";

type MenuItem = GetProp<MenuProps, 'items'>[number];

export const navigationItems: MenuItem[] = [
    {
        key: 'dashboard',
        icon: <HomeOutlined/>,
        label: <Link to={"/"}>Dashboard</Link>
    },
    {
        key: 'menu&categories',
        icon: <MenuOutlined/>,
        label: 'Menu & Categories',
        children: [
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'menu',
                label: <Link to={"/menu"}>Menu</Link>
            },
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'special-menu',
                label: <Link to={"/special-menu"}>Special Menu</Link>

            },
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'discount-menu',
                label: <Link to={"/discount-menu"}>Discount Menu</Link>
            },
            {
                icon: <ArrowRightOutlined style={{fontSize: "14px"}}/>,
                key: 'buffet-menu',
                label: <Link to={"/buffet-menu"}>Buffet Menu</Link>
            }
        ]
    },
    {
        key: 'hall-recognition',
        icon: <KeyOutlined/>,
        label: <Link to={"/hall-recognition"}>Hall Recognition</Link>
    },
    {
        key: 'reviews',
        icon: <StarOutlined/>,
        label: <Link to={"/reviews"}>Reviews</Link>
    },
    {
        key: 'video',
        icon: <VideoCameraAddOutlined/>,
        label: <Link to={"/video"}>Video</Link>

    },
    {
        key: 'accounts',
        icon: <AccountBookOutlined/>,
        label: <Link to={"/accounts"}>Accounts</Link>
    },
    {
        key: 'information',
        icon: <FileTextOutlined/>,
        label: <Link to={"/information"}>Information</Link>
    },
    {
        key: 'settings',
        icon: <ToolOutlined/>,
        label: <Link to={"/settings"}>Settings</Link>
    },
    {
        key: 'my-profile',
        icon: <UserOutlined/>,
        label: <Link to={"/profile"}>My Profile</Link>
    },
];

