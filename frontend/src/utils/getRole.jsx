import { jwtDecode } from "jwt-decode";

const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.role;
};

export default getRole;