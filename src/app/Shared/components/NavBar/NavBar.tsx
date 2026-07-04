import { SidebarTrigger } from "@/components/ui/sidebar";

export default function NavBar() {
  return (
    <>
       <header className="flex items-center gap-2 h-17.5 border-b px-4">
          <SidebarTrigger className="[&_svg]:size-6! cursor-pointer"/>
        </header>
    </>
  )
}
