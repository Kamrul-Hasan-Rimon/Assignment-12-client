import { useState, useEffect } from "react";
import axios from "../../../../hooks/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AllTrainers = () => {
  const [trainers, setTrainers] = useState([]);
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
          text: "Please log in to view trainers",
          icon: "error",
        });
        navigate("/login");
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get("/trainers");
        if (data.success !== true) {
          throw new Error(data.message || "Failed to fetch trainers");
        }
        setTrainers(data.result || []);
        setLoading(false);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          "Failed to fetch trainers. Please try again later.";
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

  const deleteTrainer = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/trainers/${id}`);
          setTrainers((prevTrainers) =>
            prevTrainers.filter((t) => t._id !== id)
          );
          Swal.fire("Deleted!", "The trainer has been deleted.", "success");
        } catch (err) {
          Swal.fire(
            "Error!",
            err.response?.data?.message ||
              "There was an issue deleting the trainer.",
            "error"
          );
        }
      }
    });
  };

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
      <h2 className="text-2xl font-bold mb-4 text-center">All Trainers</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.length > 0 ? (
            trainers.map((trainer) => (
              <tr key={trainer._id} className="text-center bg-white">
                <td className="border p-2">
                  {trainer.fullName || trainer.name}
                </td>
                <td className="border p-2">{trainer.email}</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteTrainer(trainer._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove Trainer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No trainers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllTrainers;
