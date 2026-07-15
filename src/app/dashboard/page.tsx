"use client"
import { useAuth } from "@/src/context/AuthContext";
import InstructorDashboard from "./components/InstructorDashboard/InstructorDashboard";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";

export default function Dashboard() {
  const {userData} = useAuth();
  const userRole = userData?.role;
  return (
    <>
      {userRole == "Student" ? <StudentDashboard/> : <InstructorDashboard/>}
    </>
  )
}
