import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  Music,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [, , removeCookie] = useCookies(["isAdminLoggedIn"]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Dashboard");

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
      name: "Believers",
      icon: Users,
    },

    {
      name: "Books",
      icon: BookOpen,
    },

    {
      name: "Events",
      icon: Calendar,
    },

    {
      name: "Songs",
      icon: Music,
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-96px)] bg-[#081120] pt-24">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 w-72 bg-[#0d1b2a] border-r border-[#c9a84c]/20 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-[#c9a84c]/20">
          <div>
            <h1 className="text-2xl font-bold text-[#c9a84c]">PBM Church</h1>

            <p className="text-xs text-gray-400 uppercase tracking-widest">
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
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeMenu === item.name
                    ? "bg-[#c9a84c]/15 text-[#c9a84c]"
                    : "text-gray-300 hover:bg-[#c9a84c]/10 hover:text-[#c9a84c]"
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-8"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#0d1b2a] border-b border-[#c9a84c]/20 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#c9a84c]"
          >
            <Menu size={24} />
          </button>

          <h1 className="text-lg font-semibold text-[#c9a84c]">Dashboard</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{activeMenu}</h2>

            <p className="text-gray-400">
              Welcome to PBM Church Admin Dashboard
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-2xl p-6">
              <h3 className="text-gray-400 text-sm mb-2">Total Believers</h3>

              <p className="text-4xl font-bold text-[#c9a84c]">120</p>
            </div>

            <div className="bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-2xl p-6">
              <h3 className="text-gray-400 text-sm mb-2">Total Books</h3>

              <p className="text-4xl font-bold text-[#c9a84c]">45</p>
            </div>

            <div className="bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-2xl p-6">
              <h3 className="text-gray-400 text-sm mb-2">Upcoming Events</h3>

              <p className="text-4xl font-bold text-[#c9a84c]">8</p>
            </div>

            <div className="bg-[#0d1b2a] border border-[#c9a84c]/20 rounded-2xl p-6">
              <h3 className="text-gray-400 text-sm mb-2">Worship Songs</h3>

              <p className="text-4xl font-bold text-[#c9a84c]">65</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
