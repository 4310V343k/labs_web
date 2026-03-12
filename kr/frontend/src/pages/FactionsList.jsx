import { useFactions } from "../hooks/useFactions";
import { useEffect } from "react";
import { Spinner } from "../components/Spinner";
import { FactionCard } from "../components/FactionCard";
import { useState } from "react";
import { Toast } from "../components/Toast";

export const FactionsList = () => {
  const { factions, loading, error, deleteFaction, fetchFactions } =
    useFactions();

  const [toast, setToast] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteFaction(id);
      setToast({ message: "Faction deleted", type: "success" });
    } catch (error) {
      console.error("Delete error:", error);
      setToast({ message: "Failed to delete faction", type: "error" });
    }
  };

  useEffect(() => {
    fetchFactions();
  }, [fetchFactions]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-marathon-light">Loading factions...</p>
        </div>
      </div>
    );

  if (error && factions.length == 0)
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-faction-arachne mb-4">Error loading factions</p>
          <button
            onClick={fetchFactions}
            className="text-faction-uesc hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-mono text-marathon-light mb-2">
          FACTION NEXUS
        </h2>
        <p className="text-marathon-light text-opacity-70">
          {factions.length} faction{factions.length !== 1 ? "s" : ""} registered
          in the system
        </p>
      </div>

      {factions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-marathon-light text-opacity-60 mb-4">
            No factions found. Create the first one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factions.map((faction) => (
            <FactionCard
              key={faction.id}
              faction={faction}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

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
