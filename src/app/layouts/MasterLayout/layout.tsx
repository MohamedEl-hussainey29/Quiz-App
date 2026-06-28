/* eslint-disable @typescript-eslint/no-explicit-any */
import SideBar from '../../Shared/components/SideBar/SideBar';
import NavBar from './../../Shared/components/NavBar/NavBar';



export default function MasterLayout({children}: any) {
  return (
    <>
      <NavBar/>
      <SideBar/>
      {children}
    </>
  )
}