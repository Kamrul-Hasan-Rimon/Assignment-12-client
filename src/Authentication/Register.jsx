import { Link } from "react-router-dom";

const RegistrationPage = () => {
    const handleRegister = (e) => {
        e.preventDefault();

    };


    return (
        <div className="bg-gradient-to-r from-indigo-900 to-blue-800 min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-96 space-y-6">
                {/* Logo or Branding */}
                <div className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-900">
                    <i>FitTrac</i>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleRegister} className="space-y-6">
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
                    <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
