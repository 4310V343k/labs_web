import PropTypes from "prop-types";
export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded font-semibold transition-all duration-200 disabled:opacity-50";

  const variants = {
    primary: "bg-faction-uesc hover:bg-blue-600 text-white",
    secondary:
      "bg-marathon-gray hover:bg-gray-600 text-marathon-light border border-marathon-light",
    danger: "bg-faction-arachne hover:bg-red-700 text-white",
    success: "bg-faction-cyac hover:bg-green-600 text-marathon-dark",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
