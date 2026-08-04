import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import { Plus, Upload, X, Pencil, Trash2, ExternalLink } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/sermons`;



export function AddSermons() {
  const [showModal, setShowModal] = useState(false);

  const [sermons, setSermons] = useState([]);

  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    youtubeLink: "",
  });

  const [thumbnailImage, setThumbnailImage] = useState(null);

  const [preview, setPreview] = useState("");

  /* ---------------------------------------
     FETCH SERMONS
  --------------------------------------- */
  const fetchSermons = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);

      setSermons(response.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSermons();
  }, []);

  /* ---------------------------------------
     HANDLE CHANGE
  --------------------------------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------------------------------
     IMAGE CHANGE
  --------------------------------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setThumbnailImage(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  /* ---------------------------------------
     RESET FORM
  --------------------------------------- */
  const resetForm = () => {
    setFormData({
      title: "",
      youtubeLink: "",
    });

    setThumbnailImage(null);

    setPreview("");

    setEditId(null);
  };

  /* ---------------------------------------
     SUBMIT
  --------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const submitData = new FormData();

      submitData.append("title", formData.title);

      submitData.append("youtubeLink", formData.youtubeLink);

      if (thumbnailImage) {
        submitData.append("thumbnailImage", thumbnailImage);
      }

      if (editId) {
        await axios.put(`${API_URL}/update/${editId}`, submitData);

        toast.success("Sermon updated successfully");
      } else {
        await axios.post(`${API_URL}/create`, submitData);

        toast.success("Sermon added successfully");
      }

      resetForm();

      setShowModal(false);

      fetchSermons();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------
     DELETE
  --------------------------------------- */
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/delete/${deleteId}`);

      toast.success("Sermon deleted successfully");

      setDeleteId(null);

      fetchSermons();
    } catch (error) {
      toast.error("Failed to delete sermon");
    }
  };

  /* ---------------------------------------
     EDIT
  --------------------------------------- */
  const handleEdit = (sermon) => {
    setEditId(sermon._id);

    setFormData({
      title: sermon.title,
      youtubeLink: sermon.youtubeLink,
    });

    setPreview(sermon.thumbnailImage);

    setShowModal(true);
  };

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#081120]">
              Manage Sermons
            </h1>

            <p className="text-gray-500 mt-2">{sermons.length} sermons total</p>
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={() => {
              resetForm();

              setShowModal(true);
            }}
            className="bg-[#c9a84c] hover:bg-[#b8953e] text-[#081120] px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg transition"
          >
            <Plus size={22} />
            Add Sermon
          </button>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block bg-white rounded-[28px] overflow-hidden border border-[#e7dcc0] shadow-sm">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-12 px-6 py-5 bg-[#faf7ef] border-b border-[#eee2c7] text-[#c9a84c] font-semibold">
            <div className="col-span-2">Thumbnail</div>

            <div className="col-span-4">Title</div>

            <div className="col-span-4">YouTube Link</div>

            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* ROWS */}
          {sermons.map((sermon) => (
            <div
              key={sermon._id}
              className="grid grid-cols-12 px-6 py-5 border-b border-gray-100 items-center hover:bg-[#faf8f2]"
            >
              {/* IMAGE */}
              <div className="col-span-2">
                <img
                  src={sermon.thumbnailImage}
                  alt={sermon.title}
                  className="w-28 h-20 rounded-xl object-cover"
                />
              </div>

              {/* TITLE */}
              <div className="col-span-4">
                <h3 className="font-bold text-[#081120] text-lg">
                  {sermon.title}
                </h3>
              </div>

              {/* LINK */}
              <div className="col-span-4">
                <button
                  onClick={() => window.open(sermon.youtubeLink, "_blank")}
                  className="text-blue-500 hover:underline flex items-center gap-2"
                >
                  Open Sermon
                  <ExternalLink size={16} />
                </button>
              </div>

              {/* ACTIONS */}
              <div className="col-span-2 flex justify-center gap-4">
                {/* EDIT */}
                <button
                  onClick={() => handleEdit(sermon)}
                  className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center hover:scale-110 transition"
                >
                  <Pencil size={18} />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => setDeleteId(sermon._id)}
                  className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:scale-110 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE CARDS */}
        <div className="grid gap-5 lg:hidden">
          {sermons.map((sermon) => (
            <div
              key={sermon._id}
              className="bg-white rounded-[24px] p-4 border border-[#eee2c7] shadow-sm"
            >
              <div className="flex gap-4">
                {/* IMAGE */}
                <img
                  src={sermon.thumbnailImage}
                  alt={sermon.title}
                  className="w-24 h-24 rounded-2xl object-cover"
                />

                {/* CONTENT */}
                <div className="flex-1">
                  <h3 className="font-bold text-[#081120] text-lg leading-snug">
                    {sermon.title}
                  </h3>

                  <button
                    onClick={() => window.open(sermon.youtubeLink, "_blank")}
                    className="text-[#c9a84c] mt-3 text-sm flex items-center gap-2"
                  >
                    Open Sermon
                    <ExternalLink size={16} />
                  </button>

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-4">
                    {/* EDIT */}
                    <button
                      onClick={() => handleEdit(sermon)}
                      className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => setDeleteId(sermon._id)}
                      className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ADD / EDIT MODAL */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{
                  scale: 0.9,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0.9,
                }}
                className="bg-white rounded-[30px] w-full max-w-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              >
                {/* TOP */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-[#081120]">
                    {editId ? "Edit Sermon" : "Add Sermon"}
                  </h2>

                  <button
                    onClick={() => {
                      setShowModal(false);

                      resetForm();
                    }}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                  {/* TITLE */}
                  <div className="mb-5">
                    <label className="font-medium text-[#081120] mb-2 block">
                      Sermon Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter sermon title"
                      className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                      required
                    />
                  </div>

                  {/* YOUTUBE */}
                  <div className="mb-5">
                    <label className="font-medium text-[#081120] mb-2 block">
                      YouTube Link
                    </label>

                    <input
                      type="url"
                      name="youtubeLink"
                      value={formData.youtubeLink}
                      onChange={handleChange}
                      placeholder="https://youtube.com/..."
                      className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                      required
                    />
                  </div>

                  {/* IMAGE */}
                  <div className="mb-6">
                    <label className="font-medium text-[#081120] mb-3 block">
                      Thumbnail
                    </label>

                    <label className="cursor-pointer">
                      <div className="border-2 border-dashed border-[#c9a84c]/40 rounded-3xl overflow-hidden">
                        {preview ? (
                          <img
                            src={preview}
                            alt=""
                            className="w-full h-[250px] object-cover"
                          />
                        ) : (
                          <div className="h-[250px] flex flex-col items-center justify-center bg-[#faf8f2]">
                            <Upload size={45} className="text-[#c9a84c] mb-4" />

                            <p className="font-semibold text-gray-600">
                              Upload Thumbnail
                            </p>
                          </div>
                        )}
                      </div>

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#c9a84c] hover:bg-[#b8953e] text-[#081120] py-4 rounded-2xl font-bold text-lg transition"
                  >
                    {loading
                      ? "Please wait..."
                      : editId
                        ? "Update Sermon"
                        : "Add Sermon"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DELETE MODAL */}
        <AnimatePresence>
          {deleteId && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{
                  scale: 0.9,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0.9,
                }}
                className="bg-white rounded-[28px] w-full max-w-md p-8 shadow-2xl"
              >
                {/* ICON */}
                <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
                  <Trash2 size={36} className="text-red-500" />
                </div>

                {/* TITLE */}
                <h2 className="text-3xl font-bold text-center text-[#081120] mb-3">
                  Delete Sermon
                </h2>

                {/* MESSAGE */}
                <p className="text-center text-gray-500 leading-relaxed mb-8">
                  Are you sure you want to delete this sermon? This action
                  cannot be undone.
                </p>

                {/* BUTTONS */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setDeleteId(null)}
                    className="flex-1 py-4 rounded-2xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDelete}
                    className="flex-1 py-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold transition shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
