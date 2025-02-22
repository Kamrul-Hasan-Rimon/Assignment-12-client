import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-gradient-to-r from-white to-blue-900 shadow-lg backdrop-blur-lg border-b border-blue-500/30 text-gray-900 dark:text-white py-6 px-6 transition-all duration-300">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                
                {/* Logo - Elegant Dark Blue Gradient */}
                <div className="text-4xl font-extrabold tracking-wide">
                    <Link 
                        to="/" 
                        className="bg-gradient-to-r from-blue-700 to-blue-900 text-transparent bg-clip-text drop-shadow-lg hover:drop-shadow-[0_0_10px_rgba(30,58,138,0.8)] transition-all duration-300">
                         <i>FitTrac</i>
                    </Link>
                </div>

                {/* Navbar Links */}
                <div className="flex space-x-10 items-center text-lg font-semibold">
                    <Link to="/" className="hover:text-blue-700 transition duration-300">Home</Link>
                    <Link to="/trainers" className="hover:text-blue-700 transition duration-300">All Trainers</Link>
                    <Link to="/classes" className="hover:text-blue-700 transition duration-300">All Classes</Link>
                    <Link to="/community" className="hover:text-blue-700 transition duration-300">Community</Link>

                    {/* Conditional Rendering for Authenticated Users */}
                    {user && user?.email ? (
                        <>
                            
                            <Link to="/dashboard" className="hover:text-blue-700 transition duration-300">Dashboard</Link>
                            {/* User Profile & Dashboard */}
                            <Link to="/profile" className="flex items-center space-x-3 hover:text-blue-700 transition duration-300">
                                <img 
                                    src={user?.photoURL || '/default-profile.png'} 
                                    alt="Profile" 
                                    className="w-12 h-12 object-cover rounded-full border-2 border-blue-500 shadow-lg hover:scale-110 transition-transform duration-300" 
                                />
                                <span className="text-lg font-semibold">{user?.name}</span>
                            </Link>
                            {/* Logout Button - Premium Blue Glow */}
                            <button 
                                onClick={handleLogout} 
                                className="bg-gradient-to-r from-blue-600 to-blue-900 px-6 py-2 rounded-full font-semibold text-white shadow-[0_0_20px_rgba(30,58,138,0.5)] hover:shadow-[0_0_25px_rgba(30,58,138,0.8)] transition-all duration-300">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Login & Register - Soft Shadow Buttons */}
                            <Link to="/login" className="hover:text-blue-700 transition duration-300">Login</Link>
                            <Link 
                                to="/register" 
                                className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-6 py-2 rounded-full font-semibold shadow-[0_0_20px_rgba(30,58,138,0.8)] hover:shadow-[0_0_25px_rgba(30,58,138,1)] transition-all duration-300">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;