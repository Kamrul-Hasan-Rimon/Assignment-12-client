import { Link, useLoaderData, useParams } from "react-router-dom";

const TrainerDetailsPage = () => {
    const trainer = useLoaderData();
    console.log(trainer);
    const trainerid = useParams()
    console.log(trainerid)

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-28 text-white py-20">
            <div className="container mx-auto px-4">
                {/* Be A Trainer Section */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-6">
                        Be A Trainer
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                        Join our elite team of fitness professionals and inspire others to achieve their goals. Share your expertise and make a difference in the fitness community.
                    </p>
                    <Link
                        to="/BeATrainerPage"
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 px-10 py-4 rounded-full font-semibold text-white text-lg shadow-[0_0_25px_rgba(128,90,213,0.5)] hover:shadow-[0_0_35px_rgba(128,90,213,0.8)] transition-all duration-500"
                    >
                        Become a Trainer
                    </Link>
                </div>

                {/* Trainer Information Section */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-2xl p-10 mb-20 transform hover:scale-101 transition-transform duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Trainer Photo */}
                        <div className="flex justify-center ml-6 md:justify-start">
                            <img
                                src={trainer.profileImage}
                                alt={trainer.name}
                                className="w-72 h-72 rounded-full object-cover border-4 border-purple-500 shadow-2xl transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Trainer Details */}
                        {/* Trainer Details */}
                        <div className="col-span-2 space-y-8">
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                                {trainer.name}
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">

                            </p>

                            {/* Expertise Section */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Expertise</h3>
                                    <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
                                        {trainer.expertise.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Qualifications Section */}
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">Qualifications</h3>
                                    <p>{trainer.qualification}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Slots Section */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-2xl p-10">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text mb-10">
                        Available Slots
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {trainer.availableSlots.map((slot) => (
                            <Link
                                key={slot.slotId}
                                to={`/trainers/${trainer._id}/book?slotId=${slot.slotId}`}
                                className="bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-6 rounded-2xl text-center text-white font-semibold text-lg shadow-[0_0_25px_rgba(128,90,213,0.5)] hover:shadow-[0_0_35px_rgba(128,90,213,0.8)] transform hover:scale-105 transition-all duration-500"
                            >
                                <p className="text-xl">{slot.slotName}</p>
                                <p className="text-sm mt-2">{slot.slotTime}</p>
                            </Link>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerDetailsPage;