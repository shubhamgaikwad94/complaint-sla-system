import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import CreateComplaint from "./pages/CreateComplaint";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>

        <Route path="/complaints" element={
          <ProtectedRoute>
            <Complaints />
          </ProtectedRoute>
        }/>

        <Route path="/create" element={
          <ProtectedRoute>
            <CreateComplaint />
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;