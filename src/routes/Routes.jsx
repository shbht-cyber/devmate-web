import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// For routes that require authentication
export const PrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const isLoading = useSelector((store) => store.app.isLoading);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return navigate("/login");
  }

  return children;
};

// For routes that should be accessed only when NOT authenticated
export const PublicRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  const isLoading = useSelector((store) => store.app.isLoading);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return navigate("/");
  }

  return children;
};
