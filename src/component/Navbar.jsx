import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false); 
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-white to-blue-900 shadow-lg backdrop-blur-lg border-b border-blue-500/30 text-gray-900 dark:text-white py-4 px-4 sm:px-6 transition-all duration-300">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-3xl sm:text-4xl font-extrabold tracking-wide">
                    <Link 
                        to="/" 
                        className="bg-gradient-to-r from-blue-700 to-blue-900 text-transparent bg-clip-text drop-shadow-lg hover:drop-shadow-[0_0_10px_rgba(30,58,138,0.8)] transition-all duration-300">
                        <i>FlexFit</i>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 hover:text-blue-700 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex space-x-6 lg:space-x-10 items-center text-base lg:text-lg font-semibold">
                    <Link to="/" className="hover:text-blue-700 transition duration-300">Home</Link>
                    <Link to="/trainers" className="hover:text-blue-700 transition duration-300">Trainers</Link>
                    <Link to="/classes" className="hover:text-blue-700 transition duration-300">Classes</Link>
                    <Link to="/forumPage" className="hover:text-blue-700 transition duration-300">Community</Link>

                    {/* Conditional Rendering for Authenticated Users */}
                    {user && user?.email ? (
                        <>
                            <Link to="/dashboard" className="hover:text-blue-700 transition duration-300">Dashboard</Link>
                            {/* User Profile */}
                            <Link to="/profile" className="flex items-center space-x-2 hover:text-blue-700 transition duration-300">
                                <img 
                                    src={user?.photoURL || '/default-profile.png'} 
                                    alt="Profile" 
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-blue-500 shadow-lg hover:scale-110 transition-transform duration-300" 
                                />
                                <span className="hidden lg:inline text-lg font-semibold">{user?.name}</span>
                            </Link>
                            {/* Logout Button */}
                            <button 
                                onClick={handleLogout} 
                                className="bg-gradient-to-r from-blue-600 to-blue-900 px-4 py-1 sm:px-6 sm:py-2 rounded-full font-semibold text-white shadow-[0_0_20px_rgba(30,58,138,0.5)] hover:shadow-[0_0_25px_rgba(30,58,138,0.8)] transition-all duration-300">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-700 transition duration-300">Login</Link>
                            <Link 
                                to="/register" 
                                className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-full font-semibold shadow-[0_0_20px_rgba(30,58,138,0.8)] hover:shadow-[0_0_25px_rgba(30,58,138,1)] transition-all duration-300">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-2 py-4 px-4">
                    <div className="flex flex-col space-y-4">
                        <Link 
                            to="/" 
                            onClick={() => setIsMenuOpen(false)}
                            className="hover:text-blue-700 transition duration-300 py-2 border-b border-gray-200 dark:border-gray-700"
                        >
                            Home
                        </Link>
                        <Link 
                            to="/trainers" 
                            onClick={() => setIsMenuOpen(false)}
                            className="hover:text-blue-700 transition duration-300 py-2 border-b border-gray-200 dark:border-gray-700"
                        >
                            Trainers
                        </Link>
                        <Link 
                            to="/classes" 
                            onClick={() => setIsMenuOpen(false)}
                            className="hover:text-blue-700 transition duration-300 py-2 border-b border-gray-200 dark:border-gray-700"
                        >
                            Classes
                        </Link>
                        <Link 
                            to="/forumPage" 
                            onClick={() => setIsMenuOpen(false)}
                            className="hover:text-blue-700 transition duration-300 py-2 border-b border-gray-200 dark:border-gray-700"
                        >
                            Community
                        </Link>

                        {user && user?.email ? (
                            <>
                                <Link 
                                    to="/dashboard" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="hover:text-blue-700 transition duration-300 py-2 border-b border-gray-200 dark:border-gray-700"
                                >
                                    Dashboard
                                </Link>
                                <Link 
                                    to="/profile" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center space-x-3 hover:text-blue-700 transition duration-300 py-2 border-b border-gray-200 dark:border-gray-700"
                                >
                                    <img 
                                        src={user?.photoURL || '/default-profile.png'} 
                                        alt="Profile" 
                                        className="w-10 h-10 object-cover rounded-full border-2 border-blue-500 shadow-lg" 
                                    />
                                    <span>{user?.name}</span>
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-gradient-to-r from-blue-600 to-blue-900 w-full py-2 rounded-full font-semibold text-white shadow-[0_0_20px_rgba(30,58,138,0.5)] hover:shadow-[0_0_25px_rgba(30,58,138,0.8)] transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="hover:text-blue-700 transition duration-300 py-2 border-b border-gray-200 dark:border-gray-700"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="bg-gradient-to-r from-blue-500 to-blue-800 text-white w-full py-2 rounded-full font-semibold shadow-[0_0_20px_rgba(30,58,138,0.8)] hover:shadow-[0_0_25px_rgba(30,58,138,1)] transition-all duration-300 text-center"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;