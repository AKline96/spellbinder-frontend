import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/welcome" replace />;
  }

  return children; // If logged in, render the child components.
};

export default ProtectedRoute;
