import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentForm = ({ bookingData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handlePayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            // Create a Payment Intent on the backend
            const response = await axios.post("http://localhost:4000/create-payment-intent", {
                amount: bookingData.price,
            });

            const { clientSecret } = response.data;

            // Confirm the payment on the frontend
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                Swal.fire({
                    title: "Payment Failed!",
                    text: error.message,
                    icon: "error",
                });
            } else if (paymentIntent.status === "succeeded") {
                // Save the booking data to the database
                const bookingResponse = await axios.post("http://localhost:4000/trainer/booking", {
                    ...bookingData,
                    paymentId: paymentIntent.id,
                });

                if (bookingResponse.data.insertedId) {
                    Swal.fire({
                        title: "Payment Successful!",
                        text: "Your booking has been confirmed.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    navigate("/success"); // Redirect to a success page after payment
                }
            }
        } catch (error) {
            console.error("Payment Error:", error.response?.data || error.message);
            Swal.fire({
                title: "Payment Error!",
                text: "An error occurred while processing your payment.",
                icon: "error",
            });
        }
    };

    return (
        <form onSubmit={handlePayment} className="space-y-6">
            {/* Card Details */}
            <div className="bg-gray-800 p-6 rounded-lg">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#ffffff",
                                "::placeholder": {
                                    color: "#a0aec0",
                                },
                            },
                        },
                    }}
                />
            </div>

            {/* Payment Button */}
            <button
                type="submit"
                disabled={!stripe}
                className="w-full px-10 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-lg rounded-xl transition-all duration-300 hover:from-yellow-500 hover:to-yellow-700 hover:shadow-yellow-500/50"
            >
                Proceed to Payment
            </button>
        </form>
    );
};

export default PaymentForm;