"use client";

import api from "../../services/api";
import { useState } from "react";

export default function DowngradeButton({ tenantSlug, onDowngrade }) {
  const [loading, setLoading] = useState(false);

  const handleDowngrade = async () => {
    if (!confirm("Are you sure you want to downgrade this tenant to FREE?")) return;

    setLoading(true);
    try {
      await api.post(`/tenants/${tenantSlug}/downgrade`);
      alert("Tenant downgraded to FREE");
      if (onDowngrade) onDowngrade(); 
    } catch (err) {
      console.error("Downgrade error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to downgrade tenant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDowngrade}
      disabled={loading}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60"
    >
      {loading ? "Downgrading..." : "Downgrade to FREE"}
    </button>
  );
}
