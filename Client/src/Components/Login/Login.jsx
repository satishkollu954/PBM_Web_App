import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { Eye, EyeOff } from "lucide-react";

import { useCookies } from "react-cookie";

export default function Login() {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["isAdminLoggedIn"]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        formData,
      );

      if (response.data.success) {
        setCookie("isAdminLoggedIn", true, {
          path: "/",
          maxAge: 60 * 60 * 24,
        });

        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FFFDF5] flex items-center justify-center mt-8 px-6 py-20">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="w-full max-w-md bg-white border border-[#c9a84c]/30 rounded-2xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-cinzel font-bold text-[#c9a84c] mb-3">
            Admin Login
          </h1>

          <p className="text-[#1E1535]/60">Welcome back to PBM Church</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm text-[#1E1535]/70 mb-2 uppercase tracking-wider font-semibold">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
              className="w-full px-4 py-3 bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl text-[#1E1535] placeholder-[#1E1535]/40 focus:outline-none focus:border-[#c9a84c] transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-[#1E1535]/70 mb-2 uppercase tracking-wider font-semibold">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl text-[#1E1535] placeholder-[#1E1535]/40 focus:outline-none focus:border-[#c9a84c] transition-colors pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#1E1535]/40 hover:text-[#c9a84c]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c9a84c] hover:bg-[#d8b45a] text-[#0d1b2a] font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
