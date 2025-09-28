
import StatCard from "../components/admin/StatCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Patients", value: 1200 },
    { title: "Practitioners", value: 85 },
    { title: "Appointments Today", value: 230 },
  ];

  const chartData = [
    { day: "Mon", appointments: 50 },
    { day: "Tue", appointments: 70 },
    { day: "Wed", appointments: 40 },
    { day: "Thu", appointments: 90 },
    { day: "Fri", appointments: 60 },
  ];

  const practitioners = [
    { id: 1, name: "Dr. A Sharma", status: "Pending" },
    { id: 2, name: "Dr. B Kumar", status: "Verified" },
    { id: 3, name: "Dr. C Singh", status: "Pending" },
  ];

  return (
    <div className="flex">
      
      <div className="flex-1 bg-gray-100 min-h-screen">
   

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <StatCard key={i} title={s.title} value={s.value} />
          ))}
        </div>

        {/* Chart */}
        <div className="p-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="mb-4 font-semibold">Appointments Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Practitioner Table */}
        <div className="p-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="mb-4 font-semibold">Practitioner Verification</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {practitioners.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="p-2">{p.id}</td>
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          p.status === "Verified"
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
