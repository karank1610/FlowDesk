import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

    const { user, logout, loading } = useAuth();
    const [activeLink, setActiveLink] = useState("All Tasks");

    const navLinks = [
        { label: "All Tasks", icon: "📋" },
        { label: "Today", icon: "📅" },
        { label: "Upcoming", icon: "🗓" },
        { label: "Completed", icon: "✅" },
    ]

    return (
        <div className="sidebar-main w-64 bg-[#2d1b69] flex flex-col text-white px-4 py-6">

            <div className="logo mb-10">
                <h1 className="text-2xl font-bold text-white">🌊 FlowDesk</h1>
            </div>

            <nav className="navbar flex flex-col gap-2 flex-1">
                {navLinks.map((link) => {
                    return (
                        <button key={link.label}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all cursor-pointer
                            ${activeLink === link.label
                                    ? "bg-purple-600 text-white font-semibold"
                                    : "text-purple-200 hover:bg-purple-700 hover:text-white"
                                }`}
                            onClick={() => setActiveLink(link.label)}>
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="user-logout-section border-t border-purple-700 pt-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm font-bold">
                        {loading ? "..." : user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-purple-200">
                        {loading ? "Loading..." : user?.name}
                    </span>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-2.5 mt-3 rounded-sm text-sm text-purple-200 hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                    <span>Logout</span>
                </button>
            </div>

        </div>
    )
}

export default Sidebar;