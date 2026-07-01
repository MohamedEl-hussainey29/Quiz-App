/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthLayout from "../layouts/AuthLayout/layout";

export default function layout({children}: any) {
  return (
    <>
        <AuthLayout>{children}</AuthLayout>
    </>
  )
}
