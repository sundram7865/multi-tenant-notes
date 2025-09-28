"use client";
import { createContext, useContext, useState, useEffect } from "react";
import api from "../../services/api";
import {jwtDecode} from "jwt-decode";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log("AuthProvider mounted. Checking token...");
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (token && token.split(".").length === 3) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

    
        const role = decoded.role ? decoded.role.toUpperCase() : null;

        setUser({ ...decoded, token, role });
        console.log("User state set from token:", { ...decoded, token, role });
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    } else {
      console.log("No valid token found, clearing localStorage.");
      localStorage.removeItem("token");
    }
  }, []);

  const login = async (email, password) => {
    console.log("Logging in with:", email);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user: userData } = res.data;
      console.log("Login successful, received token:", token);

      localStorage.setItem("token", token);

     
      setUser({ ...userData, token, role: userData.role.toUpperCase() });
      console.log("User state after login:", { ...userData, token });

      router.push("/notes");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    console.log("Logging out user:", user);
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
