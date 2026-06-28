import Image from "next/image";
import authImage from "../../images/auth-Image.svg";
import authLogo from "../../images/Logo-white.svg";

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="min-h-screen bg-[#0D1321] flex items-center justify-center px-6">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div className="text-white w-full max-w-md pl-6">
          <Image src={authLogo} alt="QuizWiz Logo" className="mb-10 w-64 h-auto"/>
          {children}
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex justify-center">
          <div className="rounded-3xl">
            <Image
              src={authImage}
              alt="AuthImg"
              className="w-full h-auto"
            />
          </div>
        </div>

      </div>
    </main>
  );
}