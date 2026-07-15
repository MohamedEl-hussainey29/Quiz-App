
import LoginForm from "./LoginForm";
import AuthNav from "../../Shared/components/AuthNav/AuthNav";

export default function Login() {
  return (
    <>
      <div className="w-full">
        <h1 className="text-[#C5D86D] text-[25px]">Continue your learning journey with QuizWiz!</h1>
        <AuthNav/>
        <LoginForm/>
      </div>
    </>
  );
}