import Image from "next/image";
import authImage from "../../images/auth-Image.svg";
import authLogo from "../../images/Logo-white.svg";

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="min-h-screen bg-[#0D1321] flex justify-center px-6">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <div className="w-full pt-6">
          <Image
            src={authLogo}
            alt="QuizWiz Logo"
            className="mb-10 w-64 h-auto"
          />

          <div className="flex flex-col justify-center min-h-[calc(100vh-180px)] lg:min-h-0 lg:block">
  {children}
</div>
        </div>

        <div className="hidden lg:flex items-center justify-center min-h-screen">
          <div className="rounded-3xl">
            <Image src={authImage} alt="AuthImg" className="w-full h-auto" />
          </div>
        </div>

      </div>
    </main>
  );
}