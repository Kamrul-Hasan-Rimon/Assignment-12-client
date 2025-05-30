import { useState, useEffect } from 'react';
import axios from '../../../../hooks/axiosInstance'; 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscribers = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No token found. Please log in.');
                Swal.fire({
                    title: 'Error',
                    text: 'Please log in to view subscribers',
                    icon: 'error',
                });
                navigate('/login');
                setLoading(false);
                return;
            }
            try {
                const { data } = await axios.get('/subscribe');
                setSubscribers(data || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching subscribers:', err);
                const message = err.response?.data?.message || 'Failed to fetch subscribers. Please try again later.';
                setError(message);
                Swal.fire({
                    title: 'Error',
                    text: message,
                    icon: 'error',
                });
                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                setLoading(false);
            }
        };
        fetchSubscribers();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-lg font-semibold text-red-600">{error}</p>;
    }

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">All Newsletter Subscribers</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Subscribed Date</th>
                    </tr>
                </thead>
                <tbody>
                    {subscribers.length > 0 ? (
                        subscribers.map((sub) => (
                            <tr key={sub._id} className="text-center bg-white">
                                <td className="border p-2">{sub.name}</td>
                                <td className="border p-2">{sub.email}</td>
                                <td className="border p-2">
                                    {sub.subscribedAt
                                        ? new Date(sub.subscribedAt).toLocaleDateString()
                                        : 'Not available'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center p-4">No subscribers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllSubscribers;