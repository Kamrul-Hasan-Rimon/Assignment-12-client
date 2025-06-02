import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../../hooks/axiosInstance'; // Use axiosInstance
import Swal from 'sweetalert2';

const AppliedTrainerDetails = () => {
    const { id } = useParams();
    // console.log('Trainer ID:', id); // Line 8
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrainer = async () => {
            const token = localStorage.getItem('token'); 
            if (!token) {
                Swal.fire('Error!', 'Please log in to view trainer details.', 'error');
                navigate('/login');
                setLoading(false);
                return;
            }
            try {
                const { data } = await axios.get(`/applytrainer/${id}`); // Line 13
                if (data.data) {
                    setTrainer(data.data);
                } else {
                    Swal.fire('Error!', 'Trainer not found.', 'error');
                    navigate('/dashboard/admin/applied-trainers');
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching trainer details:', err); // Line 24
                const message = err.response?.data?.message || 'Failed to fetch trainer details.';
                Swal.fire('Error!', message, 'error');
                if (err.response?.status === 401 || err.response?.status === 403) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    navigate('/dashboard/admin/applied-trainers');
                }
                setLoading(false);
            }
        };
        fetchTrainer();
    }, [id, navigate]);

    const handleConfirm = async () => {
        try {
            await axios.put(`/users/${trainer.email}`, { role: 'Trainer' });
            const trainerData = { ...trainer };
            await axios.post('/trainers', trainerData);
            await axios.delete(`/applytrainer/${trainer._id}`);
            Swal.fire('Success!', 'Trainer confirmed successfully!', 'success');
            navigate('/dashboard/admin/applied-trainers');
        } catch (err) {
            console.error('Error confirming trainer:', err);
            Swal.fire('Error!', err.response?.data?.message || 'Failed to confirm trainer.', 'error');
        }
    };

    const handleReject = async () => {
        try {
            await axios.delete(`/applytrainer/${trainer._id}`);
            Swal.fire('Rejected!', 'Trainer application removed.', 'success');
            navigate('/dashboard/admin/applied-trainers');
        } catch (err) {
            console.error('Error rejecting trainer:', err);
            Swal.fire('Error!', err.response?.data?.message || 'Failed to reject trainer.', 'error');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!trainer) {
        return <p className="text-center text-lg font-semibold">Trainer not found.</p>;
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">{trainer.name}'s Details</h2>
            <div className="space-y-4">
                <p><strong>Email:</strong> {trainer.email}</p>
                <p><strong>Bio:</strong> {trainer.bio || 'Not provided'}</p>
                <p>
                    <strong>Profile Image:</strong>{' '}
                    {trainer.profileImage ? (
                        <img src={trainer.profileImage} alt="Profile" className="w-24 h-24 rounded-full mt-2" />
                    ) : (
                        'Not provided'
                    )}
                </p>
                <div>
                    <p><strong>Expertise:</strong></p>
                    <ul className="list-disc list-inside mt-1">
                        {trainer.expertise && trainer.expertise.length > 0 ? (
                            trainer.expertise.map((skill, index) => (
                                <li key={index} className="text-gray-700">{skill}</li>
                            ))
                        ) : (
                            <li className="text-gray-500">Not Mentioned</li>
                        )}
                    </ul>
                </div>
                <p><strong>Experience:</strong> {trainer.experience || 'Not provided'} years</p>
                <p><strong>Qualification:</strong> {trainer.qualification || 'Not provided'}</p>
                <p><strong>Description:</strong> {trainer.description || 'Not provided'}</p>
                <div>
                    <p><strong>Social Links:</strong></p>
                    <div className="mt-1 space-y-1">
                        {trainer.socialLinks?.facebook ? (
                            <p>
                                <strong>Facebook:</strong>{' '}
                                <a
                                    href={trainer.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {trainer.socialLinks.facebook}
                                </a>
                            </p>
                        ) : (
                            <p>Facebook: Not provided</p>
                        )}
                        {trainer.socialLinks?.instagram ? (
                            <p>
                                <strong>Instagram:</strong>{' '}
                                <a
                                    href={trainer.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {trainer.socialLinks.instagram}
                                </a>
                            </p>
                        ) : (
                            <p>Instagram: Not provided</p>
                        )}
                    </div>
                </div>
                <div>
                    <p><strong>Available Slots:</strong></p>
                    {trainer.availableSlots && trainer.availableSlots.length > 0 ? (
                        trainer.availableSlots.map((slot, index) => (
                            <div key={index} className="mt-2 p-3 border rounded-lg">
                                <p><strong>Slot Name:</strong> {slot.slotName || 'Not specified'}</p>
                                <p><strong>Slot Time:</strong> {slot.slotTime || 'Not specified'}</p>
                                <div className="mt-1">
                                    <p><strong>Days Available:</strong></p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {slot.daysAvailable && slot.daysAvailable.length > 0 ? (
                                            slot.daysAvailable.map((day, dayIndex) => (
                                                <span
                                                    key={dayIndex}
                                                    className="bg-blue-200 text-blue-800 px-2 py-1 rounded-md text-sm"
                                                >
                                                    {day}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">None</span>
                                        )}
                                    </div>
                                </div>
                                <p className="mt-1">
                                    <strong>Status:</strong> {slot.isBooked ? 'Booked' : 'Available'}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No available slots</p>
                    )}
                </div>
                <p>
                    <strong>Application Status:</strong>{' '}
                    <span
                        className={`capitalize ${trainer.status === 'pending'
                                ? 'text-yellow-600'
                                : trainer.status === 'approved'
                                    ? 'text-green-600'
                                    : 'text-red-600'
                            }`}
                    >
                        {trainer.status}
                    </span>
                </p>
            </div>
            {trainer.status === 'pending' && (
                <div className="mt-6 flex justify-between">
                    <button
                        onClick={handleConfirm}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Confirm as Trainer
                    </button>
                    <button
                        onClick={handleReject}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Reject Application
                    </button>
                </div>
            )}
        </div>
    );
};

export default AppliedTrainerDetails;