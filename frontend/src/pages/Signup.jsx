import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Account created");
      navigate("/");
    } catch {
      alert("Error creating account");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        <input
          placeholder="Name"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <input
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setForm({...form, email: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Signup
        </button>

        <p className="text-center mt-4">
          Already have account? <Link to="/" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;