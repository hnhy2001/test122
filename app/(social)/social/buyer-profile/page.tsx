import { Metadata } from "next";
import Common from "./common"
import { getRequest } from "@/hook/api";

export const metadata: Metadata = {
  title: "Buyer Profile",
  robots: {
    index: false,
    follow: true,
  },
};

const Page = async () => {
  const user = await getRequest("/user/profile");

  return (
    <div className="py-8">
      <Common user={user?.data}/>
    </div>
  )
}
export default Page