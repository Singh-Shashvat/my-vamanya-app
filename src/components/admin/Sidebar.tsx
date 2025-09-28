import { IoMdHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { LuFileCheck } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

const Sidebar = () => {
  const menu = [
    { icon: <IoMdHome size={20} />, label: "Dashboard" },
    { icon: <FaUsers size={20} />, label: "Practitioners" },
    { icon: <LuFileCheck size={20} />, label: "Appointments" },
    { icon: <IoSettingsOutline size={20} />, label: "Settings" },
  ];

  return (
    <div className="h-screen w-64 bg-green-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">AyurSutra Admin</h1>
      <ul className="space-y-4">
        {menu.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-700 cursor-pointer"
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
