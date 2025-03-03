import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Signup from "./pages/Auth/Registration/Signup.tsx";
import Menu from "./pages/Menu&Category/Menu/Menu.tsx";
import SpecialMenu from "./pages/Menu&Category/SpecialMenu/SpecialMenu.tsx";
import DiscountMenu from "./pages/Menu&Category/DiscountMenu/DiscountMenu.tsx";
import BuffetMenu from "./pages/Menu&Category/BuffetMenu/BuffetMenu.tsx";
import HallRecognition from "./pages/HallRecognition/HallRecognition.tsx";
import Accounts from "./pages/Accounts/Accounts.tsx";
import Information from "./pages/Information/Information.tsx";
import MyProfile from "./pages/Profile/MyProfile.tsx";
import Video from "./pages/Video/Video.tsx";
import Login from "./pages/Auth/login/Login.tsx";
import RestaurantInfo from "./pages/RestaurantInfo/Steps/RestaurantInfo.tsx";
import MainLayout from "./layouts/Main/MainLayout.tsx";
import PrivateRoute from "./route/PrivateRoute/PrivateRoute.tsx";
import PublicRoute from "./route/PublicRoute/PublicRoute.tsx";
import Settings from "./pages/Settings/Settings.tsx";
import ReviewPage from "./pages/Reviews/index.tsx";
import Reservation from "./pages/Panel/Reservation/Reservation.tsx";

function App() {
    return (
        <Router>
            <Routes>
                {/* Redirect the root route to /login */}
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/registration" element={<PublicRoute><Signup /></PublicRoute>} />

                {/* Private Routes */}
                <Route path="/" element={<PrivateRoute><RestaurantInfo /></PrivateRoute>} />
                <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path={"/table-reservation"} element={<Reservation/>} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/special-menu" element={<SpecialMenu />} />
                    <Route path="/discount-menu" element={<DiscountMenu />} />
                    <Route path="/buffet-menu" element={<BuffetMenu />} />
                    <Route path="/hall-recognition" element={<HallRecognition />} />
                    <Route path="/reviews" element={<ReviewPage/>} />
                    <Route path="/video" element={<Video />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/information" element={<Information />} />
                    <Route path="/settings" element={<Settings/>} />
                    <Route path="/profile" element={<MyProfile />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
