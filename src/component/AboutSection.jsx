const AboutSection = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Image */}
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="About Us"
                            className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl"></div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="space-y-8">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                            About Us
                        </h2>
                        <p className="text-lg text-gray-300">
                            At <span className="font-semibold text-purple-400">FlexFit</span>, we are dedicated to helping you achieve your fitness goals with personalized plans, expert trainers, and cutting-edge technology. Our mission is to empower you to transform your body and mind through a holistic approach to fitness.
                        </p>
                        <p className="text-lg text-gray-300">
                            With a team of certified trainers and state-of-the-art facilities, we provide a premium fitness experience tailored to your needs. Whether you're a beginner or a seasoned athlete, we have the tools and expertise to guide you every step of the way.
                        </p>
                        <div className="flex space-x-6">
                            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-3 rounded-full font-semibold text-white shadow-[0_0_20px_rgba(128,90,213,0.5)] hover:shadow-[0_0_30px_rgba(128,90,213,0.8)] transition-all duration-500">
                                Learn More
                            </button>
                            <button className="bg-gradient-to-r from-gray-700 to-gray-800 px-8 py-3 rounded-full font-semibold text-white border border-gray-600 hover:bg-gray-600 transition-all duration-500">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;