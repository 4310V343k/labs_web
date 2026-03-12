import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFactions } from '../hooks/useFactions';
import { Button } from '../components/Button';
import {Card} from '../components/Card';
import { Spinner } from '../components/Spinner';
import {Toast} from '../components/Toast';
import { formatDate } from '../utils/formatters';

export const FactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFactionById, deleteFaction } = useFactions();
  const [faction, setFaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
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

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${faction.name}?`)) return;

    setDeleting(true);
    try {
      await deleteFaction(faction.id);
      setToast({ message: 'Faction deleted successfully', type: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setToast({ message: 'Failed to delete faction', type: 'error' });
    } finally {
      setDeleting(false);
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
          <Button onClick={() => navigate('/')}>Back to Factions</Button>
        </div>
      </div>
    );
  }

  const icon = typeof faction.icon === 'string' 
    ? JSON.parse(faction.icon) 
    : faction.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="border-t-4" style={{ borderTopColor: faction.color }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            {icon?.url && (
              <div
                className="w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: faction.color }}
              >
                <img src={icon.url} alt={faction.name} className="w-16 h-16" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-mono font-bold mb-2" style={{ color: faction.color }}>
                {faction.name}
              </h1>
              <div
                className="inline-block px-3 py-1 rounded text-sm font-semibold text-marathon-dark"
                style={{ backgroundColor: faction.color }}
              >
                {faction.color}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate(`/factions/${faction.id}/edit`)}>
              Edit
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-1 rounded-full my-6"
          style={{ backgroundColor: faction.color }}
        />

        {/* Analysis */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-marathon-light mb-3">Faction Profile</h2>
          <p className="text-marathon-light text-opacity-80 leading-relaxed whitespace-pre-wrap">
            {faction.analysis}
          </p>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-marathon-light border-opacity-20">
          <div>
            <p className="text-xs text-marathon-light text-opacity-60 font-semibold uppercase tracking-wide">
              Created
            </p>
            <p className="text-marathon-light">{formatDate(faction.created_at)}</p>
          </div>
          <div>
            <p className="text-xs text-marathon-light text-opacity-60 font-semibold uppercase tracking-wide">
              Last Updated
            </p>
            <p className="text-marathon-light">{formatDate(faction.updated_at)}</p>
          </div>
        </div>

        {/* Icon Metadata */}
        {icon && (
          <div className="mt-6 pt-6 border-t border-marathon-light border-opacity-20">
            <p className="text-xs text-marathon-light text-opacity-60 font-semibold uppercase tracking-wide mb-3">
              Icon Details
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-marathon-light text-opacity-60">Alt Text</p>
                <p className="text-marathon-light font-mono">{icon.alt}</p>
              </div>
              <div>
                <p className="text-marathon-light text-opacity-60">Dimensions</p>
                <p className="text-marathon-light font-mono">{icon.width}x{icon.height}</p>
              </div>
              {icon.filename && (
                <div className="col-span-2">
                  <p className="text-marathon-light text-opacity-60">Filename</p>
                  <p className="text-marathon-light font-mono break-all">{icon.filename}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Back button */}
      <div className="mt-6">
        <Button onClick={() => navigate('/')} variant="secondary">
          ← Back to Factions
        </Button>
      </div>

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
