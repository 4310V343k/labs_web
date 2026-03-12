import { useState, useCallback } from "react";
import { factionsAPI } from "../services/factionsAPI";

export const useFactions = () => {
  const [factions, setFactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await factionsAPI.getAll();
      setFactions(response.data || []);
    } catch (err) {
      setError(err);
      console.error("Error fetching factions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createFaction = useCallback(async (factionData) => {
    try {
      const response = await factionsAPI.create(factionData);
      setFactions((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  const updateFaction = useCallback(async (id, factionData) => {
    try {
      const response = await factionsAPI.update(id, factionData);
      setFactions((prev) =>
        prev.map((faction) => (faction.id === id ? response.data : faction)),
      );
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  const deleteFaction = useCallback(async (id) => {
    try {
      await factionsAPI.delete(id);
      setFactions((prev) => prev.filter((faction) => faction.id !== id));
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  const getFactionById = useCallback(async (id) => {
    try {
      const response = await factionsAPI.getById(id);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  }, []);

  return {
    factions,
    loading,
    error,
    deleteFaction,
    fetchFactions,
    createFaction,
    updateFaction,
    getFactionById,
  };
};
