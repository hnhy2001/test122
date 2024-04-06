import { Metadata } from "next";
import Common from "./common"

export const metadata: Metadata = {
  title: "Buyer Profile",
  robots: {
    index: false,
    follow: true,
  },
};

const Page = () => {
  return (
    <div className="container py-8">
      <Common/>
    </div>
  )
}
export default Page