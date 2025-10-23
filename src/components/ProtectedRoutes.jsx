import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/useAuth";
import { useEffect } from "react";
// update for chidlren

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth;
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedRoutes;
