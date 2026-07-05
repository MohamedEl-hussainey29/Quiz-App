import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StudentDetailsProps } from "@/src/types/students";
import Image from "next/image";

export function ViewDetailsDialog({
  student,
  avatar,
  open,
  onOpenChange,
}: StudentDetailsProps) {
  if (!student || !avatar) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Student Details
          </DialogTitle>
        </DialogHeader>
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
              <span className="text-gray-500">{student.role}</span>{" "}
              
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
            <span>{student.status}</span>
          </div>

          <Separator />
          <div className="flex justify-between w-full">
            <span className="font-medium">Group</span>
            <span>{student.group?.name ?? "-"}</span>
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
