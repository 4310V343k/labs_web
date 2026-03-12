import { useState } from "react";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { Card } from "./Card";
import PropTypes from "prop-types";
import { isValidHexColor, isValidUrl } from "../utils/formatters";

export const FactionForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      color: "#1E69F5",
      analysis: "",
      icon: {
        url: "",
        filename: "",
        alt: "",
        width: 32,
        height: 32,
        mimeType: "image/svg+xml",
      },
    },
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!isValidHexColor(formData.color)) {
      newErrors.color = "Please enter a valid hex color";
    }

    if (!formData.analysis?.trim() || formData.analysis.trim().length < 50) {
      newErrors.analysis = "Analysis must be at least 50 characters";
    }

    if (!formData.icon?.url || !isValidUrl(formData.icon.url)) {
      newErrors.iconUrl = "Icon URL must be a valid URL";
    }

    if (!formData.icon?.alt) {
      newErrors.iconAlt = "Icon alt text is required";
    }

    if (!formData.icon?.width || !formData.icon?.height) {
      newErrors.iconDimensions = "Icon width and height are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      icon: {
        ...prev.icon,
        [name]: name === "width" || name === "height" ? parseInt(value) : value,
      },
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <Input
          label="Faction Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., MIDA"
          required
          error={errors.name}
        />

        <div className="mb-4">
          <label className="block text-marathon-light text-sm font-semibold mb-2">
            Faction Color <span className="text-faction-arachne">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-16 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="#1E69F5"
              className="flex-1 px-3 py-2 bg-marathon-gray text-marathon-light rounded border border-marathon-light border-opacity-30 focus:border-opacity-100 focus:outline-none transition-all font-mono"
            />
          </div>
          {errors.color && (
            <p className="text-faction-arachne text-xs mt-1">{errors.color}</p>
          )}
        </div>

        <Textarea
          label="Faction Analysis"
          name="analysis"
          value={formData.analysis}
          onChange={handleChange}
          placeholder="Describe this faction's philosophy and characteristics..."
          required
          rows={6}
          error={errors.analysis}
        />

        <div className="border-t border-marathon-light border-opacity-20 pt-6 mt-6">
          <p className="text-sm font-semibold text-marathon-light mb-4">
            Icon Details
          </p>

          <Input
            label="Icon URL"
            name="url"
            value={formData.icon.url}
            onChange={handleIconChange}
            placeholder="https://example.com/icon.svg"
            required
            error={errors.iconUrl}
          />

          <Input
            label="Icon Alt Text"
            name="alt"
            value={formData.icon.alt}
            onChange={handleIconChange}
            placeholder="e.g., MIDA Logo"
            required
            error={errors.iconAlt}
          />

          <Input
            label="Icon Filename"
            name="filename"
            value={formData.icon.filename}
            onChange={handleIconChange}
            placeholder="icon.svg"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Width (px)"
              name="width"
              type="number"
              value={formData.icon.width}
              onChange={handleIconChange}
              required
              error={errors.iconDimensions}
            />
            <Input
              label="Height (px)"
              name="height"
              type="number"
              value={formData.icon.height}
              onChange={handleIconChange}
              required
            />
          </div>

          <Input
            label="MIME Type"
            name="mimeType"
            value={formData.icon.mimeType}
            onChange={handleIconChange}
            placeholder="image/svg+xml"
          />
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Saving..." : "Save Faction"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

FactionForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
    analysis: PropTypes.string,
    icon: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
      filename: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      mimeType: PropTypes.string,
    }),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
