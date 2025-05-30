import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../hooks/axiosInstance";
import Swal from "sweetalert2";

const AppliedTrainers = () => {
  const [appliedTrainers, setAppliedTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        Swal.fire({
          title: "Error",
          text: "Please log in to view applied trainers",
          icon: "error",
        });
        navigate("/login");
        return;
      }
      try {
        const { data } = await axios.get("/applytrainer");
        setAppliedTrainers(data);
        setLoading(false);
      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to fetch applied trainers";
        setError(message);
        Swal.fire({
          title: "Error",
          text: message,
          icon: "error",
        });
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-lg font-semibold text-red-600">{error}</p>
    );
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Applied Trainers</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appliedTrainers.length > 0 ? (
            appliedTrainers.map((trainer) => (
              <tr key={trainer._id} className="text-center bg-white">
                <td className="border p-2">{trainer.fullName}</td>
                <td className="border p-2">{trainer.email}</td>
                <td className="border p-2">
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/admin/applied-trainers-details/${trainer._id}`
                      )
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No applied trainers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedTrainers;
