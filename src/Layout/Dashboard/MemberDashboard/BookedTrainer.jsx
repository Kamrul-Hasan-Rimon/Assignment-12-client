import { useEffect, useState, useContext } from "react";
import axios from "../../../hooks/axiosInstance";
import { AuthContext } from "../../../Context/AuthProvider";

const BookedTrainer = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  console.log(bookings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const { data } = await axios.get(`/bookings/member/${user?.email}`, {
            
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err.message || "Failed to load booked trainers.");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchBookings();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <div className="text-2xl text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#0f3460] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 mb-8 text-center">
          Booked Trainers
        </h1>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-300">No trainers booked yet.</p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {bookings.map((booking, idx) => (
              <li key={idx} className="py-6 flex items-center space-x-6">
                <img
                  src={
                    booking.trainerImage ||
                    "https://via.placeholder.com/64"
                  }
                  alt={booking?.trainerName || "Trainer"}
                  className="w-16 h-16 rounded-full object-cover border-4 border-purple-500 shadow-lg"
                />
                <div>
                  <p className="text-xl text-white font-bold">
                    {booking.trainerName || "Unknown Trainer"}
                  </p>
                  <p className="text-gray-300">
                    {booking.bio || "No bio available"}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Slot:{" "}
                    <span className="font-semibold">
                      {booking.slotName || "N/A"}
                    </span>{" "}
                    | Time:{" "}
                    <span className="font-semibold">
                      {booking.slotTime || "N/A"}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookedTrainer;
