/* eslint-disable @typescript-eslint/no-explicit-any */

export default async function ResultsDetails({params}: any) {

  const {resultsId} = await params
  return (
    <>
      <div>ResultsDetails</div>
      <h1> results ID is : {resultsId}</h1>
    </>
  )
}
