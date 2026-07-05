/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { AuthContext } from "@/src/context/AuthContext"
import { AlarmClockPlus, Mail, Bell, ChevronDown, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { useContext } from "react"
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

function IconBadge({
  icon: Icon,
  count,
}: {
  icon: React.ElementType
  count?: number
}) {
  return (
    <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black hover:bg-gray-50 transition-colors sm:h-10 sm:w-10">
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      {count !== undefined && count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFEDDF] px-1 text-[10px] font-semibold text-black">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  )
}

function Divider() {
  return <div className="hidden h-18 w-px shrink-0 bg-gray-200 md:block" />
}

export default function NavBar() {
  const { userData, logout }: any = useContext(AuthContext)
  const pathname = usePathname()
  const pageName = pathname.split("/").filter(Boolean).pop()

  return (
    <header className="flex h-16 items-center justify-between border-b-2 bg-white px-3 sm:h-17.5 sm:px-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <SidebarTrigger className="[&_svg]:size-6! cursor-pointer shrink-0" />
        <h1 className="truncate text-base font-semibold text-black capitalize sm:text-xl">
          {pageName}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button className="flex items-center gap-2 rounded-full border border-gray-200 px-2.5 py-2 text-sm font-medium text-black hover:bg-gray-50 transition-colors sm:px-4 cursor-pointer">
          <AlarmClockPlus className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="hidden sm:inline">New quiz</span>
        </button>

        <Divider />

        <div className="flex items-center gap-1 sm:gap-4">
          <IconBadge icon={Mail} count={10} />
          <Divider />
          <IconBadge icon={Bell} count={10} />
        </div>

        <Divider />

        <Popover>
          <PopoverTrigger
            render={
              <button className="flex items-center gap-1.5 pl-1 hover:opacity-80 transition-opacity cursor-pointer sm:gap-2">
                <div className="hidden flex-col items-start leading-tight sm:flex">
                  <span className="text-sm font-semibold text-black">
                    {userData?.first_name} {userData?.last_name}
                  </span>
                  <span className="text-xs font-medium text-[#C5D86D]">
                    {userData?.role}
                  </span>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFEDDF] text-sm font-semibold text-black sm:hidden">
                  {userData?.first_name?.[0]}
                  {userData?.last_name?.[0]}
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
            }
          />
          <PopoverContent
            align="end"
            className="w-[calc(100vw-1.5rem)] max-w-72 rounded-2xl border border-gray-100 p-0 shadow-lg sm:w-72"
          >
            <div className="flex items-center gap-3 border-b border-gray-100 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFEDDF] text-base font-semibold text-black">
                {userData?.first_name?.[0]}
                {userData?.last_name?.[0]}
              </div>
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-sm font-semibold text-black">
                  {userData?.first_name} {userData?.last_name}
                </span>
                <span className="text-xs font-medium text-[#C5D86D]">
                  {userData?.role}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="shrink-0 text-gray-500">ID</span>
                <span className="truncate font-medium text-black">
                  {userData?._id}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="shrink-0 text-gray-500">Email</span>
                <span className="truncate font-medium text-black">
                  {userData?.email}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    userData?.status === "active"
                      ? "bg-[#E8F5E9] text-[#4CAF50]"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  {userData?.status}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 p-2">
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}