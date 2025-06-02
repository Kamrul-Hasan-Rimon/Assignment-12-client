import { useEffect, useState, useContext } from "react";
import axios from "../../../hooks/axiosInstance";
import { AuthContext } from "../../../Context/AuthProvider";

const ActivityLog = () => {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const { data } = await axios.get(`/activity-log/${user?.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivities(data.activities || []);
        // console.log("Activities fetched:", data);
      } catch (err) {
        setError(err.message || "Failed to load activity log.");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchActivities();
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
          Activity Log
        </h1>
        {activities.length === 0 ? (
          <p className="text-center text-gray-300">No activities found.</p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {activities.map((activity, idx) => (
              <li key={idx} className="py-4 flex items-center">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 mr-4"></span>
                <div>
                  <p className="text-lg text-white">{activity.description}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(activity.timestamp).toLocaleString()}
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

export default ActivityLog;
