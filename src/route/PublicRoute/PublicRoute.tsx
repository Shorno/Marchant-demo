import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
    children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const isAuthenticated = Boolean(localStorage.getItem("access"));
    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
