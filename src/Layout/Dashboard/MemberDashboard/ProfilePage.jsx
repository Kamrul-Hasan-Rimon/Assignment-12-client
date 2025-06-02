import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthProvider";

const ProfilePage = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    profilePicture: user?.photoURL || "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user || !user.email) {
          throw new Error("User data is not available. Please log in.");
        }
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const response = await axios.get(
          `https://server-alpha-three.vercel.app/users/${user?.email}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const userData = response.data;
        setFormData({
          name: userData.name || user.displayName || "",
          profilePicture: userData.image || user.photoURL || "",
        });
      } catch (err) {
        setError(err.message || "Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setSuccess(null);
    setError(null);
  };

  const handleUpdateProfile = async () => {
    try {
      if (!formData.name.trim()) {
        throw new Error("Name is required.");
      }
      await updateProfile(formData);
      setSuccess("Profile updated successfully!");
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
      setSuccess(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <div className="text-2xl text-white font-semibold">
          User not found. Please log in.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#0f3460] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10 flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-500 via-cyan-400 to-blue-500 blur opacity-70"></div>
          <img
            src={
              formData.profilePicture ||
              "https://ui-avatars.com/api/?name=User&background=6d28d9&color=fff&size=256"
            }
            alt="Profile"
            className="relative w-40 h-40 rounded-full border-8 border-white shadow-xl object-cover z-10"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 mb-2">
          {formData.name || "Your Name"}
        </h1>
        <p className="text-lg text-gray-300 mb-8">{user.email}</p>
        <form
          className="w-full max-w-lg bg-white/20 rounded-2xl p-8 shadow-lg border border-white/10"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProfile();
          }}
        >
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-200 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-purple-400 focus:border-cyan-400 bg-white/80 text-gray-900 font-medium shadow transition-all duration-300"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-200 mb-2">
              Profile Picture URL
            </label>
            <input
              type="text"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-purple-400 focus:border-cyan-400 bg-white/80 text-gray-900 font-medium shadow transition-all duration-300"
              placeholder="Paste image URL"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-200 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 font-medium cursor-not-allowed"
            />
          </div>
          {error && (
            <div className="mb-4 text-red-500 font-semibold text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 text-green-500 font-semibold text-center">
              {success}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
