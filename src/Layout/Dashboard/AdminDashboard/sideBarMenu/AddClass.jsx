import axios from '../../../../hooks/axiosInstance'; // Use axiosInstance
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddNewClass = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        title: 'Error!',
        text: 'Please log in to add a class.',
        icon: 'error',
      });
      navigate('/login');
      return;
    }

    const name = e.target.className.value;
    const description = e.target.description.value;
    const formData = { name, description };

    try {
      setLoading(true);
      const response = await axios.post('/classes', formData);
      if (response.data.classId) {
        Swal.fire({
          title: 'Class Added!',
          text: 'The class has been added successfully.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/classes');
      }
    } catch (error) {
      console.error('Error adding class:', error);
      const message = error.response?.data?.message || 'An error occurred while adding the class.';
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Class</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Class Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Class Name</label>
            <input
              type="text"
              name="className"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Details</label>
            <textarea
              name="description"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-600 transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Adding Class...' : 'Add Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewClass;