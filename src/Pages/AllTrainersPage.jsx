import { useQuery } from "@tanstack/react-query";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "../hooks/axiosInstance";
import Swal from "sweetalert2";

const fetchTrainers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  const { data } = await axios.get("http://localhost:4000/trainers");
  console.log("Fetched trainers:", data);
  return data.result || [];
};

const AllTrainersPage = () => {
  const navigate = useNavigate();

  const {
    data: trainers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: fetchTrainers,
    staleTime: 3000,
    retry: false,
  });

  if (error?.message === "No token found. Please log in.") {
    Swal.fire({
      title: "Error",
      text: "Please log in to view trainers.",
      icon: "error",
    }).then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
    return null;
  }

  if (error) {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      Swal.fire({
        title: "Error",
        text: "Unauthorized access. Please log in again.",
        icon: "error",
      }).then(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
      return null;
    }
    return (
      <p className="text-center text-red-500">
        Error: {error.message || "An error occurred"}
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  if (!trainers.length) {
    return <p className="text-center text-gray-300">No trainers available.</p>;
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Meet Our Trainers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-28">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 overflow-hidden"
            >
              <img
                src={trainer.profileImage || "https://via.placeholder.com/300"}
                alt={trainer.fullName || "Trainer"}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {trainer.fullName || "Unknown Trainer"}
                </h3>
                <p className="text-gray-300 mb-4">
                  {trainer.bio || "No bio available"}
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-sm text-gray-400">
                    Experience: {trainer.experience || "Not specified"}
                  </span>
                </div>
                <div className="flex space-x-4 mb-6">
                  <a
                    href={trainer.socialLinks?.facebook || "#"}
                    className="text-gray-400 hover:text-purple-400 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a
                    href={trainer.socialLinks?.twitter || "#"}
                    className="text-gray-400 hover:text-purple-400 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a
                    href={trainer.socialLinks?.instagram || "#"}
                    className="text-gray-400 hover:text-purple-400 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a
                    href={trainer.socialLinks?.linkedin || "#"}
                    className="text-gray-400 hover:text-purple-400 transition duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                </div>
                <Link
                  to={`/trainers/trainerDetails/${trainer._id}`}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 rounded-full font-semibold text-white shadow-[0_0_20px_rgba(128,90,213,0.5)] hover:shadow-[0_0_30px_rgba(128,90,213,0.8)] transition-all duration-500"
                >
                  Know More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTrainersPage;
