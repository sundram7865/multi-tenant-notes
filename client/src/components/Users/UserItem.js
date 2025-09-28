"use client";

export default function UserItem({ user }) {
  return (
    <div className="p-2 border rounded flex justify-between">
      <span  className="text-gray-900">{user.email}</span>
      <span className="text-gray-900">{user.role}</span>
    </div>
  );
}
