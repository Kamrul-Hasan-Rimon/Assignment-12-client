import { useState } from "react";
import { Link } from "react-router-dom";

const ClassesPage = () => {
    const classesData = [
        {
            id: 1,
            name: "Yoga",
            description: "Improve flexibility, strength, and mental clarity with our yoga classes.",
            trainers: [
                { id: 1, name: "John Doe", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 2, name: "Jane Smith", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 3, name: "Mike Johnson", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        {
            id: 2,
            name: "Spinning",
            description: "High-intensity indoor cycling classes to boost your cardio fitness.",
            trainers: [
                { id: 4, name: "Emily Davis", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
                { id: 5, name: "Chris Brown", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ],
        },
        // Add more classes here...
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const classesPerPage = 6;

    // Calculate the classes to display on the current page
    const indexOfLastClass = currentPage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses = classesData.slice(indexOfFirstClass, indexOfLastClass);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text text-center mb-16">
                    All Classes
                </h2>

                {/* All Classes Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {currentClasses.map((cls) => (
                        <div
                            key={cls.id}
                            className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500"
                        >
                            <h3 className="text-2xl font-bold mb-4">{cls.name}</h3>
                            <p className="text-gray-300 mb-6">{cls.description}</p>

                            {/* Trainers List */}
                            <div className="space-y-4">
                                <h4 className="text-xl font-bold">Trainers</h4>
                                <div className="flex space-x-4">
                                    {cls.trainers.slice(0, 5).map((trainer) => (
                                        <Link
                                            key={trainer.id}
                                            to={`/trainer-details/${trainer.id}`}
                                            className="flex flex-col items-center"
                                        >
                                            <img
                                                src={trainer.image}
                                                alt={trainer.name}
                                                className="w-16 h-16 object-cover rounded-full border-2 border-purple-500 shadow-lg hover:scale-110 transition-transform duration-300"
                                            />
                                            <p className="text-sm text-gray-300 mt-2">{trainer.name}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center space-x-4">
                    {Array.from({ length: Math.ceil(classesData.length / classesPerPage) }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`px-4 py-2 rounded-full font-semibold ${currentPage === i + 1
                                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(128,90,213,0.5)]"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                } transition-all duration-300`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassesPage;