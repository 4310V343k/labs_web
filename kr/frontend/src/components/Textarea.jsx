export const Textarea = ({
  label,
  error,
  value,
  onChange,
  placeholder = "",
  required = false,
  rows = 4,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-marathon-light text-sm font-semibold mb-2">
          {label}
          {required && <span className="text-faction-arachne">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2 bg-marathon-gray text-marathon-light rounded border border-marathon-light border-opacity-30 focus:border-opacity-100 focus:outline-none transition-all resize-none ${className}`}
        {...props}
      />
      {error && <p className="text-faction-arachne text-xs mt-1">{error}</p>}
    </div>
  );
};
