import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            activeBarHeight: 10,
                            itemBorderRadius: 0,
                            fontSize: 12,
                            itemHeight: 60,
                            itemSelectedBg: "rgba(214,214,214,0.7)",
                            itemMarginInline: 0,
                        },
                    },
                    token: {
                        fontFamily: "Poppins",
                    },
                }}
            >
                <App/>
            </ConfigProvider>
        </Provider>
    </StrictMode>,
)
