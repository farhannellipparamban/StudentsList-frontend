import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-start mt-5">
        <img
          src="/download.png"
          alt="Profile"
          className="w-12 h-12 rounded-full mr-2"
        />
        <div>
          <h1 className="text-xl font-semibold">Yellow Owl</h1>
          <span className="ml-1 font-thin">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;