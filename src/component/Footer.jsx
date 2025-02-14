const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 px-28 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Column 1 - Logo and Description */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                            FitTrac
                        </h2>
                        <p className="text-gray-300">
                            Empowering you to achieve your fitness goals with personalized plans, expert trainers, and cutting-edge technology.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">
                                <i className="fab fa-facebook text-2xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">
                                <i className="fab fa-twitter text-2xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">
                                <i className="fab fa-instagram text-2xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">
                                <i className="fab fa-linkedin text-2xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-purple-400 transition duration-300">Home</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-purple-400 transition duration-300">Trainers</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-purple-400 transition duration-300">Classes</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-purple-400 transition duration-300">Community</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-purple-400 transition duration-300">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 - Newsletter */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Subscribe to Our Newsletter</h3>
                        <p className="text-gray-300">
                            Get the latest updates, fitness tips, and exclusive offers straight to your inbox.
                        </p>
                        <form className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 rounded-lg font-semibold text-white shadow-[0_0_20px_rgba(128,90,213,0.5)] hover:shadow-[0_0_30px_rgba(128,90,213,0.8)] transition-all duration-500"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Column 4 - Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-300">
                                <i className="fas fa-map-marker-alt mr-2 text-purple-400"></i>
                                123 Fitness Street, FitCity, FC 12345
                            </li>
                            <li className="text-gray-300">
                                <i className="fas fa-phone mr-2 text-purple-400"></i>
                                +1 (123) 456-7890
                            </li>
                            <li className="text-gray-300">
                                <i className="fas fa-envelope mr-2 text-purple-400"></i>
                                info@fittrac.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section - Copyright */}
                <div className="border-t border-gray-700 mt-12 pt-8 text-center">
                    <p className="text-gray-400">
                        &copy; {new Date().getFullYear()} FitTrac. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;