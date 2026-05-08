import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import getRole from "../utils/getRole";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const role = getRole();

  /* =========================
     FETCH COMPLAINTS
  ========================= */
  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================
     FETCH AGENTS
  ========================= */
  const fetchAgents = async () => {
    try {
      const res = await API.get("/users/agents");
      setAgents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();

    if (role === "admin") {
      fetchAgents();
    }
  }, []);

  /* =========================
     ASSIGN COMPLAINT
  ========================= */
  const assignComplaint = async (complaintId, agentId) => {
    try {
      await API.put(`/complaints/${complaintId}/assign`, {
        agentId,
      });

      alert("Complaint assigned successfully");

      fetchComplaints();

    } catch (error) {
      console.log(error);
      alert("Assignment failed");
    }
  };

  /* =========================
     RESOLVE COMPLAINT
  ========================= */
  const resolveComplaint = async (id) => {
    try {
      await API.put(`/complaints/${id}/status`, {
        status: "RESOLVED",
      });

      alert("Complaint resolved");

      fetchComplaints();

    } catch (error) {
      console.log(error);
      alert("Failed to resolve complaint");
    }
  };

  /* =========================
     STATUS COLORS
  ========================= */
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

  /* =========================
     PRIORITY COLORS
  ========================= */
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
                  <td className="p-4 font-medium">
                    {c.title}
                  </td>

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

                  <td>
                    {c.createdBy?.name}
                  </td>

                  <td>
                    {c.assignedTo?.name || "Not Assigned"}
                  </td>

                  <td className="space-x-2">

                    {/* ASSIGN DROPDOWN */}
                    {role === "admin" && !c.assignedTo && (
                      <select
                        onChange={(e) =>
                          assignComplaint(c._id, e.target.value)
                        }
                        className="border px-3 py-1 rounded-lg"
                        defaultValue=""
                      >
                        <option value="">
                          Assign Agent
                        </option>

                        {agents.map((agent) => (
                          <option
                            key={agent._id}
                            value={agent._id}
                          >
                            {agent.name}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* RESOLVE BUTTON */}
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