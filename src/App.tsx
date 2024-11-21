import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Settings from "./pages/Settings.tsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path={"/settings"} element={<Settings/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App
