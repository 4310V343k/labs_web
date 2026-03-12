import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFactions } from "../hooks/useFactions";
import { FactionForm } from "../components/FactionForm";
import { Spinner } from "../components/Spinner";
import { Toast } from "../components/Toast";

export const EditFaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFactionById, updateFaction } = useFactions();
  const [faction, setFaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaction = async () => {
      try {
        setLoading(true);
        const data = await getFactionById(id);
        setFaction(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaction();
  }, [id, getFactionById]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await updateFaction(faction.id, formData);
      setToast({ message: "Faction updated successfully!", type: "success" });
      setTimeout(() => navigate(`/factions/${faction.id}`), 1500);
    } catch (err) {
      const errorMessage = err.message || "Failed to update faction";
      setToast({ message: errorMessage, type: "error" });
      console.error("Update error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !faction) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-faction-arachne mb-4">Faction not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-mono text-marathon-light">
          EDIT FACTION
        </h2>
        <p className="text-marathon-light text-opacity-70 mt-2">
          Modify {faction.name}'s information
        </p>
      </div>

      <FactionForm
        initialData={faction}
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/factions/${faction.id}`)}
        isLoading={submitting}
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
