import React from "react";
const Topbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 justify-between sticky top-0 z-10">
      <div className="text-lg font-semibold text-gray-800">Panchakarma Management</div>
      <div className="flex items-center gap-4">
       
        <button
          aria-label="User menu"
          className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold"
          title="User"
        >
          A
        </button>
      </div>
    </header>
  );
};
export default Topbar;