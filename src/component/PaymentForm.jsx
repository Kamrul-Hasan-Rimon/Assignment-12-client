import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const PaymentForm = ({ bookingData }) => {
    // console.log(bookingData)
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // console.log("Stripe or Elements not loaded.");
            return;
        }

        if (!bookingData || !bookingData.price) {
            // console.log("Invalid booking data:", bookingData);
            Swal.fire({
                title: "Invalid Booking Data!",
                text: "Please provide valid booking details.",
                icon: "error",
            });
            return;
        }

        setLoading(true);
        // console.log("Starting payment process...");

        try {
            // Create a Payment Intent
            // console.log("Creating payment intent with amount:", bookingData.price);
            const response = await axios.post("https://server-alpha-three.vercel.app/create-payment-intent", {
                amount: bookingData.price,
            });

            if (!response.data || !response.data.clientSecret) {
                throw new Error("Failed to create payment intent.");
            }

            const { clientSecret } = response.data;

            // Confirm the payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) },
            });

            if (error) {
                console.error("Payment confirmation failed:", error.message);
                return (error.message);
            }

            if (paymentIntent.status === "succeeded") {
                // console.log("Payment succeeded. Payment intent:", paymentIntent);

                // Save the booking data
                // console.log("Saving booking data to the server...");
                const bookingResponse = await axios.post("https://server-alpha-three.vercel.app/trainer/booking", {
                    ...bookingData,
                    paymentId: paymentIntent.id,
                    bookingDate: new Date(),
                });
                if (!bookingResponse.data.insertedId) {
                    throw new Error("Failed to save booking details.");
                }
                Swal.fire({
                    title: "Payment Successful!",
                    text: "Your booking has been confirmed.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                });

                // navigate("/success", { state: { bookingId: bookingResponse.data.insertedId } });
            }
        } catch (error) {
            console.error("Payment Error:", error.response?.data || error.message);
            Swal.fire({
                title: "Payment Error!",
                text: error.message || "An error occurred while processing your payment.",
                icon: "error",
            });
        } finally {
            // console.log("Payment process completed.");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handlePayment} className="space-y-6 p-6 bg-white shadow-lg rounded-xl w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Secure Payment</h2>

            {/* Card Element */}
            <div className="p-4 border rounded-lg bg-gray-100">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#333",
                                "::placeholder": { color: "#888" },
                            },
                            invalid: {
                                color: "#e5424d",
                            },
                        },
                        disabled: loading,
                    }}
                />
            </div>

            {/* Payment Button */}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-lg rounded-xl transition duration-300 hover:from-yellow-500 hover:to-yellow-700 hover:shadow-lg disabled:opacity-50"
            >
                {loading ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Processing...
                    </div>
                ) : (
                    "Proceed to Payment"
                )}
            </button>

            {/* Cancel Button */}
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full px-6 py-3 bg-gray-300 text-gray-800 font-bold text-lg rounded-xl transition duration-300 hover:bg-gray-400 hover:shadow-lg"
            >
                Cancel
            </button>
        </form>
    );
};

export default PaymentForm;