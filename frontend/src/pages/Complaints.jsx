import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import getRole from "../utils/getRole";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const role = getRole();

  const fetchComplaints = async () => {
    const res = await API.get("/complaints");
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const assignComplaint = async (id) => {
    const agentId = prompt("Enter Agent ID:");
    if (!agentId) return;
    await API.put(`/complaints/${id}/assign`, { agentId });
    fetchComplaints();
  };

  const resolveComplaint = async (id) => {
    await API.put(`/complaints/${id}/status`, {
      status: "RESOLVED",
    });
    fetchComplaints();
  };

  const statusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-500";
      case "IN_PROGRESS":
        return "bg-yellow-500";
      case "ESCALATED":
        return "bg-red-600";
      case "RESOLVED":
        return "bg-green-600";
      default:
        return "bg-gray-400";
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-700";
      case "HIGH":
        return "bg-orange-500";
      case "MEDIUM":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Complaint Management
        </h2>

        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl">

          <table className="w-full text-left border-collapse">

            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4">Title</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr
                  key={c._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{c.title}</td>

                  <td>
                    <span
                      className={`px-3 py-1 text-white rounded-full text-sm ${priorityColor(
                        c.priority
                      )}`}
                    >
                      {c.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 text-white rounded-full text-sm ${statusColor(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td>{c.createdBy?.name}</td>

                  <td>{c.assignedTo?.name || "—"}</td>

                  <td className="space-x-2">

                    {role === "admin" && !c.assignedTo && (
                      <button
                        onClick={() => assignComplaint(c._id)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm transition"
                      >
                        Assign
                      </button>
                    )}

                    {(role === "agent" || role === "admin") &&
                      c.status !== "RESOLVED" && (
                        <button
                          onClick={() => resolveComplaint(c._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition"
                        >
                          Resolve
                        </button>
                      )}

                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </>
  );
};

export default Complaints;