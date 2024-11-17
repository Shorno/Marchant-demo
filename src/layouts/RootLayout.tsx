import {Layout} from "antd";
import Sidebar from "../components/sidebar/Sidebar.tsx";
import {Outlet} from "react-router-dom";

const {Content} = Layout

export default function RootLayout() {
    return (
        <Layout>
            <Sidebar/>
            <Layout>
                <Content style={{margin : "0 10px 0 10px"}}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    )
}