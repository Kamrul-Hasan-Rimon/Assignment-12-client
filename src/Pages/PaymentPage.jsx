import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements} from "@stripe/react-stripe-js";
import PaymentForm from "../component/PaymentForm";


// Load Stripe.js
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_STRIPE_GATEWAY);


const PaymentPage = () => {
  const location = useLocation();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="bg-black/50 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border-2 border-yellow-500/20 text-center">
          <p className="text-2xl text-red-500 font-bold">
            No package selected! Please go back and select a package.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="bg-black/50 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border-2 border-yellow-500/20 text-center max-w-2xl w-full">
        {/* Header */}
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-8">
          Confirm Your Payment
        </h2>

        {/* Booking Details */}
        <div className="space-y-6 text-left mb-8">
          <div className="flex justify-between items-center border-b border-yellow-500/20 pb-4">
            <p className="text-xl text-white font-semibold">Trainer:</p>
            <p className="text-xl text-yellow-400">{bookingData.trainerName}</p>
          </div>
          <div className="flex justify-between items-center border-b border-yellow-500/20 pb-4">
            <p className="text-xl text-white font-semibold">Slot:</p>
            <p className="text-xl text-yellow-400">{bookingData.slotName}</p>
          </div>
          <div className="flex justify-between items-center border-b border-yellow-500/20 pb-4">
            <p className="text-xl text-white font-semibold">Package:</p>
            <p className="text-xl text-yellow-400">{bookingData.packageName}</p>
          </div>
          <div className="flex justify-between items-center border-b border-yellow-500/20 pb-4">
            <p className="text-xl text-white font-semibold">Price:</p>
            <p className="text-xl text-yellow-400">${bookingData.price}</p>
          </div>
          <div className="flex justify-between items-center border-b border-yellow-500/20 pb-4">
            <p className="text-xl text-white font-semibold">Your Name:</p>
            <p className="text-xl text-yellow-400">{bookingData.userName}</p>
          </div>
          <div className="flex justify-between items-center border-b border-yellow-500/20 pb-4">
            <p className="text-xl text-white font-semibold">Your Email:</p>
            <p className="text-xl text-yellow-400">{bookingData.userEmail}</p>
          </div>
        </div>

        {/* Stripe Payment Form */}
        <Elements stripe={stripePromise}>
          <PaymentForm bookingData={bookingData} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;