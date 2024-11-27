import {Breadcrumb, Layout, theme} from "antd";
import {Link} from "react-router-dom";
import ReviewsPageContent from "./ReviewsPageContent.tsx";

const {Content} = Layout;

const breadcrumbItems = [
    {
        title: <Link to={"/"}>Dashboard</Link>,
    },
    {
        title: 'Reviews',
    },
]


export default function Reviews() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const containerStyles = {
        background: colorBgContainer,
        minHeight: "85dvh",
        padding: 24,
        borderRadius: borderRadiusLG,

    }


    return (
        <>
            <Layout>
                <Content>
                    <Breadcrumb
                        style={{margin: '16px 0'}}
                        items={breadcrumbItems}
                    />
                    <div
                        style={containerStyles}
                    >
                        <ReviewsPageContent/>
                    </div>
                </Content>
            </Layout>
        </>
    )
}