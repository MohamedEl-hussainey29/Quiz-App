import ProtectedRoutes from "../../Shared/components/ProtectedRoutes/ProtectedRoutes";
import GroupData from "./components/GroupData";

export default function GroupsList() {
  return (
    <>
      <ProtectedRoutes role="Instructor">
        <GroupData/>
      </ProtectedRoutes>
    </>
  )
}
