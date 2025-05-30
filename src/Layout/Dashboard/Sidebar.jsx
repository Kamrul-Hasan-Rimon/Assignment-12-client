import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../hooks/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { user: contextUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", contextUser?.email],
    queryFn: async () => {
      if (!contextUser?.email) {
        throw new Error("No email provided");
      }
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      try {
        const res = await axios.get(`/users/${contextUser.email}`);
        return res.data.data;
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout();
          navigate("/login");
          Swal.fire("Error", "Session expired. Please log in again.", "error");
        }
        throw error;
      }
    },
    enabled: !!contextUser?.email,
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading)
    return (
      <div className="w-64 bg-gray-800 text-white h-screen p-4">Loading...</div>
    );
  if (error || !user) {
    return (
      <div className="w-64 bg-gray-800 text-white h-screen p-4">
        <p>Error loading user data: {error?.message}</p>
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">FitPulse Dashboard</h2>
      <nav>
        <ul>
          {user.role === "admin" && (
            <>
              <li className="mb-2">
                <Link
                  to="/dashboard/admin/subscribers"
                  className="hover:text-gray-300"
                >
                  Newsletter Subscribers
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/admin/all-trainers"
                  className="hover:text-gray-300"
                >
                  All Trainers
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/admin/applied-trainers"
                  className="hover:text-gray-300"
                >
                  Applied Trainers
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/admin/balance"
                  className="hover:text-gray-300"
                >
                  Balance
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/admin/add-class"
                  className="hover:text-gray-300"
                >
                  Add Class
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/admin/all-classes"
                  className="hover:text-gray-300"
                >
                  All Classes
                </Link>
              </li>
            </>
          )}
          {user.role === "Trainer" && (
            <>
              <li className="mb-2">
                <Link
                  to="/dashboard/trainer/manage-slots"
                  className="hover:text-gray-300"
                >
                  Manage Slots
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/trainer/add-slot"
                  className="hover:text-gray-300"
                >
                  Add Slot
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/trainer/add-forum"
                  className="hover:text-gray-300"
                >
                  Add Forum
                </Link>
              </li>
            </>
          )}
          {user.role === "member" && (
            <>
              <li className="mb-2">
                <Link
                  to="/dashboard/member/activity-log"
                  className="hover:text-gray-300"
                >
                  Activity Log
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/member/profile"
                  className="hover:text-gray-300"
                >
                  Profile
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard/member/booked-trainer"
                  className="hover:text-gray-300"
                >
                  Booked Trainer
                </Link>
              </li>
            </>
          )}
          <li className="mt-4">
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
