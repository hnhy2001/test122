import { Metadata } from "next";
import FormSchema from "./form";
export const metadata: Metadata = {
  title: "Forgot Password",
  robots: {
    index: false,
    follow: true,
  },
};
const Page = () => {
  return <FormSchema />;
}
export default Page