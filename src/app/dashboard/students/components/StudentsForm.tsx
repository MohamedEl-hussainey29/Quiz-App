"use client";
import { StudentsAPI } from "@/src/api";
import avatar1 from "../../../images/user img (1).png";
import avatar2 from "../../../images/user img (2).png";
import avatar3 from "../../../images/user img (3).png";
import avatar4 from "../../../images/user img.png";
import { FaArrowCircleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Student } from "@/src/types/students";
import Pagination from "@/src/app/Shared/components/Pagination/Pagination";
import { toast } from "react-toastify";
import Image from "next/image";
import StudentCard from "@/src/app/Shared/components/StudentCard/StudentCard";

export default function StudentsForm() {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;
  const currentStudents = students.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const avatars = [avatar1, avatar2, avatar3, avatar4];

  const getAllStudents = async () => {
    try {
      const response = await StudentsAPI.getAllStudents();
      setStudents(response.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }}

    useEffect(() => {
      getAllStudents();
    }, []);

    return (
      <>
        <section className="border border-[#00000033] py-7 px-10 w-257.5 ml-2 rounded-[10px]">
          <h3 className="py-3 text-[20px] font-medium">Students List</h3>

          <div className="flex gap-3">
            <button className="flex items-center gap-1 justify-center border border-[#00000033] rounded-full py-1 px-4 font-medium  ">
              Group 1
            </button>
            <button className="flex items-center gap-1 justify-center border border-[#00000033] rounded-full py-1 px-4 font-medium  ">
              Group 2
            </button>
            <button className="flex items-center gap-1 justify-center border border-[#00000033] rounded-full py-1 px-4 font-medium  ">
              Group 3
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5 ">
            {currentStudents.map((student, index) => (
              <StudentCard student={student} avatar={avatars[index % avatars.length]} />
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </>
    );
  };

