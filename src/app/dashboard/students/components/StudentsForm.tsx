/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import avatar1 from "../../../images/user img (1).png";
import avatar2 from "../../../images/user img (2).png";
import avatar3 from "../../../images/user img (3).png";
import avatar4 from "../../../images/user img.png";
import { useState } from "react";
import { Student } from "@/src/types/students";
import Pagination from "@/src/app/Shared/components/Pagination/Pagination";
import StudentCard from "@/src/app/Shared/components/StudentCard/StudentCard";
import SkeletonUI from "./Skeleton";
import { ViewDetailsDialog } from "./ViewDetailsDialog";
import { StaticImageData } from "next/image";
import useStudents from "@/src/hooks/useStudents";
import useGroups from "@/src/hooks/useGroups";
import NoData from "@/src/app/Shared/components/NoData/NoData";

export default function StudentsForm() {
  const { students, loading } = useStudents();
  const { groups } = useGroups();
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  const filteredStudents =
    selectedGroup === "all"
      ? students
      : students.filter((student) => student.group?._id === selectedGroup);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<StaticImageData | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 10;
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;
  const currentStudents = filteredStudents.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const avatars = [avatar3, avatar4, avatar2, avatar1];

  return (
    <>
      <section className="border border-[#00000033] px-10 rounded-[10px] my-5 overflow-y-auto md:mx-5">
        <h3 className="py-3 text-[20px] font-medium">Students List</h3>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setSelectedGroup("all");
              setCurrentPage(1);
            }}
            className={`rounded-full border px-4 py-1 cursor-pointer ${
              selectedGroup === "all"
                ? "bg-[#FFEDDF] border-[#C5D86D]"
                : "border-[#00000033]"
            }`}
          >
            All
          </button>

          {groups.map((group) => (
            <button
              onClick={() => {
                setSelectedGroup(group._id);
                setCurrentPage(1);
              }}
              className={`rounded-full border px-4 py-1 cursor-pointer ${
                selectedGroup === group._id
                  ? "bg-[#FFEDDF] border-[#C5D86D]"
                  : "border-[#00000033]"
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>

          {loading ? (
            <SkeletonUI numElements={10} />
          ) : currentStudents.length === 0 ? (
            <NoData item="Students" />
          ) : (
            <div className="grid md:grid-cols-2 gap-3 mt-5">
              {currentStudents.map((student, index) => (
                <StudentCard
                  key={student._id}
                  student={student}
                  avatar={avatars[index % avatars.length]}
                  onView={() => {
                    setSelectedStudent(student);
                    setSelectedAvatar(avatars[index % avatars.length]);
                    setIsDialogOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        
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
