import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import  { Toaster } from 'react-hot-toast'
const MainLayout = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800">
            <Toaster  position="top-right" />
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;