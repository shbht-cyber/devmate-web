import { useEffect } from "react";

const Toaster = ({ toast, setToast }) => {
  const { show, title, type } = toast;

  console.log("type", type);

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setToast({ ...toast, show: false });
    }, 5000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    show && (
      <div className="toast toast-top toast-center z-50">
        <div className={`alert alert-${type}`}>
          <span>{title}</span>
        </div>
      </div>
    )
  );
};

export default Toaster;
