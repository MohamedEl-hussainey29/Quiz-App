"use client";
import { Group } from "@/src/types/groups";
import { useEffect, useState } from "react";
import AddButton from "../../../Shared/components/AddButton/AddButton";
import GroupsForm from "./GroupsForm";
import { Check, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IoIosArrowDown } from "react-icons/io";
import useStudents from "@/src/hooks/useStudents";
import { useForm } from "react-hook-form";
import { GroupsAPI } from "@/src/api";
import { toast } from "sonner";
import axios, { isAxiosError } from "axios";

export interface GroupFormData {
  name: string;
  students: string[];
}

export default function GroupData() {
  const [groups, setGroups] = useState<Group[]>([]);
const [loading, setLoading] = useState(false);
  const { students } = useStudents();
  const [open, setOpen] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<GroupFormData>({
    defaultValues: {
      name: "",
      students: [],
    },
  });

  // get groups data
   const getAllGroups = async () => {
      setLoading(true);
      try {
        const response = await GroupsAPI.getAllGroups();
        setGroups(response.data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally{
        setLoading(false);
      }
    };

    useEffect(() => {
    getAllGroups();
  }, []);

  const selectedStudents = watch("students");
  const selectedStudentNames = students
    .filter((student) => selectedStudents.includes(student._id))
    .map((student) => `${student.first_name} ${student.last_name}`);

  const onSubmit = async (data: GroupFormData) => {
    try {
      setIsSubmitting(true);
      const response = await GroupsAPI.createGroup(data);
      await getAllGroups();
      toast.success(response.data.message);
      reset();
      setOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStudentChange = (id: string) => {
    const currentStudents = watch("students");

    if (currentStudents.includes(id)) {
      setValue(
        "students",
        currentStudents.filter((studentId) => studentId !== id),
      );
    } else {
      setValue("students", [...currentStudents, id]);
    }
  };

  const handleClose = () => {
  reset();
  setShowStudents(false);
  setOpen(false);
};

  return (
    <>
      <div className="flex items-center justify-end mt-4">
        <AddButton
          text="Add Group"
          onClick={() => {
            setOpen(true);
          }}
        />
      </div>

      <GroupsForm groups={groups} loading={loading} />

      {/* Add group */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-250 md:max-w-2xl! overflow-hidden rounded-2xl border-0 p-0 shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between shadow-xl">
            <h2 className="px-4 py-4 text-lg font-bold text-black sm:px-6 sm:text-xl">
              Set up a new Group
            </h2>

            <div className="flex shrink-0">
              <button
                type="submit"
                form="create-group-form"
                disabled={isSubmitting}
                className="..."
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ) : (
                  <Check className="h-5 w-5 " />
                )}
              </button>

              <button
                onClick={handleClose}
                className="flex h-16 w-14 items-center justify-center border-l-3 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} id="create-group-form">
            <div className="px-5 text-center pt-3">
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-2 p-2 pl-28
                  outline-none"
                  {...register("name", {
                    required: "Group name is required",
                  })}
                />
                <span className="bg-[#FFEDDF] py-2 px-3 rounded-[10px] absolute left-0.5 top-0 h-full flex justify-center items-center">
                  Group Name
                </span>
              </div>
              {errors.name && (
                <p className="mt-1  text-left text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className=" px-5 py-3 mb-3 text-center">
              <button
                type="button"
                onClick={() => setShowStudents(!showStudents)}
                className="flex w-full items-center justify-between rounded-[10px] border-2"
              >
                <span className="bg-[#FFEDDF] h-full max-w-[80%] truncate rounded-[10px] py-2 px-3 text-left">
                  {selectedStudentNames.length === 0
                    ? "Select Students"
                    : selectedStudentNames.length <= 2
                      ? selectedStudentNames.join(", ")
                      : `${selectedStudentNames.length} Students Selected`}
                </span>
                <span className="mr-3 cursor-pointer ">
                  <IoIosArrowDown className="text-[18px]" />
                </span>
              </button>

              {showStudents && (
                <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border cursor-pointer">
                  {students.map((student) => (
                    <div
                      key={student._id}
                      className="flex items-center gap-3 border-b px-3 py-2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => handleStudentChange(student._id)}
                      />

                      <span>
                        {student.first_name} {student.last_name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
