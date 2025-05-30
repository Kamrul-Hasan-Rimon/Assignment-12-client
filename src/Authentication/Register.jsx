import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const RegistrationPage = () => {
    const { register, authLoading } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoUrl.value;
        const password = e.target.password.value;

        // Photo URL validation
        if (photoURL && !photoURL.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i)) {
            setError("Please provide a valid image URL (jpg, png, gif, etc.)");
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                "Password must contain at least 6 characters, one uppercase, and one lowercase letter."
            );
            return;
        }

        try {
            // Register user
            const userCredential = await register(email, password);

            // Update profile with name and photoURL
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: photoURL || null,
            });

            // Navigate to login page
            navigate("/login");
            Swal.fire({
                title: "Success!",
                text: "Successfully Registered.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message);
            Swal.fire({
                title: "Error!",
                text: error.message || "Failed to register. Please try again.",
                icon: "error",
            });
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-900 to-blue-800 min-h-screen flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md space-y-6">
                {/* Logo or Branding */}
                <div className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-900">
                    <i>FlexFit</i>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-center font-medium animate-pulse">
                        {error}
                    </p>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            minLength={2}
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-all duration-300"
                            placeholder="Enter your full name"
                        />
                    </div>

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

                    {/* Photo URL Field */}
                    <div>
                        <label htmlFor="photoUrl" className="block text-lg font-semibold text-gray-700">Profile Photo URL (Optional)</label>
                        <input
                            type="url"
                            id="photoUrl"
                            name="photoUrl"
                            pattern="https?://.+\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?"
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-all duration-300"
                            placeholder="https://example.com/photo.jpg"
                        />
                        <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, GIF, SVG</p>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-lg font-semibold text-gray-700">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            required
                            minLength={6}
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-all duration-300 pr-10"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-11 text-gray-500 hover:text-indigo-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                        <p className="text-xs text-gray-500 mt-1">6+ characters with uppercase and lowercase</p>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={authLoading}
                        className={`w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 flex justify-center items-center ${authLoading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {authLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>

                {/* Already have an account? */}
                <div className="text-center text-sm text-gray-500 mt-4">
                    <span>Already have an account?</span>
                    <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium ml-1">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;