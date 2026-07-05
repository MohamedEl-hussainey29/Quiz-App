import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StudentDetailsProps } from "@/src/types/students";
import { X } from "lucide-react";
import Image from "next/image";

export function ViewDetailsDialog({
  student,
  avatar,
  open,
  onOpenChange,
}: StudentDetailsProps) {
  if (!student || !avatar) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="[&>button]:hidden">
        
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-black sm:px-6 sm:text-xl">Student Details</h3>

              <button
                onClick={() => onOpenChange(false)}
                className="flex h-16 w-14 items-center justify-center border-l-3 transition-colors hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
         
        <div className="flex flex-col items-center gap-3">
          <Image
            src={avatar}
            alt={student?.first_name}
            className="rounded-full"
            width={110}
            height={110}
          />

          <div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold">
                {student.first_name} {student.last_name}
              </h2>
            </div>
          </div>

          <Separator />
          <div className="flex justify-between w-full">
            <span className="font-medium">Email</span>
            <span>{student.email}</span>
          </div>

          <Separator />
          <div className="flex justify-between w-full">
            <span className="font-medium">ID</span>
            <span>{student._id}</span>
          </div>

          <Separator />
          <div className="flex justify-between w-full">
            <span className="font-medium">Status</span>
            <span className={` rounded-full py-.5 px-2 ${student.status === 'active' ? "bg-[#E8F5E9] text-[#4CAF50]" : "bg-gray-100 text-gray-500" }`}>{student.status}</span>
          </div>

          <Separator />
          <div className="flex justify-between w-full">
            <span className="font-medium">Group</span>
            <span>{student.group?.name ?? "no group"}</span>
          </div>

          <Separator />
          <div className="flex justify-between w-full">
            <span className="font-medium">Role</span>
            <span>{student.role}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
