import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import Swal from "sweetalert2";
import toast from 'react-hot-toast'
const Login = () => {
    const { login, googleSignIn, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            login(email, password);
            navigate("/");
            Swal.fire({
                title: "Success!",
                text: "Successfully login.",
                icon: "success"
            });
            setLoading(false)
        } catch {
            Swal.fire({
                title: "Success!",
                text: "Failed to login.",
                icon: "error",
            });

        }

    };
    const handleGoogleLogin = async () => {
        try {
            const res = await googleSignIn();
            console.log(res)

            navigate("/");
            toast.success('Successfully Google login')
        } catch (error) {
            toast.error("Google Sign-In failed:", error.message);
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-900 to-blue-800 min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-96 space-y-6">
                {/* Logo or Branding */}
                <div className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-900">
                    <i>FitTrac</i>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-all duration-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-lg font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-all duration-300"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-500">
                        Login
                    </button>
                    {/* Google Login Button */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-500">
                        Sign Up with Google
                    </button>
                </form>

                {/* Register & Forgot Password Links */}
                <div className="flex justify-between text-sm text-gray-500">
                    <Link to="/forgot-password" className="hover:text-blue-600">Forgot Password?</Link>
                    <Link to="/register" className="hover:text-blue-600">Create an Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
