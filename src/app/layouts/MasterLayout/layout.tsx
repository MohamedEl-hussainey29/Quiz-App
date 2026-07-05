/* eslint-disable @typescript-eslint/no-explicit-any */
import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from '../../Shared/components/SideBar/SideBar';
import NavBar from './../../Shared/components/NavBar/NavBar';

export default function MasterLayout({ children }: any) {
  return (
    <SidebarProvider>
      <div className="flex overflow-hidden w-full">
        <SideBar />

        <div className="flex flex-col w-full" style={{ height: 'calc(100vh - 70px)' }}>
          <NavBar/>
          <main className="grow overflow-auto pl-2">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}