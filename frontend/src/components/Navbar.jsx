import { Link, useNavigate } from "react-router-dom";
import getRole from "../utils/getRole";

const Navbar = () => {
  const navigate = useNavigate();
  const role = getRole();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-blue-800 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">Complaint SLA System</h1>

      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/complaints">Complaints</Link>

        {role === "user" && <Link to="/create">Create</Link>}

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;