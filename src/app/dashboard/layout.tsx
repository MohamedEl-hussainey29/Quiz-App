/* eslint-disable @typescript-eslint/no-explicit-any */

import MasterLayout from "../layouts/MasterLayout/layout";

export default function layout({children}: any) {
  return (
    <>
        <MasterLayout>{children}</MasterLayout>
    </>
  )
}
