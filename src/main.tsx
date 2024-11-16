import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ConfigProvider} from "antd";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        activeBarHeight: 10,
                        itemBorderRadius: 0,
                        fontSize: 14,
                        itemHeight: 60,
                        itemSelectedBg: "rgba(214,214,214,0.7)",
                        itemMarginInline: 0,
                    },
                }
            }}
        >
            <App/>
        </ConfigProvider>
    </StrictMode>,
)
