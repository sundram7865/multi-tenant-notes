"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../components/Auth/AuthContext";
import UserForm from "../../components/Users/UserForm";
import UserItem from "../../components/Users/UserItem";
import api from "../../services/api";
import UpgradeButton from "../../components/Notes/UpgradeButton";
import DowngradeButton from "../../components/Notes/DowngradeButton";

export default function UsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users when user is loaded
  useEffect(() => {
    if (!user) return;
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/tenants/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  if (!user) return <div className="p-4 text-center text-gray-600">Loading user...</div>;
  if (loading) return <div className="p-4 text-center text-gray-600">Loading users...</div>;
  if (user.role !== "ADMIN") return <div className="p-4 text-center text-red-500">Access denied</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Tenant Users</h1>
        <div className="flex gap-3">
          <UpgradeButton tenantSlug={user.tenant} onUpgrade={fetchUsers} />
          <DowngradeButton tenantSlug={user.tenant} onDowngrade={fetchUsers} />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-200 text-red-800 p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* Add user form */}
      <div className="mb-6">
        <UserForm onAdd={addUser} />
      </div>

      {/* Users list */}
      <div className="grid gap-4">
        {users.length > 0 ? (
          users.map((u) => (
            <UserItem
              key={u._id}
              user={u}
              className="bg-white shadow-md rounded-lg p-4"
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
}
