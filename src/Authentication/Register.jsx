import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const RegistrationPage = () => {
    const { register } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const photoURL = e.target.photoUrl.value;
      const password = e.target.password.value;
  
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
          photoURL: photoURL,
        });
  
        // Navigate to login page
        navigate("/login");
        Swal.fire({
          title: "Success!",
          text: "Successfully Registered.",
          icon: "success",
        });
        
      } catch (error) {
        setError(error.message);
        Swal.fire({
          title: "Error!",
          text: "Failed to register. Please try again.",
          icon: "error",
        });
      }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-900 to-blue-800 min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-96 space-y-6">
                {/* Logo or Branding */}
                <div className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-900">
                    <i>FitTrac</i>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-center font-medium">
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
                        <label htmlFor="photoUrl" className="block text-lg font-semibold text-gray-700">Profile Photo URL</label>
                        <input 
                            type="url" 
                            id="photoUrl" 
                            name="photoUrl" 
                            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-all duration-300"
                            placeholder="Enter your profile photo URL"
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

                    {/* Register Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-500">
                        Register
                    </button>
                </form>

                {/* Already have an account? */}
                <div className="text-center text-sm text-gray-500 mt-4">
                    <span>Already have an account?</span> 
                    <Link to="/login" className="text-blue-600 hover:text-blue-800"> Login</Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
