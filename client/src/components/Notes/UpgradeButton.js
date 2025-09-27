"use client";

import api from "../../services/api";

export default function UpgradeButton({ tenantSlug, onUpgrade }) {
  const handleUpgrade = async () => {
    try {
      await api.post(`/tenants/${tenantSlug}/upgrade`);
      alert("Tenant upgraded to Pro!");
      onUpgrade();
    } catch (err) {
      console.error(err);
      alert("Upgrade failed");
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Upgrade to Pro
    </button>
  );
}
