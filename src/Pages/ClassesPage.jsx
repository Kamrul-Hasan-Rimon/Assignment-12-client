import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../hooks/axiosInstance";
import Swal from "sweetalert2";

const ClassesPage = () => {
  const navigate = useNavigate();

  const fetchClasses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const { data } = await axios.get("/classes");
    return data || [];
  };

  const fetchTrainers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
    const { data } = await axios.get("/trainers");
    return data.result || [];
  };

  const {
    data: classes = [],
    isLoading: isClassesLoading,
    error: classesError,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
    retry: false,
  });

  const {
    data: trainers = [],
    isLoading: isTrainersLoading,
    error: trainersError,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: fetchTrainers,
    retry: false,
  });

  if (
    classesError?.message === "No token found. Please log in." ||
    trainersError?.message === "No token found. Please log in."
  ) {
    Swal.fire({
      title: "Error",
      text: "Please log in to view classes and trainers.",
      icon: "error",
    }).then(() => {
      localStorage.removeItem("token");
      navigate("/login");
    });
    return null;
  }

  if (classesError || trainersError) {
    const status =
      classesError?.response?.status || trainersError?.response?.status;
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
        Error:{" "}
        {classesError?.message || trainersError?.message || "An error occurred"}
      </p>
    );
  }

  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 6;

  if (isClassesLoading || isTrainersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
      </div>
    );
  }

  if (!classes.length || !trainers.length) {
    return (
      <p className="text-center text-gray-300">
        No classes or trainers available.
      </p>
    );
  }

  const matchTrainersToClasses = (classes, trainers) => {
    return classes.map((cls) => ({
      ...cls,
      trainers: trainers
        .filter((trainer) => trainer.expertise?.includes(cls.name))
        .slice(0, 5),
    }));
  };

  const classesWithTrainers = matchTrainersToClasses(classes, trainers);

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classesWithTrainers.slice(
    indexOfFirstClass,
    indexOfLastClass
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-28 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text text-center mb-16">
          All Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentClasses.map((cls) => (
            <div
              key={cls._id}
              className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500"
            >
              <h3 className="text-2xl font-bold mb-4">{cls.name}</h3>
              <p className="text-gray-300 mb-6">{cls.description}</p>
              <div className="space-y-4">
                <h4 className="text-xl font-bold">Trainers</h4>
                {cls.trainers.length > 0 ? (
                  <div className="flex space-x-4">
                    {cls.trainers.map((trainer) => (
                      <Link
                        key={trainer._id}
                        to={`/trainers/trainerDetails/${trainer._id}`}
                        className="flex flex-col items-center"
                      >
                        <img
                          src={
                            trainer.profileImage ||
                            "https://via.placeholder.com/64"
                          }
                          alt={trainer.fullName || trainer.name}
                          className="w-16 h-16 object-cover rounded-full border-2 border-purple-500 shadow-lg hover:scale-110 transition-transform duration-300"
                        />
                        <p className="text-sm text-gray-300 mt-2">
                          {trainer.fullName || trainer.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">
                    Trainers are not available for this class.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          {Array.from(
            { length: Math.ceil(classesWithTrainers.length / classesPerPage) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-full font-semibold ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(128,90,213,0.5)]"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                } transition-all duration-300`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
