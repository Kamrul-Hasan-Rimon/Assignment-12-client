import { useContext, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const TrainerBookedPage = () => {
    const navigate = useNavigate();
    const trainer = useLoaderData();
    // console.log(trainer)
    const [selectedPackage, setSelectedPackage] = useState(null);
    const { user } = useContext(AuthContext);

    const [searchParams] = useSearchParams();
    const slotId = searchParams.get("slotId");

    const selectedSlot = trainer.availableSlots.find((slot) => slot.slotId === slotId);

    if (!selectedSlot) {
        return <div>Slot not found!</div>;
    }

    const packages = [
        { "name": "Basic Membership", "price": 10, "benefits": ["Access to gym facilities during regular operating hours.", "Use of cardio and strength training equipment.", "Access to locker rooms and showers."] },
        { "name": "Standard Membership", "price": 50, "benefits": ["All benefits of the basic membership.", "Access to group fitness classes such as yoga, spinning, and Zumba.", "Use of additional amenities like a sauna or steam room."] },
        { "name": "Premium Membership", "price": 100, "benefits": ["All benefits of the standard membership.", "Access to personal training sessions with certified trainers.", "Discounts on additional services such as massage therapy or nutrition counseling."] }
    ];

    const handlePackageSelection = (pkg) => {
        setSelectedPackage(pkg);
    };

    const handleConfirmSelection = () => {
        if (!selectedPackage) return;

        navigate(`/payment/${trainer._id}`, {
            state: {
                trainerId: trainer._id,
                bio: trainer.bio,
                trainerImage: trainer.profileImage,
                slotId: selectedSlot.slotId,
                trainerName: trainer.name,
                slotName: selectedSlot.slotName,
                slotTime: selectedSlot.slotTime,
                packageName: selectedPackage.name,
                price: selectedPackage.price,
                userName: user?.displayName,
                userEmail: user?.email
            }
        });
    };

    return (
        <div className="min-h-screen px-5 md:px-28 bg-gradient-to-br from-black via-gray-900 to-black py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-yellow-400">Book <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text"> {trainer.name}</span></h1>

                <div className="bg-black/50 backdrop-blur-2xl rounded-3xl p-6 md:p-10 shadow-2xl border-2 border-yellow-500/20">
                    <h2 className="text-xl md:text-3xl font-semibold text-white mb-6">
                        Selected Slot: <span className="text-yellow-400">{selectedSlot.slotName}</span>
                    </h2>

                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-8 text-center">
                        Choose Your <span className="text-yellow-400">Ultra-Premium</span> Package
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.name}
                                className={`p-6 md:p-8 rounded-3xl border-2 shadow-2xl transform hover:scale-105 transition-transform duration-500 cursor-pointer ${selectedPackage === pkg ? "border-4 border-yellow-500 bg-yellow-900/30" : "border-yellow-400"}`}
                                onClick={() => handlePackageSelection(pkg)}
                            >
                                <h4 className="text-xl md:text-3xl font-bold text-yellow-400 mb-4 md:mb-6">{pkg.name}</h4>
                                <p className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">${pkg.price}</p>
                                <ul className="text-gray-300 space-y-2 md:space-y-3">
                                    {pkg.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="text-yellow-400 mr-2">✔️</span> {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 md:mt-12 text-center">
                        <button
                            onClick={handleConfirmSelection}
                            disabled={!selectedPackage}
                            className={`inline-block px-8 md:px-12 py-3 md:py-4 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 ${selectedPackage ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
                        >
                            Confirm Selection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerBookedPage;
