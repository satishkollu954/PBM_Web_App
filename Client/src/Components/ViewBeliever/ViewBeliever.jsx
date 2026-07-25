import { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Edit,
  Trash2,
  Save,
} from "lucide-react";

const AGE_GROUPS = [
  { value: "children", label: "Children (0–12 yrs)", min: 0, max: 12 },
  { value: "youth", label: "Youth (13–35 yrs)", min: 13, max: 35 },
  { value: "middleaged", label: "Middle Aged (36–59 yrs)", min: 36, max: 59 },
  { value: "elders", label: "Elders / Seniors (60+ yrs)", min: 60, max: Infinity },
];

export function ViewBeliever() {
  const [believers, setBelievers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [updateLoading, setUpdateLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [fetchError, setFetchError] = useState("");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBeliever, setSelectedBeliever] = useState(null);

  const [deleteModal, setDeleteModal] = useState(null);

  const [editMode, setEditMode] = useState(false);

  const [editData, setEditData] = useState({});

  const [imagePreview, setImagePreview] = useState("");

  const [isDirty, setIsDirty] = useState(false);

  // Filters
  const [selectedChurch, setSelectedChurch] = useState("");

  const [selectedDay, setSelectedDay] = useState("");

  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");

  const [selectedGender, setSelectedGender] = useState("");

  const believersPerPage = 10;

  // Church Day Mapping
  const churchDayMapping = {
    Nagullanka: ["Friday", "Sunday"],

    Marteru: ["Saturday", "Sunday"],
  };

  // Fetch Believers
  const fetchBelievers = async () => {
    try {
      setFetchError("");

      const response = await axios.get(
        "http://localhost:3005/api/believers/all",
      );

      setBelievers(response.data.data || []);
    } catch (error) {
      console.log(error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch believers";

      setFetchError(errorMessage);

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load Data
  useEffect(() => {
    const loadBelievers = async () => {
      await fetchBelievers();
    };

    loadBelievers();
  }, []);

  // Delete Believer
  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);

      await axios.delete(`http://localhost:3005/api/believers/delete/${id}`);

      toast.success("Believer deleted successfully");

      setDeleteModal(null);

      setSelectedBeliever(null);

      fetchBelievers();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete believer");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Edit
  const handleEditClick = (believer) => {
    setEditMode(true);

    setEditData({
      ...believer,
      photo: null,
    });

    setImagePreview(believer.photo);

    setIsDirty(false);
  };

  // Input Change
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });

    setIsDirty(true);
  };

  // Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEditData({
        ...editData,
        photo: file,
      });

      setImagePreview(URL.createObjectURL(file));

      setIsDirty(true);
    }
  };

  // Update Believer
  const handleUpdate = async () => {
    try {
      setUpdateLoading(true);

      const formData = new FormData();

      Object.keys(editData).forEach((key) => {
        if (editData[key] !== null) {
          formData.append(key, editData[key]);
        }
      });

      const response = await axios.put(
        `http://localhost:3005/api/believers/update/${selectedBeliever._id}`,
        formData,
      );

      toast.success(response.data.message || "Believer updated successfully");

      setEditMode(false);

      setSelectedBeliever(null);

      setIsDirty(false);

      fetchBelievers();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || error.message || "Update failed",
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  // Search + Filters
  const filteredBelievers = believers.filter((believer) => {
    const matchesSearch =
      believer.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      believer.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      believer.address?.toLowerCase().includes(search.toLowerCase()) ||
      believer.churchBelongsTo?.toLowerCase().includes(search.toLowerCase()) ||
      believer.daysCategory?.toLowerCase().includes(search.toLowerCase());

    const matchesChurch = selectedChurch
      ? believer.churchBelongsTo === selectedChurch
      : true;

    const matchesDay = selectedDay
      ? believer.daysCategory === selectedDay
      : true;

    const matchesAgeGroup = selectedAgeGroup
      ? (() => {
          const group = AGE_GROUPS.find((g) => g.value === selectedAgeGroup);
          const age = Number(believer.age);
          return !isNaN(age) && age >= group.min && age <= group.max;
        })()
      : true;

    const matchesGender = selectedGender
      ? believer.gender === selectedGender
      : true;

    return matchesSearch && matchesChurch && matchesDay && matchesAgeGroup && matchesGender;
  });

  // Counts
  const churchCount = believers.filter(
    (b) => b.churchBelongsTo === selectedChurch,
  ).length;

  const dayCount = believers.filter(
    (b) =>
      b.churchBelongsTo === selectedChurch && b.daysCategory === selectedDay,
  ).length;

  // Pagination
  const indexOfLast = currentPage * believersPerPage;

  const indexOfFirst = indexOfLast - believersPerPage;

  const currentBelievers = filteredBelievers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredBelievers.length / believersPerPage);

  return (
    <section className="min-h-screen text-[#1E1535]">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-5 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-[#c9a84c] mb-2">Believers</h1>

          <p className="text-[#1E1535]/60">Manage all church believers</p>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E1535]/60"
            size={20}
          />

          <input
            type="text"
            placeholder="Search believer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#c9a84c]/30 rounded-2xl py-3 pl-12 pr-4 text-[#1E1535] focus:outline-none focus:border-[#c9a84c]"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-4">
        {/* Church Filter */}
        <div>
          <label className="block text-[#c9a84c] mb-2 font-semibold">
            Church Filter
          </label>

          <select
            value={selectedChurch}
            onChange={(e) => {
              setSelectedChurch(e.target.value);
              setSelectedDay("");
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-[#c9a84c]/30 rounded-2xl py-3 px-4 text-[#1E1535] focus:outline-none focus:border-[#c9a84c]"
          >
            <option value="">All Churches</option>
            <option value="Nagullanka">Nagullanka</option>
            <option value="Marteru">Marteru</option>
          </select>

          {selectedChurch && (
            <div className="mt-3 bg-white border border-[#c9a84c]/30 rounded-xl px-4 py-3">
              <span className="text-[#1E1535]/70">Total Believers:</span>
              <span className="text-[#c9a84c] font-bold ml-2">{churchCount}</span>
            </div>
          )}
        </div>

        {/* Day Filter */}
        <div>
          <label className="block text-[#c9a84c] mb-2 font-semibold">
            Day Category Filter
          </label>

          <select
            value={selectedDay}
            disabled={!selectedChurch}
            onChange={(e) => {
              setSelectedDay(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-[#c9a84c]/30 rounded-2xl py-3 px-4 text-[#1E1535] focus:outline-none focus:border-[#c9a84c] disabled:opacity-50"
          >
            <option value="">All Days</option>
            {selectedChurch &&
              churchDayMapping[selectedChurch]?.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
          </select>

          {selectedDay && (
            <div className="mt-3 bg-white border border-[#c9a84c]/30 rounded-xl px-4 py-3">
              <span className="text-[#1E1535]/70">Day Count:</span>
              <span className="text-[#c9a84c] font-bold ml-2">{dayCount}</span>
            </div>
          )}
        </div>

        {/* Age Group Filter */}
        <div>
          <label className="block text-[#c9a84c] mb-2 font-semibold">
            Age Group Filter
          </label>

          <select
            value={selectedAgeGroup}
            onChange={(e) => {
              setSelectedAgeGroup(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-[#c9a84c]/30 rounded-2xl py-3 px-4 text-[#1E1535] focus:outline-none focus:border-[#c9a84c]"
          >
            <option value="">All Ages</option>
            {AGE_GROUPS.map((group) => (
              <option key={group.value} value={group.value}>
                {group.label}
              </option>
            ))}
          </select>
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-[#c9a84c] mb-2 font-semibold">
            Gender Filter
          </label>

          <select
            value={selectedGender}
            onChange={(e) => {
              setSelectedGender(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white border border-[#c9a84c]/30 rounded-2xl py-3 px-4 text-[#1E1535] focus:outline-none focus:border-[#c9a84c]"
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* Results summary */}
      <div className="mb-8 bg-white border border-[#c9a84c]/30 rounded-xl px-4 py-3 flex items-center justify-between">
        <span className="text-[#1E1535]/70 text-sm">Showing results</span>
        <span className="text-[#c9a84c] font-bold">{filteredBelievers.length} believers</span>
      </div>

      {/* Fetch Error */}
      {fetchError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6">
          {fetchError}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="w-12 h-12 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
            {currentBelievers.map((believer) => (
              <div
                key={believer._id}
                className="bg-white border border-[#c9a84c]/30 rounded-2xl overflow-hidden hover:border-[#c9a84c]/50 transition-all duration-300 cursor-pointer hover:-translate-y-1"
                onClick={() => setSelectedBeliever(believer)}
              >
                {/* Image */}
                <div className="h-64 bg-[#FFFDF5] flex items-center justify-center overflow-hidden">
                  <img
                    src={believer.photo}
                    alt={believer.firstName}
                    className="w-full h-full object-contain bg-[#FFFDF5] hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Details */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-[#c9a84c] uppercase truncate">
                    {believer.firstName} {believer.lastName}
                  </h2>

                  <p className="text-sm text-[#1E1535]/70 mt-2 truncate">
                    {believer.phoneNumber}
                  </p>

                  <p className="text-sm text-[#1E1535]/60 truncate">
                    {believer.churchBelongsTo}
                  </p>

                  <p className="text-sm text-[#1E1535]/60">
                    {believer.daysCategory}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty */}
          {currentBelievers.length === 0 && (
            <div className="text-center py-20 text-[#1E1535]/60 text-xl">
              No believers found
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-white border border-[#c9a84c]/30 p-3 rounded-xl disabled:opacity-50"
              >
                <ChevronLeft />
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-white border border-[#c9a84c]/30 p-3 rounded-xl disabled:opacity-50"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Popup */}
      {selectedBeliever && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white border border-[#c9a84c]/30 rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedBeliever(null);

                setEditMode(false);

                setImagePreview("");

                setEditData({});
              }}
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black text-[#1E1535] p-2 rounded-full"
            >
              <X size={22} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6 lg:p-8">
              {/* LEFT IMAGE */}
              <div className="w-full">
                <div className="w-full bg-[#FFFDF5] rounded-2xl overflow-hidden border border-[#c9a84c]/10">
                  <img
                    src={imagePreview || selectedBeliever.photo}
                    alt=""
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>

                {editMode && (
                  <div className="mt-4">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="w-full text-sm text-[#1E1535]/70"
                    />
                  </div>
                )}
              </div>

              {/* RIGHT CONTENT */}
              <div className="w-full">
                {!editMode ? (
                  <>
                    {/* VIEW MODE */}
                    <h2 className="text-2xl sm:text-4xl font-bold text-[#c9a84c] mb-6 break-words">
                      {selectedBeliever.firstName} {selectedBeliever.lastName}
                    </h2>

                    <div className="space-y-4 text-[#1E1535]/70">
                      <p className="break-words">
                        <span className="text-[#1E1535] font-semibold">Phone:</span>{" "}
                        {selectedBeliever.phoneNumber}
                      </p>

                      <p className="break-words">
                        <span className="text-[#1E1535] font-semibold">
                          Address:
                        </span>{" "}
                        {selectedBeliever.address}
                      </p>

                      <p>
                        <span className="text-[#1E1535] font-semibold">
                          Gender:
                        </span>{" "}
                        {selectedBeliever.gender}
                      </p>

                      <p>
                        <span className="text-[#1E1535] font-semibold">
                          Age:
                        </span>{" "}
                        {selectedBeliever.age ?? "—"}
                      </p>

                      <p>
                        <span className="text-[#1E1535] font-semibold">
                          Church:
                        </span>{" "}
                        {selectedBeliever.churchBelongsTo}
                      </p>

                      <p>
                        <span className="text-[#1E1535] font-semibold">Day:</span>{" "}
                        {selectedBeliever.daysCategory}
                      </p>

                      <p className="break-words">
                        <span className="text-[#1E1535] font-semibold">
                          Family:
                        </span>{" "}
                        {selectedBeliever.familyMemberName}
                      </p>

                      <p>
                        <span className="text-[#1E1535] font-semibold">
                          Pincode:
                        </span>{" "}
                        {selectedBeliever.pinCode}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      <button
                        onClick={() => handleEditClick(selectedBeliever)}
                        className="flex-1 bg-[#c9a84c] text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#d8b45a] transition-all"
                      >
                        <Edit size={18} />
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteModal(selectedBeliever)}
                        className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* EDIT MODE */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#c9a84c] mb-6">
                      Edit Believer
                    </h2>

                    <div className="space-y-4">
                      <input
                        type="text"
                        name="firstName"
                        value={editData.firstName || ""}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl px-4 py-3"
                      />

                      <input
                        type="text"
                        name="lastName"
                        value={editData.lastName || ""}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl px-4 py-3"
                      />

                      <input
                        type="text"
                        name="phoneNumber"
                        value={editData.phoneNumber || ""}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl px-4 py-3"
                      />

                      <select
                        name="gender"
                        value={editData.gender || ""}
                        onChange={handleChange}
                        className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl px-4 py-3"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>

                      <input
                        type="number"
                        name="age"
                        min="0"
                        max="120"
                        value={editData.age ?? ""}
                        onChange={handleChange}
                        placeholder="Age"
                        className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl px-4 py-3"
                      />

                      <textarea
                        name="address"
                        value={editData.address || ""}
                        onChange={handleChange}
                        placeholder="Address"
                        rows={4}
                        className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl px-4 py-3 resize-none"
                      />

                      <input
                        type="text"
                        name="pinCode"
                        value={editData.pinCode || ""}
                        onChange={handleChange}
                        placeholder="Pin Code"
                        className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl px-4 py-3"
                      />

                      {/* Church */}
                      <select
                        name="churchBelongsTo"
                        value={editData.churchBelongsTo || ""}
                        onChange={(e) => {
                          setEditData({
                            ...editData,

                            churchBelongsTo: e.target.value,

                            daysCategory: "",
                          });

                          setIsDirty(true);
                        }}
                        className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl px-4 py-3"
                      >
                        <option value="">Select Church</option>

                        <option value="Nagullanka">Nagullanka</option>

                        <option value="Marteru">Marteru</option>
                      </select>

                      {/* Day */}
                      <select
                        name="daysCategory"
                        value={editData.daysCategory || ""}
                        onChange={handleChange}
                        disabled={!editData.churchBelongsTo}
                        className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl px-4 py-3 disabled:opacity-50"
                      >
                        <option value="">Select Day</option>

                        {editData.churchBelongsTo === "Nagullanka" && (
                          <>
                            <option value="Friday">Friday</option>

                            <option value="Sunday">Sunday</option>
                          </>
                        )}

                        {editData.churchBelongsTo === "Marteru" && (
                          <>
                            <option value="Saturday">Saturday</option>

                            <option value="Sunday">Sunday</option>
                          </>
                        )}
                      </select>

                      <input
                        type="text"
                        name="familyMemberName"
                        value={editData.familyMemberName || ""}
                        onChange={handleChange}
                        placeholder="Family Member Name"
                        className="w-full bg-[#FFFDF5] border border-[#c9a84c]/30 rounded-xl px-4 py-3"
                      />

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                          disabled={!isDirty || updateLoading}
                          onClick={handleUpdate}
                          className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            isDirty && !updateLoading
                              ? "bg-[#c9a84c] text-black hover:bg-[#d8b45a]"
                              : "bg-gray-200 text-[#1E1535]/60 cursor-not-allowed"
                          }`}
                        >
                          {updateLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                              Updating...
                            </>
                          ) : (
                            <>
                              <Save size={18} />
                              Save Changes
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => {
                            setEditMode(false);

                            setEditData({});

                            setImagePreview("");

                            setIsDirty(false);
                          }}
                          disabled={updateLoading}
                          className="flex-1 bg-gray-200 hover:bg-gray-200 text-[#1E1535] py-3 rounded-xl font-bold transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white border border-red-500/30 rounded-2xl p-8 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              Delete Believer
            </h2>

            <p className="text-[#1E1535]/70 mb-8">
              Are you sure you want to delete this believer?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 bg-gray-200 py-3 rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteModal._id)}
                disabled={deleteLoading}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl disabled:opacity-70"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
