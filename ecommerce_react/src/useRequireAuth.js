import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../State/Store";

export default function useRequireAuth() {

    const navigate = useNavigate();
    const location = useLocation();

    const { isLoggedIn , role} = useAppSelector((store) => store.auth);

    const requireAuth = () => {

        if (!isLoggedIn && role === "ROLE_CUSTOMER") {

            navigate("/login", {
                state: {
                    from: location.pathname
                }
            });

            return false;
        }

        return true;
    };

    return requireAuth;
}