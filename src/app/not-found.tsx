"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import notFoundImg from "../app/images/notfound-img.png";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-[#0B1020] px-6">
      <div className="absolute left-1/2 top-1/2 size-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5D86D]/10 blur-[140px]" />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center text-center">
        {/* <h1 className="absolute top-0 md:top-6 text-[150px] font-extrabold leading-none text-[#C5D86D]/10 select-none md:text-[240px] lg:text-[300px]">
          404
        </h1> */}

        <div className="relative flex items-center gap-8">
            <button
          onClick={() => router.back()}
          className="group flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-[#0B1020] transition-all duration-300 hover:scale-[1.03] hover:bg-gray-200 active:scale-95 "
        >
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
          Go Back
        </button>

          <Image
            src={notFoundImg}
            alt="Page Not Found"
            priority
            className=" md:w-107.5 lg:w-160 drop-shadow-[0_20px_60px_rgba(0,0,0,.45)]"
          />
        </div>

        
      </div>

      <div className="absolute left-12 top-24 h-3 w-3 rounded-full bg-[#C5D86D]" />
      <div className="absolute right-16 top-36 h-2 w-2 rounded-full bg-white/60" />
      <div className="absolute bottom-24 left-20 h-2 w-2 rounded-full bg-white/30" />
      <div className="absolute bottom-40 right-24 h-3 w-3 rounded-full bg-[#C5D86D]/70" />

      {/* <div className="mt-8 max-w-xl">
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Oops! Page Not Found
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-400 md:text-lg">
            Looks like this quiz has disappeared or the page doesn't exist
            anymore. Let's get you back to the right track.
          </p>
        </div> */}
    </section>
  );
}
