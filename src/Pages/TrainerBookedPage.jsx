import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const TrainerBookedPage = () => {
    const trainer = useLoaderData();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const { user } = useContext(AuthContext)

    const [searchParams] = useSearchParams();
    const slotId = searchParams.get("slotId");

    const selectedSlot = trainer.availableSlots.find((slot) => slot.slotId === slotId);

    if (!selectedSlot) {
        return <div>Slot not found!</div>;
    }

    const packages = [
        {
            "name": "Basic Membership",
            "price": 10,
            "benefits": [
                "Access to gym facilities during regular operating hours.",
                "Use of cardio and strength training equipment.",
                "Access to locker rooms and showers."
            ]
        },
        {
            "name": "Standard Membership",
            "price": 50,
            "benefits": [
                "All benefits of the basic membership.",
                "Access to group fitness classes such as yoga, spinning, and Zumba.",
                "Use of additional amenities like a sauna or steam room."
            ]
        },
        {
            "name": "Premium Membership",
            "price": 100,
            "benefits": [
                "All benefits of the standard membership.",
                "Access to personal training sessions with certified trainers.",
                "Discounts on additional services such as massage therapy or nutrition counseling."
            ]
        }
    ];

    const handlePackageSelection = (pkg) => {
        setSelectedPackage(pkg);
    };

    const handleSubmit = async () => {
        if (selectedPackage) {
            const requestData = {
                trainerId: trainer._id,
                slotId,
                slotName: selectedSlot.slotName,
                packageName: selectedPackage.name,
                packagePrice: selectedPackage.price,
                userName: user?.displayName,
                userEmail: user?.email
            };

            console.log("Sending Data:", requestData); // Log data before sending

            try {
                const response = await axios.post("http://localhost:4000/trainer/booking", requestData
                );
                if (response.data.insertedId){
                                Swal.fire({
                                    title: "Success!",
                                    text: "Successfully data inserted.",
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                }else{
                          Swal.fire({
                                    title: "Success!",
                                    text: "Failed to insert data.",
                                    icon: "error",
                                });
                }
                console.log("Response:", response.data);
            } catch (error) {
                console.error("Error response:", error.response?.data || error.message);
            }
        }
    };

    return (
        <div className="min-h-screen px-28 bg-gradient-to-br from-black via-gray-900 to-black py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-6xl font-bold text-center mb-12 text-yellow-400">
                    Book {trainer.name}
                </h1>

                <div className="bg-black/50 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border-2 border-yellow-500/20">
                    <h2 className="text-3xl font-semibold text-white mb-6">
                        Selected Slot: <span className="text-yellow-400">{selectedSlot.slotName} - {selectedSlot.slotTime}</span>
                    </h2>

                    <h3 className="text-4xl font-bold text-white mb-8 text-center">
                        Choose Your <span className="text-yellow-400">Ultra-Premium</span> Package
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.map((pkg) => (
                            <div key={pkg.name} className={`p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 cursor-pointer ${selectedPackage === pkg ? "border-4 border-yellow-500" : ""}`} onClick={() => handlePackageSelection(pkg)}>
                                <h4 className="text-3xl font-bold text-yellow-400 mb-6">{pkg.name}</h4>
                                <p className="text-4xl font-bold text-white mb-6">${pkg.price}</p>
                                <ul className="text-gray-300 space-y-3">
                                    {pkg.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="text-yellow-400 mr-2">✔️</span> {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            to={'/payment'}
                            onClick={handleSubmit}
                            disabled={!selectedPackage}
                            className={`inline-block px-12 py-4 rounded-xl text-xl font-bold transition-all duration-300 ${selectedPackage ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
                        >
                            Confirm Selection
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerBookedPage;
