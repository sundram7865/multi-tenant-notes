"use client";

import { useState } from "react";
import { useAuth } from "../Auth/AuthContext"; 
import api from "../../services/api";

export default function UserForm({ onAdd }) {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const tenantSlug = user.tenant;
      const res = await api.post(`/tenants/${tenantSlug}/invite`, { email, role });
      onAdd(res.data);
      setEmail("");
      setRole("Member");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to invite user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="User email"
        className="border p-2 rounded flex-1 text-gray-950"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded  text-gray-950"
      >
        <option value="Member">Member</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Invite
      </button>
    </form>
  );
}
