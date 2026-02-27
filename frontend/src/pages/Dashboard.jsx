import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import {
  FaClipboardList,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    escalated: 0,
    resolved: 0,
    inProgress: 0,
  });

  useEffect(() => {
    API.get("/complaints").then((res) => {
      const data = res.data;

      setStats({
        total: data.length,
        open: data.filter(c => c.status === "OPEN").length,
        escalated: data.filter(c => c.status === "ESCALATED").length,
        resolved: data.filter(c => c.status === "RESOLVED").length,
        inProgress: data.filter(c => c.status === "IN_PROGRESS").length,
      });
    });
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          📊 Dashboard Overview
        </h1>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

          <StatCard
            title="Total Complaints"
            value={stats.total}
            icon={<FaClipboardList />}
            color="bg-indigo-600"
          />

          <StatCard
            title="Open"
            value={stats.open}
            icon={<FaClock />}
            color="bg-blue-500"
          />

          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon={<FaClock />}
            color="bg-yellow-500"
          />

          <StatCard
            title="Escalated"
            value={stats.escalated}
            icon={<FaExclamationTriangle />}
            color="bg-red-600"
          />

          <StatCard
            title="Resolved"
            value={stats.resolved}
            icon={<FaCheckCircle />}
            color="bg-green-600"
          />

        </div>

        {/* EXTRA SECTION */}
        <div className="mt-10 bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            📌 System Status Summary
          </h2>

          <p className="text-gray-600 leading-relaxed">
            This dashboard provides a complete overview of complaint activity.
            Escalated complaints require immediate attention. Monitor
            resolution performance and SLA compliance to maintain service quality.
          </p>
        </div>

      </div>
    </>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform duration-300">

      <div className={`text-white text-3xl p-3 rounded-full w-fit ${color}`}>
        {icon}
      </div>

      <h3 className="text-gray-600 mt-4">{title}</h3>

      <p className="text-3xl font-bold text-gray-800 mt-2">
        {value}
      </p>
    </div>
  );
};

export default Dashboard;