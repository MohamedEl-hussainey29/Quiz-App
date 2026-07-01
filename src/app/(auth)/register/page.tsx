import AuthNav from "../../Shared/components/AuthNav/AuthNav";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <>
      <div className="w-full">
        <h1 className="text-[#C5D86D] text-[25px]">Create your account and start using QuizWiz!</h1>
        <AuthNav/>
        <RegisterForm/>
      </div>
    </>
  )
}
