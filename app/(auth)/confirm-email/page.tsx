import { getRequest } from "@/hook/api";
import Link from "next/link";
import React from "react";

const ConfirmEmail = async (props: any) => {
  const token = props.searchParams?.token || "";
  const [data] = await Promise.all([
    getRequest("/auth/verify-account/" + token),
  ]);
  const content =
    data.is_success == 1
      ? "Thank you for confirming the email successfully. You can login now"
      : "Verifing the email failed";

  return (
    <div className="text-center pt-8">
      {data.is_success == 1
        ? <div className="text-3xl font-bold">
          <span>Thank you for confirming the email successfully. </span> <Link className="underline" href={"/signin"}>You can login now</Link>
        </div>
        : "Verifing the email failed"}
    </div>
  );
};

export default ConfirmEmail;
