/* eslint-disable @typescript-eslint/no-explicit-any */
import SideBar from '../../Shared/components/SideBar/SideBar';
import NavBar from './../../Shared/components/NavBar/NavBar';



export default function MasterLayout({children}: any) {
  return (
    <>
      <div className="flex overflow-hidden">
        <div className="shrink-0 h-full">
          <SideBar/>
        </div>

        <div  style={{height : 'calc(100vh - 70px)'}}>
          <NavBar/>
          <main className="grow overflow-auto">
            {children}
          </main>

        </div>
      </div>
    </>
  )
}