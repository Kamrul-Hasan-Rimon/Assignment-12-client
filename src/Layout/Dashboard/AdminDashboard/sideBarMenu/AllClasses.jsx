import { useQuery } from '@tanstack/react-query';
import axios from '../../../../hooks/axiosInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllClasses = () => {
  const navigate = useNavigate();

  // Fetch classes
  const fetchClasses = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }
    const { data } = await axios.get('/classes');
    return data || [];
  };

  const { data: classes = [], isLoading, error, refetch } = useQuery({
    queryKey: ['classes'],
    queryFn: fetchClasses,
    retry: false,
  });

  // Handle delete class
  const handleDelete = async (classId, className) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the class "${className}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/classes/${classId}`);
        Swal.fire({
          title: 'Deleted!',
          text: 'The class has been deleted successfully.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      } catch (err) {
        console.error('Error deleting class:', err);
        const message = err.response?.data?.message || 'Failed to delete the class.';
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
        });
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    }
  };

  // Handle 401/403 errors
  if (error?.message === 'No token found. Please log in.') {
    Swal.fire({
      title: 'Error',
      text: 'Please log in to view classes.',
      icon: 'error',
    }).then(() => {
      localStorage.removeItem('token');
      navigate('/login');
    });
    return null;
  }

  if (error) {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      Swal.fire({
        title: 'Error',
        text: 'Unauthorized access. Please log in again.',
        icon: 'error',
      }).then(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
      return null;
    }
    return <p className="text-center text-lg font-semibold text-red-600">{error.message || 'An error occurred'}</p>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">All Classes</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.length > 0 ? (
            classes.map((cls) => (
              <tr key={cls._id} className="text-center bg-white">
                <td className="border p-2">{cls.name}</td>
                <td className="border p-2">{cls.description}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(cls._id, cls.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No classes found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllClasses;