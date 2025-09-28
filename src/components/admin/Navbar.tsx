import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-white shadow flex justify-between items-center px-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-6">
        <FaBell className="cursor-pointer" />
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full w-10 h-10"
        />
      </div>
    </div>
  );
};

export default Navbar;
