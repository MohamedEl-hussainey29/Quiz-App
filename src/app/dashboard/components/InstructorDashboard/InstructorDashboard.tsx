import QuizzesCard from "../../../Shared/components/QuizzesCard/QuizzesCard";
import TopStudentsCard from "../TopStudentsCard/TopStudentsCard";

export default function InstructorDashboard() {
  return (
    <div className="my-4 px-5">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <QuizzesCard />
        </div>

        <div className="lg:col-span-2">
          <TopStudentsCard />
        </div>
      </div>
    </div>
  );
}