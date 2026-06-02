import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Music,
  Youtube,
  FileText,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EMPTY_FORM = {
  title: "",
  artist: "",
  description: "",
  type: "audio",
  youtubeLink: "",
  file: null,
};

const TYPE_OPTIONS = [
  { value: "audio", label: "Audio", icon: Music },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "pdf", label: "PDF", icon: FileText },
];

export default function ManageSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // ── Fetch ──────────────────────────────────────────────────────────
  const fetchSongs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3005/api/songs/all");
      setSongs(res.data.data || []);
    } catch {
      toast.error("Failed to load songs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // ── Filter ─────────────────────────────────────────────────────────
  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || song.type === filterType;
    return matchesSearch && matchesType;
  });

  // ── Helpers ────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (song) => {
    setEditTarget(song);
    setForm({
      title: song.title,
      artist: song.artist || "",
      description: song.description || "",
      type: song.type,
      youtubeLink: song.youtubeLink || "",
      file: null,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditTarget(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files?.[0]) {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ── Submit ─────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", form.title.trim());
      data.append("artist", form.artist.trim());
      data.append("description", form.description.trim());
      data.append("type", form.type);

      if (form.type === "youtube") {
        data.append("youtubeLink", form.youtubeLink.trim());
      }
      if (form.file && (form.type === "audio" || form.type === "pdf")) {
        data.append("file", form.file);
      }

      if (editTarget) {
        await axios.put(
          `http://localhost:3005/api/songs/update/${editTarget._id}`,
          data
        );
        toast.success("Song updated successfully");
      } else {
        await axios.post("http://localhost:3005/api/songs/create", data);
        toast.success("Song added successfully");
      }

      closeForm();
      fetchSongs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`http://localhost:3005/api/songs/delete/${deleteId}`);
      toast.success("Song deleted");
      setDeleteId(null);
      fetchSongs();
    } catch {
      toast.error("Failed to delete song");
    }
  };

  const getTypeIcon = (type) => {
    const opt = TYPE_OPTIONS.find((t) => t.value === type);
    if (!opt) return <Music size={16} />;
    const Icon = opt.icon;
    return <Icon size={16} />;
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "audio":
        return "bg-purple-100 text-purple-700";
      case "youtube":
        return "bg-red-100 text-red-700";
      case "pdf":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1E1535] flex items-center gap-2">
            <Music size={24} className="text-[#c9a84c]" />
            Manage Songs
          </h2>
          <p className="text-[#1E1535]/60 text-sm mt-1">
            {songs.length} song{songs.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={openAdd}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#d8b45a] text-[#0d1b2a] px-4 py-2 rounded-lg font-semibold text-sm transition-all"
        >
          <Plus size={16} />
          Add Song
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1E1535]/40"
          />
          <input
            type="text"
            placeholder="Search by title or artist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FFFDF5] border border-[#c9a84c]/30 text-[#1E1535] rounded-lg text-sm focus:outline-none focus:border-[#c9a84c] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {[{ value: "all", label: "All" }, ...TYPE_OPTIONS].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterType(opt.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                filterType === opt.value
                  ? "bg-[#c9a84c] text-[#0d1b2a]"
                  : "bg-[#FFFDF5] border border-[#c9a84c]/30 text-[#1E1535]/70 hover:border-[#c9a84c]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-[#1E1535]/60 text-center py-16">Loading songs...</p>
      ) : filteredSongs.length === 0 ? (
        <p className="text-[#1E1535]/50 text-center py-16">
          {songs.length === 0
            ? 'No songs yet. Click "Add Song" to get started.'
            : "No songs match your search."}
        </p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-[#c9a84c]/20">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#FFFDF5] text-[#c9a84c] uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Artist</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSongs.map((song) => (
                  <tr
                    key={song._id}
                    className="bg-white border-b border-[#c9a84c]/10"
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[#1E1535]">
                        {song.title}
                      </p>
                      {song.description && (
                        <p className="text-[#1E1535]/60 text-xs truncate max-w-[200px]">
                          {song.description}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#1E1535]/70">
                      {song.artist}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(song.type)}`}
                      >
                        {getTypeIcon(song.type)}
                        {song.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#1E1535]/70 text-xs">
                      {new Date(song.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(song)}
                          className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteId(song._id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {filteredSongs.map((song) => (
              <div
                key={song._id}
                className="bg-white border border-[#c9a84c]/20 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-[#1E1535] font-semibold text-sm">
                      {song.title}
                    </h3>
                    <p className="text-[#c9a84c] text-xs mt-1">{song.artist}</p>
                    {song.description && (
                      <p className="text-[#1E1535]/60 text-xs mt-1 line-clamp-2">
                        {song.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(song.type)}`}
                  >
                    {getTypeIcon(song.type)}
                    {song.type}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#1E1535]/60 text-xs">
                    {new Date(song.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(song)}
                      className="p-2 bg-blue-500/10 rounded-lg text-blue-400"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteId(song._id)}
                      className="p-2 bg-red-500/10 rounded-lg text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add / Edit Form Modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-[#c9a84c]/30 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-[#1E1535]">
                  {editTarget ? "Edit Song" : "Add New Song"}
                </h3>
                <button
                  onClick={closeForm}
                  className="text-[#1E1535]/60 hover:text-[#1E1535] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm text-[#1E1535]/60 mb-1">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 text-[#1E1535] rounded-lg px-3 py-2 focus:outline-none focus:border-[#c9a84c] transition-colors"
                    placeholder="e.g. Amazing Grace"
                  />
                </div>

                {/* Artist */}
                <div>
                  <label className="block text-sm text-[#1E1535]/60 mb-1">
                    Artist
                  </label>
                  <input
                    name="artist"
                    value={form.artist}
                    onChange={handleChange}
                    className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 text-[#1E1535] rounded-lg px-3 py-2 focus:outline-none focus:border-[#c9a84c] transition-colors"
                    placeholder="e.g. PBM Worship Team"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-[#1E1535]/60 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={2}
                    className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 text-[#1E1535] rounded-lg px-3 py-2 focus:outline-none focus:border-[#c9a84c] transition-colors resize-none"
                    placeholder="Brief description..."
                  />
                </div>

                {/* Type Selection */}
                <div>
                  <label className="block text-sm text-[#1E1535]/60 mb-1">
                    Type <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    {TYPE_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              type: opt.value,
                              file: null,
                              youtubeLink: "",
                            }))
                          }
                          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                            form.type === opt.value
                              ? "bg-[#c9a84c] text-[#0d1b2a]"
                              : "bg-[#FFFDF5] border border-[#c9a84c]/30 text-[#1E1535]/70 hover:border-[#c9a84c]"
                          }`}
                        >
                          <Icon size={16} />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic field based on type */}
                {form.type === "youtube" ? (
                  <div>
                    <label className="block text-sm text-[#1E1535]/60 mb-1">
                      YouTube Link <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="youtubeLink"
                      value={form.youtubeLink}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 text-[#1E1535] rounded-lg px-3 py-2 focus:outline-none focus:border-[#c9a84c] transition-colors"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm text-[#1E1535]/60 mb-1">
                      {form.type === "audio" ? "Audio File" : "PDF File"}{" "}
                      {!editTarget && (
                        <span className="text-red-400">*</span>
                      )}
                      {editTarget && (
                        <span className="text-xs text-[#1E1535]/50">
                          (leave empty to keep current)
                        </span>
                      )}
                    </label>
                    <input
                      name="file"
                      type="file"
                      accept={
                        form.type === "audio" ? "audio/*" : "application/pdf"
                      }
                      onChange={handleChange}
                      className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 text-[#1E1535] rounded-lg px-3 py-2 focus:outline-none focus:border-[#c9a84c] transition-colors file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-[#c9a84c]/20 file:text-[#1E1535]"
                    />
                    {editTarget?.fileUrl && (
                      <p className="text-xs text-[#1E1535]/50 mt-1">
                        Current file uploaded
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="flex-1 border border-[#c9a84c]/30 text-[#1E1535]/70 hover:text-[#1E1535] rounded-lg py-2 text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#c9a84c] hover:bg-[#d8b45a] disabled:opacity-60 disabled:cursor-not-allowed text-[#0d1b2a] font-semibold rounded-lg py-2 text-sm transition-all"
                  >
                    {submitting
                      ? "Saving..."
                      : editTarget
                        ? "Update Song"
                        : "Add Song"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-red-500/30 rounded-2xl p-6 w-full max-w-sm text-center"
            >
              <Trash2 size={36} className="text-red-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#1E1535] mb-2">
                Delete Song?
              </h3>
              <p className="text-[#1E1535]/60 text-sm mb-5">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 border border-[#c9a84c]/30 text-[#1E1535]/70 hover:text-[#1E1535] rounded-lg py-2 text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 text-sm transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
