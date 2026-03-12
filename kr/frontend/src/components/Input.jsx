import PropTypes from 'prop-types';

export const Input = ({
  label,
  error,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
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
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-marathon-gray text-marathon-light rounded border border-marathon-light border-opacity-30 focus:border-opacity-100 focus:outline-none transition-all ${className}`}
        {...props}
      />
      {error && <p className="text-faction-arachne text-xs mt-1">{error}</p>}
    </div>
  );
};

Input.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
}
