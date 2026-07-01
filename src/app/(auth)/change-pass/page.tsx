import ProtectedRoutes from "../../Shared/components/ProtectedRoutes/ProtectedRoutes";
import ChangePassForm from "./ChangePassForm";

export default function ChangePassword() {
  return (
    <>
      <ProtectedRoutes>
        <div className="w-full">
          <h1 className="text-[#C5D86D] text-[25px] md:mb-10">Change password</h1>
          <ChangePassForm/>
        </div>
      </ProtectedRoutes>
    </>
  )
}
