import { Student, StudentCardProps } from "@/src/types/students";
import Image, { StaticImageData } from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";

export default function StudentCard({
  student,
  avatar,
  onView
}: StudentCardProps) {

  return (
    <div
      key={student._id}
      className="flex gap-3 border rounded-[5px] border-[#00000033] items-center relative hover:translate-x-1 hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      <div className="img">
        <Image
          src={avatar}
          alt={`${student.first_name} ${student.last_name}`}
          className=""
        />
      </div>
      <div className="pr-7">
        <h3 className="text-[18px]">
          {student.first_name} {student.last_name}
        </h3>
        <p className="text-[13px] text-[#0D1321CC]">
          {student.group?.name ?? "no group"}
        </p>
      </div>
      <button
      onClick={onView} 
      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
        <FaArrowCircleRight className="text-[20px]" />
      </button>
    </div>
  );
}
