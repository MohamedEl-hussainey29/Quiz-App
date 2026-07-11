import ProtectedRoutes from "../../Shared/components/ProtectedRoutes/ProtectedRoutes";
import QuizzesBoard from "./components/QuizzesBoard";

export default function QuizBoard() {
  return (
    <>
      <ProtectedRoutes role="Instructor">
        <QuizzesBoard/>
      </ProtectedRoutes>
    </>
  )
}
