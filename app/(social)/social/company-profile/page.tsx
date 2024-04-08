import { Metadata } from "next";
import Common from "./common"
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Company Profile",
  robots: {
    index: false,
    follow: true,
  },
};

const Page = async () => {
  const session = await getServerSession(options);
  const user = session?.user;
  return (
    <div className="container py-8">
      <Common user={user}/>
    </div>
  )
}
export default Page