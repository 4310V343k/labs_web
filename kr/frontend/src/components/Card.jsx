import PropTypes from "prop-types";

export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-marathon-gray border border-marathon-light border-opacity-20 rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
