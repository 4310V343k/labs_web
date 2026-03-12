const isValidHexColor = (color) => {
  const hexColorRegex = /^#[0-9A-F]{6}$/i;
  return hexColorRegex.test(color);
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateFaction = (req, res, next) => {
  const { name, color, analysis, icon } = req.body;

  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!color || !isValidHexColor(color)) {
    errors.push('Color must be a valid hex color (e.g., #FF5733)');
  }

  if (!analysis || typeof analysis !== 'string' || analysis.trim().length < 50) {
    errors.push('Analysis is required and must be at least 50 characters');
  }

  if (!icon || typeof icon !== 'object') {
    errors.push('Icon must be a valid object');
  } else {
    if (!icon.url || !isValidUrl(icon.url)) {
      errors.push('Icon URL is required and must be a valid URL');
    }
    if (!icon.alt) {
      errors.push('Icon alt text is required');
    }
    if (!icon.width || !icon.height || typeof icon.width !== 'number' || typeof icon.height !== 'number') {
      errors.push('Icon width and height are required and must be numbers');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};
