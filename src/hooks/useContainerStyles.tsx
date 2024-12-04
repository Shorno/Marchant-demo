import {theme} from "antd";

export default function useContainerStyles() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return {
        background: colorBgContainer,
        minHeight: "90dvh",
        padding: 24,
        borderRadius: borderRadiusLG,
    };
}