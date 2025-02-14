import { useQuery } from '@tanstack/react-query';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const fetchUsers = async () => {
    const response = await fetch("http://localhost:4000/trainers");
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  };
  
const AllTrainersPage = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,  
        staleTime: 3000,
      });
    
      if (isLoading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
    

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                    Meet Our Trainers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-28">
                    {data.map((trainer) => (
                        <div
                            key={trainer._id}
                            className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 overflow-hidden"
                        >
                            <img
                                src={trainer.profileImage}
                                alt={trainer.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{trainer.name}</h3>
                                <p className="text-gray-300 mb-4">{trainer.bio}</p>
                                <div className="flex items-center space-x-4 mb-4">
                                    <span className="text-sm text-gray-400">Experience: {trainer.experience}</span>
                                    <span className="text-sm text-gray-400">Slots:  {trainer.availableSlots.length}</span>
                                </div>
                                <div className="flex space-x-4 mb-6">
                                    <a href={trainer.socialLinks.facebook} className="text-gray-400 hover:text-purple-400 transition duration-300">
                                        <FaFacebook className="w-6 h-6" />
                                    </a>
                                    <a href={trainer.socialLinks.twitter} className="text-gray-400 hover:text-purple-400 transition duration-300">
                                        <FaTwitter className="w-6 h-6" />
                                    </a>
                                    <a href={trainer.socialLinks.instagram} className="text-gray-400 hover:text-purple-400 transition duration-300">
                                        <FaInstagram className="w-6 h-6" />
                                    </a>
                                    <a href={trainer.socialLinks.linkedin} className="text-gray-400 hover:text-purple-400 transition duration-300">
                                        <FaLinkedin className="w-6 h-6" />
                                    </a>
                                </div>
                                <Link
                                    to={`/trainers/trainerDetails/${trainer._id}`} // Link to trainer details page
                                    className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 rounded-full font-semibold text-white shadow-[0_0_20px_rgba(128,90,213,0.5)] hover:shadow-[0_0_30px_rgba(128,90,213,0.8)] transition-all duration-500"
                                >
                                    Know More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllTrainersPage;