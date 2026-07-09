import { useEffect, useState } from "react";
import { StudentsAPI } from "@/src/api";
import { Student } from "@/src/types/students";
import { toast } from "react-toastify";

export default function useStudents() {
    
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

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

  return {
  students,
  loading,
};

}