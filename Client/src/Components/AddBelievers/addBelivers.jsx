import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Upload, Users } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function AddBeliever() {
  const initialState = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    gender: "",
    address: "",
    pinCode: "",
    churchBelongsTo: "",
    daysCategory: "",
    familyMemberName: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [photo, setPhoto] = useState(null);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  // Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Validate
  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First Name is required";

    if (!formData.lastName) newErrors.lastName = "Last Name is required";

    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";

    if (formData.age === "") {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 0 || Number(formData.age) > 120) {
      newErrors.age = "Enter a valid age (0–120)";
    }

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.address) newErrors.address = "Address is required";

    if (!formData.churchBelongsTo)
      newErrors.churchBelongsTo = "Church is required";

    if (!formData.daysCategory)
      newErrors.daysCategory = "Day Category is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (photo) {
        data.append("photo", photo);
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/believers/create`,
        data,
      );

      if (response.data.success) {
        toast.success("Believer Added Successfully");

        setFormData(initialState);

        setPhoto(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FFFDF5] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white border border-[#c9a84c]/30 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#c9a84c] to-[#d8b45a] p-8 text-[#1E1535]">
          <h1 className="text-4xl font-bold mb-2">Add Believer</h1>

          <p className="text-lg opacity-80">Fill believer details carefully</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* First Name */}
          <div>
            <label className="text-[#1E1535]/70 mb-2 block">First Name *</label>

            <div className="relative">
              <User
                className="absolute left-3 top-3 text-[#c9a84c]"
                size={18}
              />

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full pl-10 p-3 rounded-xl bg-[#FFFDF5] border ${errors.firstName ? "border-red-500" : "border-[#c9a84c]/30"} text-[#1E1535] focus:outline-none focus:border-[#c9a84c]`}
              />
            </div>

            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="text-[#1E1535]/70 mb-2 block">Last Name *</label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl bg-[#FFFDF5] border ${errors.lastName ? "border-red-500" : "border-[#c9a84c]/30"} text-[#1E1535] focus:outline-none focus:border-[#c9a84c]`}
            />

            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-[#1E1535]/70 mb-2 block">Phone Number *</label>

            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-[#c9a84c]"
                size={18}
              />

              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full pl-10 p-3 rounded-xl bg-[#FFFDF5] border ${errors.phoneNumber ? "border-red-500" : "border-[#c9a84c]/30"} text-[#1E1535] focus:outline-none focus:border-[#c9a84c]`}
              />
            </div>

            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-[#1E1535]/70 mb-2 block">Gender *</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl bg-[#FFFDF5] border ${errors.gender ? "border-red-500" : "border-[#c9a84c]/30"} text-[#1E1535] focus:outline-none focus:border-[#c9a84c]`}
            >
              <option value="">Select Gender</option>

              <option value="male">Male</option>

              <option value="female">Female</option>
            </select>

            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="text-[#1E1535]/70 mb-2 block">Age *</label>

            <input
              type="number"
              name="age"
              min="0"
              max="120"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className={`w-full p-3 rounded-xl bg-[#FFFDF5] border ${errors.age ? "border-red-500" : "border-[#c9a84c]/30"} text-[#1E1535] focus:outline-none focus:border-[#c9a84c]`}
            />

            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="text-[#1E1535]/70 mb-2 block">Address *</label>

            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-[#c9a84c]"
                size={18}
              />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                className={`w-full pl-10 p-3 rounded-xl bg-[#FFFDF5] border ${errors.address ? "border-red-500" : "border-[#c9a84c]/30"} text-[#1E1535] focus:outline-none focus:border-[#c9a84c]`}
              />
            </div>

            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="text-[#1E1535]/70 mb-2 block">Pin Code</label>

            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-[#FFFDF5] border border-[#c9a84c]/30 text-[#1E1535] focus:outline-none focus:border-[#c9a84c]"
            />
          </div>

          {/* Church */}
          <div>
            <label className="text-[#1E1535]/70 mb-2 block">
              Church Belongs To *
            </label>

            <select
              name="churchBelongsTo"
              value={formData.churchBelongsTo}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl bg-[#FFFDF5] border ${errors.churchBelongsTo ? "border-red-500" : "border-[#c9a84c]/30"} text-[#1E1535] focus:outline-none focus:border-[#c9a84c]`}
            >
              <option value="">Select Church</option>

              <option value="Nagullanka">Nagullanka</option>

              <option value="Marteru">Marteru</option>
            </select>
          </div>

          {/* Days Category */}
          <div>
            <label className="text-[#1E1535]/70 mb-2 block">Days Category *</label>

            <select
              name="daysCategory"
              value={formData.daysCategory}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl bg-[#FFFDF5] border ${errors.daysCategory ? "border-red-500" : "border-[#c9a84c]/30"} text-[#1E1535] focus:outline-none focus:border-[#c9a84c]`}
            >
              <option value="">Select Day</option>

              <option value="Friday">Friday</option>

              <option value="Saturday">Saturday</option>

              <option value="Sunday">Sunday</option>
            </select>
          </div>

          {/* Family Member */}
          <div>
            <label className="text-[#1E1535]/70 mb-2 block">
              Family Member Name
            </label>

            <div className="relative">
              <Users
                className="absolute left-3 top-3 text-[#c9a84c]"
                size={18}
              />

              <input
                type="text"
                name="familyMemberName"
                value={formData.familyMemberName}
                onChange={handleChange}
                className="w-full pl-10 p-3 rounded-xl bg-[#FFFDF5] border border-[#c9a84c]/30 text-[#1E1535] focus:outline-none focus:border-[#c9a84c]"
              />
            </div>
          </div>

          {/* Photo */}
          <div>
            <label className="text-[#1E1535]/70 mb-2 block">Upload Photo</label>

            <div className="border-2 border-dashed border-[#c9a84c]/30 rounded-xl p-6 text-center bg-[#FFFDF5] hover:border-[#c9a84c] transition-all">
              <Upload className="mx-auto text-[#c9a84c] mb-2" size={28} />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="text-[#1E1535]"
              />
            </div>
          </div>

          {/* Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#c9a84c] to-[#d8b45a] hover:opacity-90 text-[#1E1535] font-bold py-4 rounded-xl transition-all duration-300"
            >
              {loading ? "Submitting..." : "Submit Believer"}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
