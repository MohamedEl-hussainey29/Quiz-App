"use client";
import { GroupsAPI } from "@/src/api";
import Pagination from "@/src/app/Shared/components/Pagination/Pagination";
import { Group } from "@/src/types/groups";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import SkeletonUI from "../../students/components/Skeleton";

interface GroupsFormProps {
   groups: Group[];
  loading: boolean;
}

export default function GroupsForm({groups, loading}: GroupsFormProps ) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;
  const currentGroups = groups.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(groups.length / itemsPerPage);


  return (
    <>
      <section className="border border-[#00000033] px-10 rounded-[10px] my-5 overflow-y-auto md:mx-5">
        <h3 className="py-3 text-[20px] font-medium">Groups List</h3>

        <div className="grid md:grid-cols-2 gap-3 mt-5 ">
          {loading ? (<SkeletonUI numElements={10}/>) : (currentGroups.map((group) => (
            <div
              key={group._id}
              className="flex gap-3 border rounded-[5px] border-[#00000033] items-center relative hover:translate-x-1 hover:shadow-md transition-all duration-300 cursor-pointer py-2 px-3"
            >
              <div className="pr-7">
                <h3 className="text-[18px]">Group : {group.name} </h3>
                <p className="text-[13px] text-[#0D1321CC]">
                  <span className="text-[#C5D86D]">No. of students : </span>
                  {group.students?.length ?? 0}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[18px] absolute right-3 top-1/2 -translate-y-1/2">
                <FaEdit />
                <FaTrash />
              </div>
            </div>
          )))}
          
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </>
  );
}
