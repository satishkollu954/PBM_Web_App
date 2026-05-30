import { useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import { motion } from "framer-motion";

import {
  Upload,
  BookOpen,
  User,
  Calendar,
  Layers,
  FileText,
  XCircle,
} from "lucide-react";

export function AddBook() {
  const [formData, setFormData] = useState({
    title: "",

    subtitle: "",

    author: "",

    topic: "",

    year: "",
  });

  const [cover, setCover] = useState(null);

  const [preview, setPreview] = useState("");

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

  // Handle Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setCover(file);

      setPreview(URL.createObjectURL(file));

      setErrors({
        ...errors,

        cover: "",
      });
    }
  };

  // Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!formData.topic.trim()) {
      newErrors.topic = "Topic is required";
    }

    if (
      formData.year &&
      (formData.year < 1900 || formData.year > new Date().getFullYear())
    ) {
      newErrors.year = "Invalid year";
    }

    if (!cover) {
      newErrors.cover = "Cover image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const submitData = new FormData();

      submitData.append("title", formData.title);

      submitData.append("subtitle", formData.subtitle);

      submitData.append("author", formData.author);

      submitData.append("topic", formData.topic);

      submitData.append("year", formData.year);

      submitData.append("cover", cover);

      const response = await axios.post(
        "http://localhost:3005/api/books/create",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success(response.data.message);

      // Reset
      setFormData({
        title: "",

        subtitle: "",

        author: "",

        topic: "",

        year: "",
      });

      setCover(null);

      setPreview("");

      setErrors({});
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-white mb-3">Add New Book</h1>

          <p className="text-gray-400 text-lg">
            Upload and manage PBM Church library books
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left */}
          <div className="lg:col-span-2 bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-3xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 mb-2 text-sm text-gray-300">
                  <BookOpen size={18} />
                  Book Title
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    className={`w-full bg-[#081120] border rounded-2xl px-5 py-4 pr-10 text-white focus:outline-none ${
                      errors.title
                        ? "border-red-500"
                        : "border-[#c9a84c]/20 focus:border-[#c9a84c]"
                    }`}
                  />
                  {formData.title && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, title: "" }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                      aria-label="Clear title"
                    >
                      <XCircle size={20} />
                    </button>
                  )}
                </div>

                {errors.title && (
                  <p className="text-red-400 text-sm mt-2">{errors.title}</p>
                )}
              </div>

              {/* Subtitle */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 mb-2 text-sm text-gray-300">
                  <FileText size={18} />
                  Subtitle
                </label>

                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="Enter subtitle"
                  className={`w-full bg-[#081120] border rounded-2xl px-5 py-4 text-white focus:outline-none ${
                    errors.subtitle
                      ? "border-red-500"
                      : "border-[#c9a84c]/20 focus:border-[#c9a84c]"
                  }`}
                />

                {errors.subtitle && (
                  <p className="text-red-400 text-sm mt-2">{errors.subtitle}</p>
                )}
              </div>

              {/* Author */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm text-gray-300">
                  <User size={18} />
                  Author
                </label>

                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author"
                  className={`w-full bg-[#081120] border rounded-2xl px-5 py-4 text-white focus:outline-none ${
                    errors.author
                      ? "border-red-500"
                      : "border-[#c9a84c]/20 focus:border-[#c9a84c]"
                  }`}
                />

                {errors.author && (
                  <p className="text-red-400 text-sm mt-2">{errors.author}</p>
                )}
              </div>

              {/* Topic */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm text-gray-300">
                  <Layers size={18} />
                  Topic
                </label>

                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="Enter topic"
                  className={`w-full bg-[#081120] border rounded-2xl px-5 py-4 text-white focus:outline-none ${
                    errors.topic
                      ? "border-red-500"
                      : "border-[#c9a84c]/20 focus:border-[#c9a84c]"
                  }`}
                />

                {errors.topic && (
                  <p className="text-red-400 text-sm mt-2">{errors.topic}</p>
                )}
              </div>

              {/* Year */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-sm text-gray-300">
                  <Calendar size={18} />
                  Year
                </label>

                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Enter year"
                  className={`w-full bg-[#081120] border rounded-2xl px-5 py-4 text-white focus:outline-none ${
                    errors.year
                      ? "border-red-500"
                      : "border-[#c9a84c]/20 focus:border-[#c9a84c]"
                  }`}
                />

                {errors.year && (
                  <p className="text-red-400 text-sm mt-2">{errors.year}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-[#c9a84c] hover:bg-[#d8b45a] text-[#081120] py-4 rounded-2xl font-bold text-lg transition-all disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#081120]/30 border-t-[#081120] rounded-full animate-spin"></div>
                  Uploading Book...
                </>
              ) : (
                <>
                  <BookOpen size={22} />
                  Add Book
                </>
              )}
            </button>
          </div>

          {/* Right */}
          <div className="bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Book Cover</h2>

            {/* Upload */}
            <label className="cursor-pointer">
              <div
                className={`border-2 border-dashed rounded-3xl overflow-hidden transition-all ${
                  errors.cover
                    ? "border-red-500"
                    : "border-[#c9a84c]/30 hover:border-[#c9a84c]"
                }`}
              >
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-[420px] object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCover(null);
                        setPreview("");
                      }}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-red-500/80 text-white rounded-full p-1.5 transition-colors"
                      aria-label="Remove cover image"
                    >
                      <XCircle size={22} />
                    </button>
                  </div>
                ) : (
                  <div className="h-[420px] flex flex-col items-center justify-center bg-[#081120]">
                    <Upload className="text-[#c9a84c] mb-4" size={50} />

                    <p className="text-lg font-semibold text-white mb-2">
                      Upload Cover Image
                    </p>

                    <p className="text-gray-400 text-sm text-center px-4">
                      JPG, PNG or JPEG
                    </p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>

            {errors.cover && (
              <p className="text-red-400 text-sm mt-3">{errors.cover}</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
