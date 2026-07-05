import { StaticImageData } from "next/image";

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  group: {
    _id: string;
    name: string;
    status: string;
  };
}

export interface StudentCardProps{
   student: Student;
   avatar: string | StaticImageData;
   onView?: () => void;
}

export interface StudentDetailsProps {
   student: Student | null;
   avatar: null | StaticImageData;
   open: boolean;
   onOpenChange: (open: boolean) => void;
}