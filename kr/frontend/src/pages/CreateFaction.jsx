import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFactions } from "../hooks/useFactions";
import { FactionForm } from "../components/FactionForm";
import { Toast } from "../components/Toast";

export const CreateFaction = () => {
  const navigate = useNavigate();
  const { createFaction } = useFactions();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await createFaction(formData);
      setToast({ message: "Faction created successfully!", type: "success" });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const errorMessage = error.message || "Failed to create faction";
      setToast({ message: errorMessage, type: "error" });
      console.error("Creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-mono text-marathon-light">
          CREATE NEW FACTION
        </h2>
        <p className="text-marathon-light text-opacity-70 mt-2">
          Register a new faction in the Nexus
        </p>
      </div>

      <FactionForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/")}
        isLoading={loading}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
