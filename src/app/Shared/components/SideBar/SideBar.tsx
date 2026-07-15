"use client"

import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar} from "@/components/ui/sidebar"
import { Home, Boxes, Users, ClipboardClock, BarChart3, LogOut, Landmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import AppLogo from "../../../images/Logo-black.svg"
import { useContext, useState } from "react"
import { AuthContext } from "@/src/context/AuthContext"
import { LogoutConfirmation } from "../LogoutConfirmation/LogoutConfirmation"
import { useAuth } from "@/src/context/AuthContext"

const instructorLinks = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Quizzes", url: "/dashboard/quizzes", icon: ClipboardClock },
  { title: "Questions", url: "/dashboard/questions", icon: Landmark },
  { title: "Groups", url: "/dashboard/groups", icon: Boxes },
  { title: "Students", url: "/dashboard/students", icon: Users },
  { title: "Results", url: "/dashboard/results", icon: BarChart3 },
]

const studentLinks = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Results", url: "/dashboard/results", icon: BarChart3 },
]

function IconChip({ icon: Icon, active }: { icon: React.ElementType; active: boolean }) {
  return (
    <div
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-lg shrink-0 transition-colors",
        active ? "bg-black text-white" : "bg-[#FFEDDF] text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </div>
  )
}

export default function SideBar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  const authContext = useContext(AuthContext)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const { userData } = useAuth()
  const isStudent = userData?.role === "Student"

  const menuLinks = isStudent ? studentLinks : instructorLinks

  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="py-5">
        <div className="flex justify-center border-b-2 pb-3">
          <Link href="/dashboard">
            <Image src={AppLogo} alt="logo" className="h-9 w-auto" />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuLinks.map((item) => {
                const isActive =
                  item.url === "/dashboard"
                    ? pathname === item.url
                    : pathname.startsWith(item.url)

                return (
                  <SidebarMenuItem key={item.title} className="relative">
                    <SidebarMenuButton
                      render={<Link href={item.url} onClick={closeMobileSidebar} />}
                      isActive={isActive}
                      className={cn(
                        "h-16 gap-3 rounded-none border-b-2 pl-2",
                        "group-data-[collapsible=icon]:h-16! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:p-0!",
                        "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0",
                        "data-active:bg-transparent data-active:hover:bg-[#FFF6EE]",
                        isActive
                          ? "font-semibold text-black"
                          : "text-gray-600 hover:bg-[#FFF6EE]/60"
                      )}
                    >
                      <IconChip icon={item.icon} active={isActive} />
                      <span className="text-base group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </SidebarMenuButton>

                    {isActive && (
                      <span className="absolute right-0 top-1/2 h-full w-1 -translate-y-1/2 rounded-none-full bg-black" />
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-1 border-t py-4">
        <SidebarMenuItem>
          <SidebarMenuButton
            render={<button onClick={() => setLogoutOpen(true)} className="cursor-pointer" />}
            className={cn(
              "h-16 gap-3 rounded-none px-3 text-gray-600 hover:bg-[#FFF6EE]/60",
              "group-data-[collapsible=icon]:h-16! group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:p-0!",
              "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
            )}
          >
            <IconChip icon={LogOut} active={false} />
            <span className="text-base group-data-[collapsible=icon]:hidden">
              Logout
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
      <LogoutConfirmation
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={() => authContext?.logout()}
      />
    </Sidebar>
  )
}