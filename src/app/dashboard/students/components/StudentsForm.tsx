/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { StudentsAPI } from "@/src/api";
import avatar1 from "../../../images/user img (1).png";
import avatar2 from "../../../images/user img (2).png";
import avatar3 from "../../../images/user img (3).png";
import avatar4 from "../../../images/user img.png";
import { useEffect, useState } from "react";
import { Student } from "@/src/types/students";
import Pagination from "@/src/app/Shared/components/Pagination/Pagination";
import StudentCard from "@/src/app/Shared/components/StudentCard/StudentCard";
import SkeletonUI from "./Skeleton";
import { ViewDetailsDialog } from "./ViewDetailsDialog";
import { StaticImageData } from "next/image";
import { toast } from "sonner";

export default function StudentsForm() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<StaticImageData | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const itemsPerPage = 10;
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;
  const currentStudents = students.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const avatars = [avatar3, avatar4, avatar2, avatar1];

  const getAllStudents = async () => {
    setLoading(true);
    try {
      const response = await StudentsAPI.getAllStudents();
      setStudents(response.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);


  return (
    <>
      <section className="border border-[#00000033] px-10 rounded-[10px] my-5 overflow-y-auto md:mx-5">
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


          <div className="grid md:grid-cols-2 gap-3 mt-5 ">
            {loading && <SkeletonUI numElements={10}/>}
            {currentStudents.map((student, index) => (
              <StudentCard key={student._id} student={student} avatar={avatars[index % avatars.length]} 
              onView={() => {
                setSelectedStudent(student);
                setSelectedAvatar(avatars[index % avatars.length]);
                setIsDialogOpen(true);
              }}
            />
          ))}
        </div>

        <ViewDetailsDialog
          student={selectedStudent}
          avatar={selectedAvatar!}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
       
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
       
      </section>
    </>
  );
}
