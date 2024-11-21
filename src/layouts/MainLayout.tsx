import {useState} from 'react';
import {Layout, Grid} from 'antd';
import {Header} from '../components/layout/Header/Header.tsx';
import {Sidebar} from '../components/layout/Sidebar/Sidebar.tsx';
import './MainLayout.css';
import {Outlet} from "react-router-dom";

const {Content} = Layout;
const {useBreakpoint} = Grid;


export default function MainLayout() {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    return (
        <Layout className="main-layout">
            <Header onToggleSidebar={toggleDrawer} isMobile={isMobile}/>
            <Sidebar
                isOpen={drawerVisible}
                isMobile={isMobile}
                onClose={() => setDrawerVisible(false)}
            />
            <Layout className={`site-layout ${isMobile ? '' : 'with-sidebar'}`}>
                <Content className="site-content">
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};