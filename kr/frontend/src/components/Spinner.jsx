import PropTypes from "prop-types";

export const Spinner = ({ size = "md" }) => {
  const sizeClass = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }[size];

  return (
    <div
      className={`${sizeClass} border-2 border-marathon-gray border-t-faction-uesc rounded-full animate-spin`}
    />
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};
