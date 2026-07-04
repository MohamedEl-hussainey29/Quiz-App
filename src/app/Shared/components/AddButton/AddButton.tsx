import { FaPlusCircle } from "react-icons/fa";

export default function AddButton({text, onClick}: {text: string, onClick: () => void}) {
  return <>
  
  <button className="flex items-center gap-1 justify-center border-2 border-[#00000033] rounded-full py-2 px-1 w-35 font-medium " >
     <FaPlusCircle className="text-[20px]" /> 
     {text}
     </button>

  </>
}
