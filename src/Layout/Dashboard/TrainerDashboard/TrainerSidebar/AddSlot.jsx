import { useState, useEffect, useContext } from "react";
import axios from "../../../../hooks/axiosInstance";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../Context/AuthProvider";

const AddSlot = () => {
  const [formData, setFormData] = useState({
    days: [],
    slotName: "",
    slotTime: "",
  });
  const [trainerData, setTrainerData] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const response = await axios.get(`/users/${user?.email}`);
        setTrainerData(response.data.data);
      } catch (error) {
        console.error("Error fetching trainer data:", error);
      }
    };
    fetchTrainerData();
  }, []);

  const daysOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDaysChange = (selectedOptions) => {
    setFormData({
      ...formData,
      days: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      await axios.post("/trainer/slots", formData);
      Swal.fire({
        title: "Slot added successfully!",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });
      setFormData({
        days: [],
        slotName: "",
        slotTime: "",
      });
      navigate("/dashboard/manage-slots");
    } catch (error) {
      console.error("Error adding slot:", error);
      Swal.fire({
        title: "Failed to add slot!",
        text: error.response?.data?.message || "Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Slot</h2>
      {trainerData ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name:
            </label>
            <input
              id="fullName"
              type="text"
              value={trainerData.name || ""}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              type="text"
              value={trainerData.email || ""}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Days:
            </label>
            <Select
              isMulti
              options={daysOptions}
              onChange={handleDaysChange}
              value={daysOptions.filter((option) =>
                formData.days.includes(option.value)
              )}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="slotName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Slot Name:
            </label>
            <input
              id="slotName"
              type="text"
              name="slotName"
              value={formData.slotName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="slotTime"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Slot Time:
            </label>
            <input
              id="slotTime"
              type="text"
              name="slotTime"
              value={formData.slotTime}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Slot
            </button>
          </div>
        </form>
      ) : (
        <p>Loading trainer data...</p>
      )}
    </div>
  );
};

export default AddSlot;
