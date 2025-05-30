import { useContext, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; 

import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
    const { login, googleSignIn, setLoading } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleAuthSuccess = async (email) => {
        try {
            // Generate JWT token
            const tokenRes = await axios.post('http://localhost:4000/jwt', { email });
            const token = tokenRes.data.token;
            localStorage.setItem('token', token);

            // Fetch user data with token
            const userRes = await axios.get(`http://localhost:4000/users/${email}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const user = { email, role: userRes.data.data.role || 'member' };
            console.log('User data:', user?.role);

            return user;
        } catch (error) {
            if (error.response?.status === 404) {
                // Create new user
                await axios.post('http://localhost:4000/users', { email, role: 'member' });
                // Retry fetching user data
                const userRes = await axios.get(`http://localhost:4000/users/${email}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                const user = { email, role: userRes.data.data.role || 'member' };
                console.log('User data after creation:', user);
                return user;
            }
            console.error('Error generating JWT or fetching user:', error); 
            throw new Error(error.response?.data?.message || 'Failed to authenticate');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            setLoading(true);
            await login(email, password);
            await handleAuthSuccess(email);
            Swal.fire({
                title: "Success!",
                text: "Successfully logged in.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message || "Failed to login.",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await googleSignIn();
            const email = result.user.email;
            await handleAuthSuccess(email);
            Swal.fire({
                title: "Success!",
                text: "Successfully logged in with Google.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message || "Failed to login with Google.",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-900 to-blue-800 min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-96 space-y-6">
                <div className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-900">
                    <i>FlexFit</i>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-all duration-300"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            required
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-indigo-600 transition-all duration-300 pr-12 shadow-md hover:shadow-lg"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 p-1 rounded-full bg-white shadow hover:bg-indigo-100 transition-all duration-300 ease-in-out scale-100 hover:scale-110"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-indigo-700 transition-transform duration-300 rotate-0 hover:rotate-12" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-indigo-700 transition-transform duration-300 hover:rotate-12" />
                            )}
                        </button>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-500"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-500"
                    >
                        Sign In with Google
                    </button>
                </form>
                <div className="flex justify-between text-sm text-gray-500">
                    <Link to="/forgot-password" className="hover:text-blue-600">
                        Forgot Password?
                    </Link>
                    <Link to="/register" className="hover:text-blue-600">
                        Create an Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
