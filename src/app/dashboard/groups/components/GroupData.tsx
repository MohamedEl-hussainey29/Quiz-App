"use client";
import { Group } from "@/src/types/groups";
import { useState } from "react";
import AddButton from "../../../Shared/components/AddButton/AddButton";
import GroupsForm from "./GroupsForm";
import { Check, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IoIosArrowDown } from "react-icons/io";
import useStudents from "@/src/hooks/useStudents";
import { useForm } from "react-hook-form";
import { GroupsAPI } from "@/src/api";
import { toast } from "sonner";
import axios from "axios";
import { DeleteConfirmation } from "@/src/app/Shared/components/DeleteConfirmation/DeleteConfirmation";
import useGroups from "@/src/hooks/useGroups";


export interface GroupFormData {
  name: string;
  students: string[];
}

export default function GroupData() {
  
  const { students } = useStudents();
  const [open, setOpen] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [edittingGroup, setEdittingGroup] = useState<Group | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const {groups, loading, getGroups} = useGroups();

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

  
  const selectedStudents = watch("students");

  const isEditMode = !!edittingGroup;

  const selectedStudentNames = students
    .filter((student) => selectedStudents.includes(student._id))
    .map((student) => `${student.first_name} ${student.last_name}`);

  const onSubmit = async (data: GroupFormData) => {
    try {
      setIsSubmitting(true);

      let response;
      if (isEditMode) {
        response = await GroupsAPI.UpdateGroup(edittingGroup._id, data);
      } else {
        response = await GroupsAPI.CreateGroup(data);
      }
      toast.success(response.data.message);
      await getGroups();
      reset({
        name: "",
        students: [],
      });
      setEdittingGroup(null);
      setShowStudents(false);
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
    reset({
      name: "",
      students: [],
    });

    setEdittingGroup(null);
    setShowStudents(false);
    setOpen(false);
  };

  // delete group
  const handleDeleteGroup = async () => {
    if (!selectedGroup) return;

    try {
      const response = await GroupsAPI.DeleteGroup(selectedGroup._id);
      toast.success(response.data.message);
      await getGroups();
      setSelectedGroup(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-end mt-4 sm:mx-4">
        <AddButton
          text="Add Group"
          onClick={() => {
            setEdittingGroup(null);
            reset({
              name: "",
              students: [],
            });
            setOpen(true);
          }}
        />
      </div>

      <GroupsForm
        groups={groups}
        loading={loading}
        onEdit={(group) => {
          setEdittingGroup(group);
          reset({
            name: group.name,
            students: group.students,
          });
          setOpen(true);
        }}
        onDelete={(group) => {
          setSelectedGroup(group);
          setDeleteOpen(true);
        }}
      />

      {/* Add group */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-250 md:max-w-2xl! overflow-hidden rounded-2xl border-0 p-0 shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between shadow-xl">
            <h2 className="px-4 py-4 text-lg font-bold text-black sm:px-6 sm:text-xl">
              {isEditMode ? "Update Group" : "Set up a new Group"}
            </h2>

            <div className="flex shrink-0">
              <button
                type="submit"
                form="create-group-form"
                disabled={isSubmitting}
                className="..."
              >
                {isSubmitting ? (
                  <div className="flex h-16 w-14 items-center justify-center border-l-3 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  </div>
                ) : (
                  <div className="flex h-16 w-14 items-center justify-center border-l-3 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer">
                    <Check className="size-5" />
                  </div>
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
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="rounded-[10px] bg-[#FFEDDF] px-3 py-2">
                    Select Students
                  </span>

                  {selectedStudentNames.length > 0 && (
                    <span className="truncate text-[#555]">
                      {selectedStudentNames.length <= 2
                        ? selectedStudentNames.join(", ")
                        : `${selectedStudentNames.length} Students Selected`}
                    </span>
                  )}
                </div>
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

      <DeleteConfirmation
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteGroup}
        item="Group"
        displayName={selectedGroup?.name}
        itemData={
          selectedGroup
            ? {
                _id: selectedGroup._id,
                description: `Are you sure you want to delete "${selectedGroup.name}"?`,
              }
            : null
        }
      />
    </>
  );
}
