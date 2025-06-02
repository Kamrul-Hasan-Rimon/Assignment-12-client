import { useContext, useState } from "react";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const BeATrainerPage = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email] = useState(user?.email);
  const [experience, setExperience] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [expertise, setExpertise] = useState([]);
  const [bio, setBio] = useState("");
  const [description, setDescription] = useState("");
  const [qualification, setQualification] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [availableSlots, setAvailableSlots] = useState([
    {
      slotId: "",
      slotName: "",
      slotTime: "",
      daysAvailable: [],
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Expertise options
  const expertiseOptions = [
    { value: "Yoga", label: "Yoga" },
    { value: "Strength Training", label: "Strength Training" },
    { value: "Cardio", label: "Cardio" },
    { value: "Nutrition", label: "Nutrition" },
    { value: "Zumba", label: "Zumba" },
    { value: "Aerobics", label: "Aerobics" },
    { value: "Pilates", label: "Pilates" },
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

  const resetForm = () => {
    setName("");
    setExperience("");
    setProfileImage(null);
    setExpertise([]);
    setBio("");
    setDescription("");
    setQualification("");
    setFacebook("");
    setInstagram("");
    setAvailableSlots([
      {
        slotId: "",
        slotName: "",
        slotTime: "",
        daysAvailable: [],
      },
    ]);

    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...availableSlots];
    updatedSlots[index][field] = value;
    setAvailableSlots(updatedSlots);
  };

  const addNewSlot = () => {
    setAvailableSlots([
      ...availableSlots,
      {
        slotId: "",
        slotName: "",
        slotTime: "",
        daysAvailable: [],
      },
    ]);
  };

  const removeSlot = (index) => {
    if (availableSlots.length > 1) {
      const updatedSlots = availableSlots.filter((_, i) => i !== index);
      setAvailableSlots(updatedSlots);
    }
  };

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
        name,
        email,
        profileImage: imageUrl,
        experience: Number(experience),
        expertise: expertise.map((exp) => exp.value),
        bio,
        description,
        qualification,
        socialLinks: {
          facebook,
          instagram,
        },
        availableSlots: availableSlots.map((slot) => ({
          ...slot,
          daysAvailable: slot.daysAvailable.map((day) => day.value),
          isBooked: false,
        })),
        status: "pending",
      };
      // console.log(trainerData)
      // Send data to backend
      const response = await axios.post(
        "https://server-alpha-three.vercel.app/applytrainer",
        trainerData
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your application has been submitted successfully.",
          confirmButtonColor: "#6366F1",
        });

        // Reset the form after successful submission
        resetForm();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Failed to submit application",
          confirmButtonColor: "#EF4444",
        });
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
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text text-center mb-6">
          Be a Trainer
        </h2>
        <p className="text-center text-lg text-gray-300 max-w-6xl mx-auto mb-12 px-4">
          Join our elite team of fitness professionals and inspire others on their wellness journey!
          As a FlexFit trainer, you'll get access to our growing community, modern training tools,
          and the opportunity to build your personal brand. Share your expertise, set your schedule,
          and earn while doing what you love. Let's shape the future of fitness together!
        </p>
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="text-lg font-semibold">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            {/* Experience */}
            <div>
              <label className="text-lg font-semibold">
                Experience (in years)
              </label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
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

            {/* Expertise */}
            <div>
              <label className="text-lg font-semibold">Expertise</label>
              <Select
                options={expertiseOptions}
                isMulti
                value={expertise}
                onChange={(selected) => setExpertise(selected)}
                className="text-black"
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label className="text-lg font-semibold">Short Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400 text-white"
                rows="3"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-lg font-semibold">
                Detailed Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400 text-white"
                rows="4"
                required
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="text-lg font-semibold">
                Qualifications/Certifications
              </label>
              <textarea
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400 text-white"
                rows="3"
                required
              />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-lg font-semibold">Facebook Profile</label>
                <input
                  type="url"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400 text-white"
                  placeholder="https://facebook.com/yourprofile"
                />
              </div>
              <div>
                <label className="text-lg font-semibold">Instagram Profile</label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-400 text-white"
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
            </div>

            {/* Available Slots */}
            <div>
              <label className="text-lg font-semibold">Available Time Slots</label>
              {availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Slot {index + 1}</h3>
                    {availableSlots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSlot(index)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-1">Slot ID</label>
                      <input
                        type="text"
                        value={slot.slotId}
                        onChange={(e) =>
                          handleSlotChange(index, "slotId", e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-400 text-white"
                        placeholder="e.g., SLOT001"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Slot Name</label>
                      <input
                        type="text"
                        value={slot.slotName}
                        onChange={(e) =>
                          handleSlotChange(index, "slotName", e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-400 text-white"
                        placeholder="e.g., Morning Session"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <label className="block mb-1">Time Range</label>
                      <input
                        type="text"
                        value={slot.slotTime}
                        onChange={(e) =>
                          handleSlotChange(index, "slotTime", e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-400 text-white"
                        placeholder="e.g., 9:00 AM - 11:00 AM"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block mb-1">Available Days</label>
                    <Select
                      options={daysOptions}
                      isMulti
                      value={slot.daysAvailable}
                      onChange={(selected) =>
                        handleSlotChange(index, "daysAvailable", selected)
                      }
                      className="text-black"
                      required
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addNewSlot}
                className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
              >
                + Add Another Time Slot
              </button>
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