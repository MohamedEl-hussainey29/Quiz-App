/* eslint-disable @typescript-eslint/no-explicit-any */
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from '../../Shared/components/SideBar/SideBar';
import NavBar from './../../Shared/components/NavBar/NavBar';

export default function MasterLayout({ children }: any) {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        <SideBar />

        <div className="flex flex-col w-full h-screen overflow-hidden">
          <div className="sticky top-0 z-20">
            <NavBar />
          </div>

          <main className="grow px-2 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}