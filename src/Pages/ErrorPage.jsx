
const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      <div className="text-center p-10 rounded-lg shadow-2xl bg-black bg-opacity-70 backdrop-blur-sm border border-gray-700">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-pulse">
          404
        </h1>
        <h2 className="text-4xl font-bold mt-6 tracking-wider text-gray-300">
          Oops! Page Not Found
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          The page you're looking for might have been moved, deleted, or never existed.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-400 rounded-full shadow-lg hover:shadow-xl hover:from-teal-400 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Return to Homepage
          </a>
        </div>
        <div className="mt-10">
          <p className="text-gray-500 text-sm">
            Need help? Contact support at{" "}
            <a
              href="mailto:support@example.com"
              className="text-teal-400 hover:underline"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
