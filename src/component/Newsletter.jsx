import axios from "axios";
import Swal from "sweetalert2";

const Newsletter = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const subscribedAt = new Date().toISOString(); 
    
        const user = { name, email, subscribedAt };
    
        try {
            const response = await axios.post("http://localhost:4000/subscribe", user);
            if (response.data.success) {
                Swal.fire({
                    title: "✅ Subscription Successful!",
                    text: "You have successfully subscribed to our newsletter.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
                e.target.reset();
            } else {
                Swal.fire({
                    title: "⚠️ Subscription Failed",
                    text: "You are already subscribed.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "❌ Error",
                text: "Could not subscribe. Please check your connection.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
            console.error(error);
        }
    };
    

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Subscribe to our Newsletter</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Subscribe Now
                </button>
            </form>
        </div>
    );
};

export default Newsletter;
