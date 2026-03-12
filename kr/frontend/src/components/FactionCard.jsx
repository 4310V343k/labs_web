import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { truncateText } from "../utils/formatters";
import PropTypes from "prop-types";

export const FactionCard = ({ faction, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete(faction.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const iconUrl =
    typeof faction.icon === "string"
      ? JSON.parse(faction.icon).url
      : faction.icon?.url;

  return (
    <Link to={`/factions/${faction.id}`} className="flex-1">
      <div
        className="bg-marathon-gray border-2 rounded-lg p-6 glow-faction transition-all duration-300 hover:shadow-lg h-full flex flex-col"
        style={{ borderColor: faction.color }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: faction.color, backgroundOpacity: 0.1 }}
          >
            {iconUrl && (
              <img src={iconUrl} alt={faction.name} className="w-12 h-12" />
            )}
          </div>
        </div>

        {/* Name */}
        <h3
          className="text-xl font-bold mb-2 text-center font-mono"
          style={{ color: faction.color }}
        >
          {faction.name}
        </h3>

        {/* Analysis preview */}
        <p className="text-marathon-light text-opacity-70 text-sm mb-4 flex-grow">
          {truncateText(faction.analysis, 120)}
        </p>

        {/* Color bar */}
        <div
          className="h-1 rounded-full mb-4"
          style={{ backgroundColor: faction.color }}
        />
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Delete"
      >
        <p className="text-marathon-light mb-6">
          Are you sure you want to delete <strong>{faction.name}</strong>? This
          action cannot be undone.
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </Link>
  );
};

FactionCard.propTypes = {
  faction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    analysis: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
