// client/components/Auth/AuthContext.js
"use client"
import { createContext, useContext, useState, useEffect } from "react";
import api from "../../services/api";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

 useEffect(() => {
  const token = localStorage.getItem("token");

  // check if token exists and looks like a real JWT (3 parts separated by '.')
  if (token && token.split('.').length === 3) {
    try {
      const decoded = jwtDecode(token);
      setUser({ ...decoded, token });
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token"); // optional: clear bad token
    }
  } else {
    // optional: clear anything invalid
    localStorage.removeItem("token");
  }
}, []);


  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser({ ...decoded, token });
      router.push("/notes");
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
