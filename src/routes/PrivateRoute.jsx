import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoute = () => {
    const { user } = useContext(AuthContext);

    return user && user?.email ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
