import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Providers from './lib/providers.tsx';
import {ConfigProvider} from "antd";
import {configProviderSettings} from "./configProviderSettings.ts";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Providers>
            <ConfigProvider {...configProviderSettings}>
                <App />
            </ConfigProvider>
        </Providers>
    </StrictMode>,
)
