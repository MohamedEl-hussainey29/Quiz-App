"use client"
import { AuthAPI } from "@/src/api";
import { AuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function SideBar() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const logout = async() => {
    try {
      const response = await AuthAPI.Logout();
      localStorage.removeItem("token");
      authContext?.setUserData(null);
      router.push("/")
      toast.success(response?.data?.message)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className="flex flex-col items-start gap-3 px-4">
        <div>SideBar</div>
        <button className="bg-green-500 p-3 rounded-md cursor-pointer" onClick={()=> router.push("/change-pass")}>Change Password</button>
        <button className="bg-sky-500 p-3 rounded-md cursor-pointer" onClick={logout}>Logout</button>
      </div>
    </>
  )
}
