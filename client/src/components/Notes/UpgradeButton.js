import api from "../../services/api";
import { useAuth } from "../Auth/AuthContext";

export default function UpgradeButton() {
  const { user } = useAuth();

  const handleUpgrade = async () => {
    if (!user) return;

    try {
      const res = await api.post(`/tenants/${user.tenant}/upgrade`);
      alert(res.data.message); 
    } catch (err) {
      console.error("Upgrade error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to upgrade tenant");
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Upgrade Subscription
    </button>
  );
}
