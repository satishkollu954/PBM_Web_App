// ViewContact.jsx

import { useEffect, useState } from "react";

import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";

import {
  Trash2,
  Phone,
  Mail,
  Search,
  X,
  MessageSquare,
  Calendar,
} from "lucide-react";

import { toast } from "react-toastify";

export function ViewContact() {
  const [contacts, setContacts] = useState([]);

  const [filteredContacts, setFilteredContacts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedContact, setSelectedContact] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const [loading, setLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const contactsPerPage = 8;

  // Fetch Contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);

      const response = await axios.get("http://localhost:3005/api/contact/all");

      setContacts(response.data.data);

      setFilteredContacts(response.data.data);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Search
  useEffect(() => {
    const filtered = contacts.filter(
      (contact) =>
        contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredContacts(filtered);

    setCurrentPage(1);
  }, [searchTerm, contacts]);

  // Delete Contact
  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      const response = await axios.delete(
        `http://localhost:3005/api/contact/delete/${deleteId}`,
      );

      toast.success(response.data.message);

      setDeleteModal(false);

      setDeleteId("");

      fetchContacts();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Pagination Logic
  const indexOfLast = currentPage * contactsPerPage;

  const indexOfFirst = indexOfLast - contactsPerPage;

  const currentContacts = filteredContacts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <div className="text-white">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">View Contacts</h2>

          <p className="text-gray-400 mt-2">
            Manage all contact form submissions
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search by name, phone, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#c9a84c]"
          />
        </div>
      </div>

      {/* Count */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-3 bg-[#0d1b2a] border border-[#c9a84c]/20 px-5 py-3 rounded-2xl">
          <MessageSquare className="text-[#c9a84c]" size={22} />

          <span className="text-lg font-semibold">Total Contacts:</span>

          <span className="text-[#c9a84c] font-bold text-xl">
            {filteredContacts.length}
          </span>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-14 h-14 border-4 border-[#c9a84c]/20 border-t-[#c9a84c] rounded-full animate-spin"></div>
        </div>
      ) : currentContacts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No contacts found</div>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {currentContacts.map((contact) => (
              <motion.div
                key={contact._id}
                whileHover={{
                  y: -5,
                }}
                className="bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-3xl overflow-hidden hover:border-[#c9a84c]/50 transition-all"
              >
                {/* Card Header */}
                <div className="p-5 border-b border-[#c9a84c]/10">
                  <h3 className="text-xl font-bold text-white truncate">
                    {contact.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                    <Calendar size={15} />

                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#c9a84c]" />

                    <span className="text-gray-300">{contact.phoneNumber}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-[#c9a84c]" />

                    <span className="text-gray-300 truncate">
                      {contact.email || "N/A"}
                    </span>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm mb-2">Message</p>

                    <p className="text-gray-300 line-clamp-3 text-sm leading-relaxed">
                      {contact.message || "No message"}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="p-5 border-t border-[#c9a84c]/10 flex gap-3">
                  <button
                    onClick={() => setSelectedContact(contact)}
                    className="flex-1 bg-[#c9a84c] hover:bg-[#d8b45a] text-[#081120] py-2 rounded-xl font-semibold transition-all"
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(contact._id);

                      setDeleteModal(true);
                    }}
                    className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 p-2 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-3 flex-wrap">
              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-11 h-11 rounded-xl font-semibold transition-all ${
                      currentPage === i + 1
                        ? "bg-[#c9a84c] text-[#081120]"
                        : "bg-[#0d1b2a] border border-[#c9a84c]/20 text-white hover:border-[#c9a84c]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ),
              )}
            </div>
          )}
        </>
      )}

      {/* View Modal */}
      <AnimatePresence>
        {selectedContact && (
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              className="bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#c9a84c]/10">
                <h3 className="text-2xl font-bold">Contact Details</h3>

                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-gray-500 text-sm mb-2">Name</p>

                  <p className="text-xl font-semibold">
                    {selectedContact.name}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Phone Number</p>

                  <p className="text-lg">{selectedContact.phoneNumber}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Email</p>

                  <p className="text-lg">{selectedContact.email || "N/A"}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-2">Message</p>

                  <div className="bg-[#081120] border border-[#c9a84c]/10 rounded-2xl p-5 leading-relaxed text-gray-300">
                    {selectedContact.message || "No message"}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModal && (
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              className="bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-3xl w-full max-w-md p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Delete Contact
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8">
                Are you sure you want to delete this contact?
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteModal(false)}
                  className="flex-1 border border-[#c9a84c]/20 hover:border-[#c9a84c] py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition-all disabled:opacity-70"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
