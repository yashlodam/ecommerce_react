
import { useAppSelector , store } from "../../../State/Store";
import ClosedAccount from "../ClosedAccount";
import DeactivatedAccount from "../DeactivatedAccount";
import PendingVerification from "../PendingVerification";
import SuspendedAccount from "../SuspendedAccount";

function SellerStatusGuard({ children }) {
  const { profile, loading } = useAppSelector((store) => store.seller);

  if (loading) return null;

  if (!profile) return null;

  switch (profile.accountStatus) {
    case "PENDING_VERIFICATION":
      return <PendingVerification />;

    case "SUSPENDED":
      return <SuspendedAccount />;

    case "DEACTIVATED":
      return <DeactivatedAccount />;

    case "BANNED":
      return <BannedAccount />;

    case "CLOSED":
      return <ClosedAccount />;

    default:
      return children;
  }
}

export default SellerStatusGuard;