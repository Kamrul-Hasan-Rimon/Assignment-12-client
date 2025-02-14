import { FaDumbbell, FaUserFriends, FaChartLine } from 'react-icons/fa';

const FeaturedSection = () => {
    const features = [
        {
            icon: <FaDumbbell className="w-16 h-16 text-white" />,
            title: 'Personalized Plans',
            description: 'Tailored fitness plans to meet your goals.',
            gradient: 'from-purple-600 to-indigo-600',
        },
        {
            icon: <FaUserFriends className="w-16 h-16 text-white" />,
            title: 'Expert Trainers',
            description: 'Certified trainers to guide you.',
            gradient: 'from-pink-600 to-rose-600',
        },
        {
            icon: <FaChartLine className="w-16 h-16 text-white" />,
            title: 'Progress Tracking',
            description: 'Track your progress with advanced analytics.',
            gradient: 'from-teal-600 to-cyan-600',
        },
    ];

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className={`bg-gradient-to-r ${feature.gradient} p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500`}
                        >
                            <div className="flex justify-center">
                                <div className="p-6 bg-black/20 rounded-full backdrop-blur-md">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mt-6">{feature.title}</h3>
                            <p className="mt-4 text-gray-200">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedSection;