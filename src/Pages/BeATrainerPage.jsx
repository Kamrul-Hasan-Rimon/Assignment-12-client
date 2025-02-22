import { useContext, useState } from "react";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const BeATrainerPage = () => {
    const { user } = useContext(AuthContext);
    const [fullName, setFullName] = useState("");
    const [email] = useState(user?.email);
    const [age, setAge] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    console.log(profileImage)
    const [skills, setSkills] = useState([]);
    console.log(skills)
    const [availableDays, setAvailableDays] = useState([]);
    const [availableTime, setAvailableTime] = useState("");
    const [loading, setLoading] = useState(false);

    // Skills options
    const skillsOptions = [
        { value: "yoga" },
        { value: "strength_training" },
        { value: "cardio" },
        { value: "nutrition" },
        { value: "zumba" },
    ];

    // Days options
    const daysOptions = [
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = "";
            if (profileImage) {
                const formData = new FormData();
                formData.append("image", profileImage);

                // Upload image to ImgBB
                const imgResponse = await axios.post(image_hosting_api, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                if (imgResponse.data.success) {
                    imageUrl = imgResponse.data.data.url;
                    console.log(imageUrl)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Image Upload Failed!",
                        text: "Could not upload image. Please try again.",
                        confirmButtonColor: "#EF4444",
                    });
                    setLoading(false);
                    return;
                }
            }

            // Create new form data for backend request
            const trainerData = {
                fullName,
                email,
                age: Number(age),
                profileImage: imageUrl,
                skills,
                availableDays: availableDays.map((day) => day.value),
                availableTime,
                status: "pending",
            };
            console.log("Trainer Data:", trainerData);


            // Send data to backend
            const response = await axios.post("http://localhost:4000/applytrainer", trainerData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Application Submitted!",
                    text: "Your application has been submitted successfully.",
                    confirmButtonColor: "#6366F1",
                });
            } else {
                if (!fullName || !email || !age || !availableTime || skills.length === 0 || availableDays.length === 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Missing Fields",
                        text: "Please fill in all required fields before submitting.",
                        confirmButtonColor: "#EF4444",
                    });
                    setLoading(false);
                    return;
                }

            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: "An error occurred. Please try again.",
                confirmButtonColor: "#EF4444",
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text text-center mb-16">
                    Be a Trainer
                </h2>

                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="text-lg font-semibold">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400 text-white"
                                required
                            />
                        </div>

                        {/* Email (Read-only) */}
                        <div>
                            <label className="text-lg font-semibold">Email</label>
                            <input
                                type="email"
                                value={email}
                                readOnly
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400 text-gray-400 cursor-not-allowed"
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label className="text-lg font-semibold">Age</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400 text-white"
                                required
                            />
                        </div>

                        {/* Profile Image */}
                        <div>
                            <label className="text-lg font-semibold">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400 text-white"
                                required
                            />
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="text-lg font-semibold">Skills</label>
                            <div className="space-y-2">
                                {skillsOptions.map((skill) => (
                                    <label key={skill.value} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={skill.value}
                                            checked={skills.includes(skill.value)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSkills([...skills, skill.value]); // Fix: Push actual values, not objects
                                                } else {
                                                    setSkills(skills.filter((s) => s !== skill.value)); // Remove correctly
                                                }
                                            }}
                                            className="form-checkbox text-purple-500"
                                        />
                                        <span>{skill.value}</span>
                                    </label>
                                ))}
                            </div>
                        </div>


                        {/* Available Days */}
                        <div>
                            <label className="text-lg font-semibold">Available Days</label>
                            <Select
                                options={daysOptions}
                                isMulti
                                value={availableDays}
                                onChange={(selected) => setAvailableDays(selected)}
                                className="text-black"
                            />
                        </div>

                        {/* Available Time */}
                        <div>
                            <label className="text-lg font-semibold">Available Time</label>
                            <input
                                type="text"
                                value={availableTime}
                                onChange={(e) => setAvailableTime(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400 text-white"
                                placeholder="Ex: 9:00 AM - 5:00 PM"
                                required
                            />
                        </div>

                        {/* Apply Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-purple-600 to-cyan-600 px-10 py-3 rounded-full font-semibold text-white text-lg shadow-[0_0_25px_rgba(128,90,213,0.5)] hover:shadow-[0_0_35px_rgba(128,90,213,0.8)] transition-all duration-500 w-full"
                        >
                            {loading ? "Submitting..." : "Apply"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BeATrainerPage;
