import {Breadcrumb, Layout} from "antd";
import useContainerStyles from "../hooks/useContainerStyles.tsx";
import {ReactNode} from "react";

const {Content} = Layout;

interface ContentLayoutProps {
    breadcrumbItems: { title: ReactNode }[];
    children: ReactNode;
}

export default function ContentLayout({breadcrumbItems, children}: ContentLayoutProps) {
    const containerStyles = useContainerStyles();

    return (
        <Layout>
            <Content>
                <Breadcrumb
                    style={{margin: '16px 0'}}
                    items={breadcrumbItems}
                />
                <div
                    style={containerStyles}
                >
                    {children}
                </div>
            </Content>
        </Layout>
    );
}