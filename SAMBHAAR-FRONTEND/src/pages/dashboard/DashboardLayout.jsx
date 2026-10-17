import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage the hamburger menu toggle

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard toggleSidebar={toggleSidebar} />;
      case "user":
        return <UserDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  // Function to toggle the sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative mx-auto pt-20">
      {/* Header Section */}
      <div>
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Hamburger Menu for Mobile */}
          <header className="fixed top-28 left-0 w-full pl-4 z-50 ">
            <button onClick={toggleSidebar} className="text-black">
              <span className="block w-4 h-0.5 bg-black mb-1"></span>
              <span className="block w-4 h-0.5 bg-black mb-1"></span>
              <span className="block w-4 h-0.5 bg-black mb-1"></span>
            </button>
          </header>

          {/* Sidebar for Mobile */}
          <aside
            className={`fixed top-16 left-0 z-40 w-4/5 sm:w-1/4 h-screen bg-white shadow-lg p-4 transition-transform transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {renderDashboard()}
          </aside>
        </div>

        {/* Default Layout for Tablet, Desktop, and Larger Screens */}
        <div className="hidden md:flex flex-row gap-4 items-start">
          {/* Sidebar for Desktop */}
          <aside className="fixed top-20 left-0 w-[20%] h-screen p-8 bg-white shadow-md z-40">
            {renderDashboard()}
          </aside>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="md:ml-[20%] p-4 md:p-8 md ">
        {/* Main Content */}
        <main className="bg-white p-8 border rounded-md shadow-sm w-full mx-auto mt-14  md:mt-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
