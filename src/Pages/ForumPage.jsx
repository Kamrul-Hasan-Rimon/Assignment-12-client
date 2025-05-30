import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [votingPostId, setVotingPostId] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchPosts = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:4000/trainers`);
      if (response.data.success) {
        setPosts(response.data.posts || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setError(response.data.message || "Failed to fetch posts");
        setPosts([]);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Error fetching posts. Please try again later."
      );
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleVote = async (postId, vote) => {
    try {
      if (!user || !user.email) {
        alert("Please log in to vote.");
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to vote.");
        return;
      }
      setVotingPostId(postId);
      await axios.post(
        `http://localhost:4000/forum/posts/${postId}/vote`,
        {
          email: user.email,
          vote: vote,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPosts(currentPage);
    } catch (error) {
      alert(error.response?.data?.message || "Error voting. Please try again.");
    } finally {
      setVotingPostId(null);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 mx-1 rounded-full font-semibold ${
            currentPage === i
              ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center mt-8">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 mx-1 rounded-full font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            Previous
          </button>
        )}
        {pages}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 mx-1 rounded-full font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 mx-28 text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text text-center mb-8">
          Forum
        </h2>

        {/* Description */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-300 mb-4">
            Welcome to the <strong>Fitness Forum</strong>! This is your space to
            ask questions, share tips, and connect with fellow <br />
            fitness enthusiasts. Whether you&apos;re a beginner looking for
            advice or an experienced athlete sharing your <br />
            knowledge, everyone is welcome here.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* Posts */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts?.map((post) => (
              <div
                key={post._id}
                className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <p className="text-gray-300 mb-6">{post.content}</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleVote(post._id, 1)}
                    disabled={votingPostId === post._id}
                    className={`bg-green-500 px-4 py-2 rounded-full font-semibold text-white ${
                      votingPostId === post._id
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-green-600"
                    }`}
                  >
                    Upvote ({post.upvotes})
                  </button>
                  <button
                    onClick={() => handleVote(post._id, -1)}
                    disabled={votingPostId === post._id}
                    className={`bg-red-500 px-4 py-2 rounded-full font-semibold text-white ${
                      votingPostId === post._id
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-red-600"
                    }`}
                  >
                    Downvote ({post.downvotes})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {renderPagination()}
      </div>
    </div>
  );
};

export default ForumPage;
