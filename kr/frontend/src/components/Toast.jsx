import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const Toast = ({
  message,
  type = "success",
  onClose,
  autoDismiss = true,
}) => {
  const [show, setShow] = useState(autoDismiss ? false : true);

  useEffect(() => {
    setShow(true);
    if (autoDismiss) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, autoDismiss, onClose]);

  if (!show) return null;

  const bgColor = {
    success: "bg-faction-cyac",
    error: "bg-faction-arachne",
    info: "bg-faction-uesc",
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor} text-marathon-dark px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50`}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setShow(false);
          onClose?.();
        }}
        className="font-bold"
      >
        ✕
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]),
  onClose: PropTypes.func,
  autoDismiss: PropTypes.bool,
};
