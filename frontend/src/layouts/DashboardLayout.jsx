import { useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const role = getRole();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">SLA System</h2>

        <ul className="space-y-3">
          <li onClick={() => navigate("/dashboard")} className="cursor-pointer hover:text-blue-400">Dashboard</li>

          {role === "user" && (
            <li onClick={() => navigate("/create-complaint")} className="cursor-pointer hover:text-blue-400">
              Create Complaint
            </li>
          )}

          <li onClick={() => navigate("/complaints")} className="cursor-pointer hover:text-blue-400">
            Complaints
          </li>

          {role === "admin" && (
            <li className="text-yellow-400">Admin</li>
          )}
        </ul>

        <button
          onClick={logout}
          className="mt-10 bg-red-500 px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 bg-gray-100 p-6">{children}</div>
    </div>
  );
};

export default DashboardLayout;