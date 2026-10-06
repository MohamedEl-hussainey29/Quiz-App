"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import notFoundImg from "../app/images/notfound-img.png";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1020] px-6 py-12 md:py-0">
      <div className="absolute left-1/2 top-1/2 size-80 sm:size-120 md:size-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5D86D]/10 blur-[100px] md:blur-[140px]" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center text-center">
        
        <div className="flex flex-col-reverse items-center justify-center gap-8 md:flex-row md:gap-12 lg:gap-16">
          
          <div className="flex shrink-0 items-center justify-center">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-base font-bold text-[#0B1020] transition-all duration-300 hover:scale-[1.03] hover:bg-gray-200 active:scale-95 md:px-8 md:py-4 md:text-lg cursor-pointer"
            >
              <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
              Go Back
            </button>
          </div>

          <div className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl">
            <Image
              src={notFoundImg}
              alt="Page Not Found"
              priority
              className="h-auto w-full object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,.45)]"
            />
          </div>
        </div>

      </div>

      <div className="absolute left-6 top-12 h-2 w-2 rounded-full bg-[#C5D86D] sm:left-12 sm:top-24 sm:h-3 sm:w-3" />
      <div className="absolute right-8 top-16 h-2 w-2 rounded-full bg-white/60 sm:right-16 sm:top-36" />
      <div className="absolute bottom-12 left-10 h-2 w-2 rounded-full bg-white/30 sm:bottom-24 sm:left-20" />
      <div className="absolute bottom-20 right-12 h-2 w-2 rounded-full bg-[#C5D86D]/70 sm:bottom-40 sm:right-24 sm:h-3 sm:w-3" />
    </section>
  );
}