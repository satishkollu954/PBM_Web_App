import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Search,
  Eye,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";

export function AddEvent() {
  const API_URL = "http://localhost:3005/api/events";

  const initialForm = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isActive: false,
  };

  const [formData, setFormData] = useState(initialForm);

  const [bannerImage, setBannerImage] = useState(null);

  const [songSheetPdf, setSongSheetPdf] = useState(null);

  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);

      setEvents(response.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load events");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);

    setBannerImage(null);

    setSongSheetPdf(null);

    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error("Event title is required");
    }

    if (!formData.description.trim()) {
      return toast.error("Description is required");
    }

    if (!formData.startDate) {
      return toast.error("Start Date required");
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      return toast.error("End date cannot be earlier than Start date");
    }

    try {
      setLoading(true);

      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      if (bannerImage) {
        payload.append("bannerImage", bannerImage);
      }

      if (songSheetPdf) {
        payload.append("songSheetPdf", songSheetPdf);
      }

      if (editId) {
        await axios.put(`${API_URL}/update/${editId}`, payload);

        toast.success("Event updated successfully");
      } else {
        await axios.post(`${API_URL}/create`, payload);

        toast.success("Event added successfully");
      }

      setShowFormModal(false);

      resetForm();

      fetchEvents();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setEditId(event._id);

    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate?.slice(0, 10),
      endDate: event.endDate?.slice(0, 10),
      isActive: event.isActive,
    });

    setShowFormModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);

    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/delete/${deleteId}`);

      toast.success("Event deleted");

      fetchEvents();
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setShowDeleteModal(false);

      setDeleteId(null);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-4xl font-cinzel text-[#c9a84c] flex items-center gap-2 md:gap-3">
            <Calendar className="w-5 h-5 md:w-8 md:h-8" />
            Manage Events
          </h2>

          <p className="text-xs md:text-base text-gray-400 mt-1 md:mt-2">
            {events.length} event total
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowFormModal(true);
          }}
          className="bg-[#c9a84c] hover:bg-[#d8b45a] text-black px-4 md:px-8 py-2 md:py-4 rounded-xl md:rounded-2xl font-semibold md:font-bold flex items-center gap-2 md:gap-3 text-sm md:text-base"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          Add Event
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-[#c9a84c]/20">
              <th className="p-4 text-left">Banner</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Start</th>
              <th className="p-4 text-left">End</th>
              <th className="p-4 text-left">PDF</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event._id} className="border-b border-[#c9a84c]/10">
                <td className="p-4">
                  <img
                    src={event.bannerImage}
                    alt=""
                    className="w-24 h-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4">{event.title}</td>

                <td className="p-4">
                  {new Date(event.startDate).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {new Date(event.endDate).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {event.songSheetPdf && (
                    <a
                      href={event.songSheetPdf}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileText />
                    </a>
                  )}
                </td>

                <td className="p-4">
                  {event.isActive ? (
                    <span className="text-green-400">Active</span>
                  ) : (
                    <span className="text-red-400">Inactive</span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(event)}>
                      <Edit className="text-blue-400" />
                    </button>

                    <button onClick={() => confirmDelete(event._id)}>
                      <Trash2 className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-[#020d1f] border border-[#c9a84c]/20 rounded-2xl overflow-hidden"
          >
            <img
              src={event.bannerImage}
              alt={event.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="text-[#c9a84c] text-lg font-bold">
                {event.title}
              </h3>

              <div className="mt-3 text-sm text-gray-300 space-y-1">
                <p>
                  <strong>Start:</strong>{" "}
                  {new Date(event.startDate).toLocaleDateString()}
                </p>

                <p>
                  <strong>End:</strong>{" "}
                  {new Date(event.endDate).toLocaleDateString()}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {event.isActive ? (
                    <span className="text-green-400">Active</span>
                  ) : (
                    <span className="text-red-400">Inactive</span>
                  )}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                {event.songSheetPdf && (
                  <a
                    href={event.songSheetPdf}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#c9a84c]"
                  >
                    <FileText size={22} />
                  </a>
                )}

                <div className="flex gap-4">
                  <button onClick={() => handleEdit(event)}>
                    <Edit className="text-blue-400" />
                  </button>

                  <button onClick={() => confirmDelete(event._id)}>
                    <Trash2 className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#081223] p-8 rounded-2xl border border-[#c9a84c]/20">
            <h3 className="text-2xl text-white mb-6">Delete Event?</h3>

            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 px-6 py-3 rounded-xl"
              >
                Delete
              </button>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-600 px-6 py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#081223] border border-[#c9a84c]/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
              <h2 className="text-3xl font-cinzel text-[#c9a84c]">
                {editId ? "Edit Event" : "Add Event"}
              </h2>

              <button
                onClick={() => {
                  setShowFormModal(false);
                  resetForm();
                }}
                className="text-white text-3xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event Title"
                className="bg-[#020d1f] border border-[#c9a84c]/20 rounded-xl p-4 text-white"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBannerImage(e.target.files[0])}
                className="bg-[#020d1f] border border-[#c9a84c]/20 rounded-xl p-4 text-white"
              />

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Event Description"
                className="md:col-span-2 bg-[#020d1f] border border-[#c9a84c]/20 rounded-xl p-4 text-white"
              />

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Start Date *
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  style={{
                    colorScheme: "dark",
                  }}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full bg-[#020d1f] border border-[#c9a84c]/20 rounded-xl p-4 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  End Date *
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  disabled={!formData.startDate}
                  min={formData.startDate}
                  style={{
                    colorScheme: "dark",
                  }}
                  className="w-full bg-[#020d1f] border border-[#c9a84c]/20 rounded-xl p-4 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setSongSheetPdf(e.target.files[0])}
                className="bg-[#020d1f] border border-[#c9a84c]/20 rounded-xl p-4 text-white"
              />

              <label className="flex items-center gap-3 text-white">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                Active Event
              </label>

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#c9a84c] text-black px-8 py-3 rounded-xl font-bold"
                >
                  {loading
                    ? "Saving..."
                    : editId
                      ? "Update Event"
                      : "Create Event"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowFormModal(false);
                    resetForm();
                  }}
                  className="bg-gray-600 text-white px-8 py-3 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
