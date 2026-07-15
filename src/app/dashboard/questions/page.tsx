import ProtectedRoutes from "../../Shared/components/ProtectedRoutes/ProtectedRoutes";
import QuestionsBank from "./components/QuestionsBank";

export default function QuestionsList() {
  return (
    <>
      <ProtectedRoutes role="Instructor">
        <QuestionsBank/>
      </ProtectedRoutes>
    </>
  )
}
