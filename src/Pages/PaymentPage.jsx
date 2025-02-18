const PaymentPage = () => {
    const bookingDetails = {
        trainerName: "John Doe",
        slotName: "2023-10-25 - 9:00 AM",
        packageName: "Premium Membership",
        price: 100,
    };

    const user = {
        name: "Jane Smith",
        email: "jane.smith@example.com",
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text text-center mb-16">
                    Payment
                </h2>

                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto">
                    {/* Display Booking Details */}
                    <div className="space-y-4 mb-8">
                        <h3 className="text-2xl font-bold">Booking Details</h3>
                        <p><strong>Trainer:</strong> {bookingDetails.trainerName}</p>
                        <p><strong>Slot:</strong> {bookingDetails.slotName}</p>
                        <p><strong>Package:</strong> {bookingDetails.packageName}</p>
                        <p><strong>Price:</strong> ${bookingDetails.price}</p>
                    </div>

                    {/* Display User Info */}
                    <div className="space-y-4 mb-8">
                        <h3 className="text-2xl font-bold">Your Information</h3>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>

                    {/* Placeholder for Stripe Card Element */}
                    <div className="bg-gray-800 p-6 rounded-lg mb-8">
                        <div className="h-12 bg-gray-700 rounded-lg"></div>
                    </div>

                    {/* Pay Button */}
                    <button
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 px-10 py-3 rounded-full font-semibold text-white text-lg shadow-[0_0_25px_rgba(128,90,213,0.5)] hover:shadow-[0_0_35px_rgba(128,90,213,0.8)] transition-all duration-500 w-full"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;