import ProtectedRoutes from "../../Shared/components/ProtectedRoutes/ProtectedRoutes";
import StudentsForm from "./components/StudentsForm";

export default function StudentsList() {
  return (
    <>
      <ProtectedRoutes role="Instructor">
        <StudentsForm/>
      </ProtectedRoutes>
    </>
  )
}
