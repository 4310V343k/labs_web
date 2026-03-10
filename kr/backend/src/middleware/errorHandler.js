export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Database unique constraint error
  if (err.code === '23505') {
    return res.status(409).json({
      success: false,
      message: 'Faction name already exists',
      error: err.message,
    });
  }

  // Database foreign key error
  if (err.code === '23503') {
    return res.status(400).json({
      success: false,
      message: 'Invalid reference',
      error: err.message,
    });0
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
};

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
