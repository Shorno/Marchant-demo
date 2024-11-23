import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Signup from "./pages/Registration/Signup.tsx";
import Menu from "./pages/Menu&Category/Menu/Menu.tsx";
import SpecialMenu from "./pages/Menu&Category/SpecialMenu/SpecialMenu.tsx";
import DiscountMenu from "./pages/Menu&Category/DiscountMenu/DiscountMenu.tsx";
import BuffetMenu from "./pages/Menu&Category/BuffetMenu/BuffetMenu.tsx";
import HallRecognition from "./pages/HallRecognition/HallRecognition.tsx";
import Reviews from "./pages/Reviews/Reviews.tsx";
import Accounts from "./pages/Accounts/Accounts.tsx";
import Information from "./pages/Information/Information.tsx";
import MyProfile from "./pages/Profile/MyProfile.tsx";
import Video from "./pages/Video/Video.tsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<MainLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path={"/menu"} element={<Menu/>}/>
                    <Route path={"/special-menu"} element={<SpecialMenu/>}/>
                    <Route path={"/discount-menu"} element={<DiscountMenu/>}/>
                    <Route path={"/buffet-menu"} element={<BuffetMenu/>}/>
                    <Route path={"/hall-recognition"} element={<HallRecognition/>}/>
                    <Route path={"/reviews"} element={<Reviews/>}/>
                    <Route path={"/video"} element={<Video/>}/>
                    <Route path={"/accounts"} element={<Accounts/>}/>
                    <Route path={"/information"} element={<Information/>}/>
                    <Route path={"/profile"} element={<MyProfile/>}/>
                </Route>
                <Route path={"/registration"} element={<Signup></Signup>}/>
            </Routes>
        </Router>
    )
}

export default App
