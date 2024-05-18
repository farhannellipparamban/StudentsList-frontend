import React, { useState } from "react";
import Navbar from "../components/Common/Navbar";
import StudenstList from "../components/Home/StudentsList";
import Sidebar from "../components/Common/Sidebar";

const HomePage: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div
        className={`bg-purple-700 text-gray-100 flex flex-col justify-between py-4 px-3 fixed inset-y-0 left-0 z-30 w-3/4 md:relative md:w-1/5 md:translate-x-0 transition-all duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>
      <div className="flex-1">
        <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        <main className="p-4">
          {/* Mobile sidebar toggle */}
          <div
            className={`fixed inset-0 z-20 bg-black opacity-25 md:hidden ${
              showSidebar ? "block" : "hidden"
            }`}
            onClick={() => setShowSidebar(false)}
          ></div>
          <div
            className={`fixed inset-y-0 left-0 z-30 w-3/4 bg-purple-700 text-gray-100 overflow-y-auto transition-all duration-300 md:w-1/5 ${
              showSidebar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </div>
          <StudenstList />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
