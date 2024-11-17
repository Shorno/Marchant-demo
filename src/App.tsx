import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path={"/"} element={<RootLayout/>}>
                        <Route path={"/"} element={<Dashboard/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
