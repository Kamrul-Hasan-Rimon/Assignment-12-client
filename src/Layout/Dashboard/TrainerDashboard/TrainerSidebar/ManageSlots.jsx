import { useState, useEffect, useContext } from "react";
import axios from "../../../../hooks/axiosInstance";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const ManageSlots = () => {
  const [slots, setSlots] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const { data } = await axios.get(`/slots/trainer/${user?.email}`);
        setSlots(data?.data || []);
      } catch (error) {
        if (
          error.message === "No token found. Please log in." ||
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Please log in to view your slots.",
          }).then(() => {
            localStorage.removeItem("token");
            navigate("/login");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text:
              error.response?.data?.message ||
              "Failed to load slots. Please try again later.",
          });
        }
      }
    };

    if (user?.email) {
      fetchSlots();
    }
  }, [user?.email, navigate]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        await axios.delete(`/slots/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSlots((prevSlots) => prevSlots.filter((slot) => slot.slotId !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The slot has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Unauthorized access. Please log in again.",
          }).then(() => {
            localStorage.removeItem("token");
            navigate("/login");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: error.response?.data?.message || "Failed to delete the slot.",
          });
        }
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Slots</h2>
      {slots.length === 0 ? (
        <p className="text-center text-gray-600">No slots available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Slot Name</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Booked By</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.slotId} className="text-center">
                <td className="border p-2">
                  {slot.slotName || "Unnamed Slot"}
                </td>
                <td className="border p-2">
                  {slot.slotTime || "Not specified"}
                </td>
                <td className="border p-2">
                  {slot.bookedBy?.userName || "Not Booked"}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(slot.slotId)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageSlots;
