import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  BookOpen,
  Calendar,
  Music,
  LogOut,
  Menu,
  X,
  Youtube,
  MessageSquare,
  FileText,
} from "lucide-react";

import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

// Components
import { AddBeliever } from "../AddBelievers/addBelivers";

import { ViewBeliever } from "../ViewBeliever/ViewBeliever";

import { AddSermons } from "../AddSermons/AddSermons";
import { ViewContact } from "../ViewContact/ViewContact";

import ManageBooks from "./ManageBooks";
import ManageArticles from "./ManageArticles";
import ManageSongs from "./ManageSongs";
import { AddEvent } from "../AddEvent/AddEvent";

export default function Dashboard() {
  const navigate = useNavigate();

  const [, , removeCookie] = useCookies(["isAdminLoggedIn"]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Dynamic Counts
  const [dashboardData, setDashboardData] = useState({
    totalBelievers: 0,

    nagullankaCount: 0,

    marteruCount: 0,

    nagFridayCount: 0,

    nagSundayCount: 0,

    marSaturdayCount: 0,

    marSundayCount: 0,

    booksCount: 0,

    eventsCount: 0,

    songsCount: 0,

    sermonsCount: 0,
  });

  // Fetch Dashboard Counts

  // Fetch Dashboard Counts
  const fetchDashboardCounts = async () => {
    try {
      // Believers
      const believersResponse = await axios.get(
        `${API_BASE_URL}/api/believers/all`,
      );

      const believers = believersResponse.data.data || [];

      // Books
      let books = [];

      try {
        const booksResponse = await axios.get(
          `${API_BASE_URL}/api/books/all`,
        );

        books = booksResponse.data.data || [];
      } catch {
        console.log("Books API not available");
      }

      // Events
      let events = [];

      try {
        const eventsResponse = await axios.get(
          `${API_BASE_URL}/api/events/all`,
        );

        events = eventsResponse.data.data || [];
      } catch {
        console.log("Events API not available");
      }

      // Songs
      let songs = [];

      try {
        const songsResponse = await axios.get(
          `${API_BASE_URL}/api/songs/all`,
        );

        songs = songsResponse.data.data || [];
      } catch {
        console.log("Songs API not available");
      }

      // Sermons
      let sermons = [];

      try {
        const sermonsResponse = await axios.get(
          `${API_BASE_URL}/api/sermons/all`,
        );

        sermons = sermonsResponse.data.data || [];
      } catch {
        console.log("Sermons API not available");
      }

      // Set Counts
      setDashboardData({
        totalBelievers: believers.length,

        nagullankaCount: believers.filter(
          (b) => b.churchBelongsTo === "Nagullanka",
        ).length,

        marteruCount: believers.filter((b) => b.churchBelongsTo === "Marteru")
          .length,

        nagFridayCount: believers.filter(
          (b) =>
            b.churchBelongsTo === "Nagullanka" && b.daysCategory === "Friday",
        ).length,

        nagSundayCount: believers.filter(
          (b) =>
            b.churchBelongsTo === "Nagullanka" && b.daysCategory === "Sunday",
        ).length,

        marSaturdayCount: believers.filter(
          (b) =>
            b.churchBelongsTo === "Marteru" && b.daysCategory === "Saturday",
        ).length,

        marSundayCount: believers.filter(
          (b) => b.churchBelongsTo === "Marteru" && b.daysCategory === "Sunday",
        ).length,

        booksCount: books.length,

        eventsCount: events.length,

        songsCount: songs.length,

        sermonsCount: sermons.length,
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to load dashboard data",
      );
    }
  };

  // useEffect
  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  // Logout
  const handleLogout = () => {
    removeCookie("isAdminLoggedIn", {
      path: "/",
    });

    navigate("/");
  };

  // Sidebar Items
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Add Believer",
      icon: UserPlus,
    },

    {
      name: "View Believers",
      icon: Users,
    },

    {
      name: "Books",
      icon: BookOpen,
    },
    {
      name: "Articles",
      icon: FileText,
    },
    {
      name: "Events",
      icon: Calendar,
    },

    {
      name: "Songs",
      icon: Music,
    },
    {
      name: "Sermons",
      icon: Youtube,
    },
    {
      name: "Contacts",
      icon: MessageSquare,
    },
  ];

  // Render Components
  const renderContent = () => {
    switch (activeMenu) {
      case "Add Believer":
        return <AddBeliever />;

      case "View Believers":
        return <ViewBeliever />;

      case "Books":
        return <ManageBooks />;

      case "Articles":
        return <ManageArticles />;

      case "Sermons":
        return <AddSermons />;

      case "Contacts":
        return <ViewContact />;

      case "Events":
        return <AddEvent />;

      case "Songs":
        return <ManageSongs />;

      default:
        return (
          <>
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Total Believers */}
              <div className="bg-white border border-[#c9a84c]/30 rounded-3xl p-6 hover:border-[#c9a84c]/60 transition-all shadow-sm">
                <h3 className="text-[#1E1535]/60 text-sm mb-3">
                  Total Believers
                </h3>

                <p className="text-5xl font-bold text-[#c9a84c]">
                  {dashboardData.totalBelievers}
                </p>
              </div>

              {/* Nagullanka */}
              <div className="bg-white border border-[#c9a84c]/30 rounded-3xl p-6 shadow-sm">
                <h3 className="text-[#1E1535]/60 text-sm mb-3">
                  Nagullanka Believers
                </h3>

                <p className="text-5xl font-bold text-[#c9a84c]">
                  {dashboardData.nagullankaCount}
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1E1535]/60">Friday</span>

                    <span className="text-[#1E1535] font-bold">
                      {dashboardData.nagFridayCount}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#1E1535]/60">Sunday</span>

                    <span className="text-[#1E1535] font-bold">
                      {dashboardData.nagSundayCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Marteru */}
              <div className="bg-white border border-[#c9a84c]/30 rounded-3xl p-6 shadow-sm">
                <h3 className="text-[#1E1535]/60 text-sm mb-3">
                  Marteru Believers
                </h3>

                <p className="text-5xl font-bold text-[#c9a84c]">
                  {dashboardData.marteruCount}
                </p>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1E1535]/60">Saturday</span>

                    <span className="text-[#1E1535] font-bold">
                      {dashboardData.marSaturdayCount}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#1E1535]/60">Sunday</span>

                    <span className="text-[#1E1535] font-bold">
                      {dashboardData.marSundayCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Books */}
              <div className="bg-white border border-[#c9a84c]/30 rounded-3xl p-6 shadow-sm">
                <h3 className="text-[#1E1535]/60 text-sm mb-3">Books</h3>

                <p className="text-5xl font-bold text-[#c9a84c]">
                  {dashboardData.booksCount}
                </p>
              </div>

              {/* Events */}
              <div className="bg-white border border-[#c9a84c]/30 rounded-3xl p-6 shadow-sm">
                <h3 className="text-[#1E1535]/60 text-sm mb-3">Events</h3>

                <p className="text-5xl font-bold text-[#c9a84c]">
                  {dashboardData.eventsCount}
                </p>
              </div>

              {/* Songs */}
              <div className="bg-white border border-[#c9a84c]/30 rounded-3xl p-6 shadow-sm">
                <h3 className="text-[#1E1535]/60 text-sm mb-3">
                  Worship Songs
                </h3>

                <p className="text-5xl font-bold text-[#c9a84c]">
                  {dashboardData.songsCount}
                </p>
              </div>

              {/* Sermons */}
              <div className="bg-white border border-[#c9a84c]/30 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[#1E1535]/60 text-sm">Youtube Sermons</h3>

                  <Youtube className="text-red-500" size={22} />
                </div>

                <p className="text-5xl font-bold text-[#c9a84c]">
                  {dashboardData.sermonsCount}
                </p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FFFDF5] pt-16 md:pt-20">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 w-72 bg-white border-r border-[#c9a84c]/30 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#c9a84c]/30">
          <div>
            <p className="text-xs text-[#1E1535]/60 uppercase tracking-widest">
              Admin Panel
            </p>
          </div>

          <button
            className="md:hidden text-[#c9a84c]"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveMenu(item.name);

                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeMenu === item.name
                    ? "bg-[#c9a84c]/15 text-[#c9a84c] font-semibold"
                    : "text-[#1E1535] hover:bg-[#c9a84c]/10 hover:text-[#c9a84c]"
                }`}
              >
                <Icon size={20} />

                {item.name}
              </button>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all mt-8"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-[#c9a84c]/30 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#c9a84c]"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-lg font-semibold text-[#c9a84c]">{activeMenu}</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeMenu === "Dashboard" && (
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#1E1535] mb-2">
                Dashboard
              </h2>

              <p className="text-[#1E1535]/60">
                Welcome to PBM Church Admin Dashboard
              </p>
            </div>
          )}

          {renderContent()}
        </main>
      </div>
    </div>
  );
}
