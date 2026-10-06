/* eslint-disable @typescript-eslint/no-explicit-any */

import MasterLayout from "../layouts/MasterLayout/layout";
import ProtectedRoutes from "../Shared/components/ProtectedRoutes/ProtectedRoutes";

export default function layout({children}: any) {
  return (
    <>
        <ProtectedRoutes>
          <MasterLayout>
            {children}
          </MasterLayout>
        </ProtectedRoutes>
    </>
  )
}
