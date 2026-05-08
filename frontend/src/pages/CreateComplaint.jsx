import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateComplaint = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "LOW",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/complaints", form);
    navigate("/complaints");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8">

          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Create New Complaint
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block mb-2 font-semibold text-gray-600">
                Complaint Title
              </label>
              <input
                type="text"
                placeholder="Enter complaint title..."
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-3 transition"
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-semibold text-gray-600">
                Description
              </label>
              <textarea
                rows="4"
                placeholder="Describe your issue clearly..."
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-3 transition"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block mb-2 font-semibold text-gray-600">
                Priority Level
              </label>
              <select
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg p-3 transition"
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
              >
                <option value="LOW">🟢 Low</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="HIGH">🟠 High</option>
                <option value="CRITICAL">🔴 Critical</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition transform hover:scale-105"
            >
              Submit Complaint
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default CreateComplaint;