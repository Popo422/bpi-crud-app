import EmployeeRecords from "@/app/components/EmployeeRecords";
import Header from "@/app/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="w-full h-full overflow-auto bg-base-200">
      <Header />
      <div className="flex w-full pt-20 justify-center gap-20 h-full">
        <EmployeeRecords />
      </div>
    </div>
  );
};

export default Home;
