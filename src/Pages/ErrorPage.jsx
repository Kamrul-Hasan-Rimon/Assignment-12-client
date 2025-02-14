import { motion } from "framer-motion";

export default function ErrorPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <motion.div 
        className="relative p-12 rounded-2xl shadow-lg bg-opacity-10 backdrop-blur-xl bg-black border border-gray-800 max-w-lg text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 drop-shadow-lg">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-400">Oops! The page you are looking for does not exist.</p>
        
        <motion.div 
          className="mt-6 inline-block px-6 py-3 text-lg font-semibold rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 ease-in-out shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          <a href="/" className="block">Return Home</a>
        </motion.div>
      </motion.div>
    </div>
  );
}
