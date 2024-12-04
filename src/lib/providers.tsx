import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ConfigProvider } from "antd";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        fontSize: 14,
                        itemHeight: 50,
                    },
                }
            }}
        >
            <Provider store={store}>
                {children}
            </Provider>
        </ConfigProvider>
    );
};

export default Providers;