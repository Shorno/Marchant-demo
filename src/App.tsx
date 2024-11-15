import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Sidebar from "./components/sidebar/Sidebar.tsx";

function App() {

    return (
        <>
            <Router>
                <Sidebar/>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/new"} element={<h1>This is new Route</h1>} />
                </Routes>
            </Router>
        </>
    )
}

export default App
