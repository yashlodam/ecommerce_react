import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector , store } from "./State/Store";

export default function useRequireAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, role } = useAppSelector((store) => store.auth);

  const requireAuth = () => {
    // User is not logged in
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });
      return false;
    }

    // Logged in but not a customer
    if (role !== "ROLE_CUSTOMER") {
      navigate("/"); // or navigate("/seller") if you prefer
      return false;
    }

    return true;
  };

  return requireAuth;
}