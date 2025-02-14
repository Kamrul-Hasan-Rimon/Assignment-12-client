const LatestPostsSection = () => {
    const posts = [
        {
            id: 1,
            title: "10 Tips for Staying Motivated on Your Fitness Journey",
            excerpt: "Discover practical tips to stay motivated and achieve your fitness goals.",
            link: "/blog/staying-motivated",
            image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 2,
            title: "The Benefits of Strength Training for Women",
            excerpt: "Learn why strength training is essential for women of all ages.",
            link: "/blog/strength-training-women",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 3,
            title: "How to Create a Balanced Workout Routine",
            excerpt: "Find out how to balance cardio, strength, and flexibility in your workouts.",
            link: "/blog/balanced-workout-routine",
            image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 4,
            title: "The Importance of Recovery in Fitness",
            excerpt: "Understand why recovery is just as important as your workouts.",
            link: "/blog/importance-of-recovery",
            image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 5,
            title: "Top 5 Nutrition Tips for Athletes",
            excerpt: "Fuel your body with the right nutrition to maximize performance.",
            link: "/blog/nutrition-tips-athletes",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 6,
            title: "How to Stay Consistent with Your Fitness Goals",
            excerpt: "Learn strategies to stay consistent and make fitness a lifestyle.",
            link: "/blog/staying-consistent",
            image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-20 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                    Latest Community Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 overflow-hidden"
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-4">{post.title}</h3>
                                <p className="text-gray-300 mb-6">{post.excerpt}</p>
                                <a
                                    href={post.link}
                                    className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 rounded-full font-semibold text-white shadow-[0_0_20px_rgba(128,90,213,0.5)] hover:shadow-[0_0_30px_rgba(128,90,213,0.8)] transition-all duration-500"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestPostsSection;