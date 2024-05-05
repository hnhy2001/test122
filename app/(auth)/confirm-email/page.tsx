import { Button } from "@/components/ui/button";
import { getRequest } from "@/hook/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ConfirmEmail = async (props: any) => {
  const token = props.searchParams?.token || "";
  let check = -1;
  const [data] = await Promise.all([
    getRequest("/auth/verify-account/" + token)
      .then((res: any) => {
        check = 1;
      })
      .catch((err) => (check = -1)),
  ]);

  return (
    <div className="text-center pt-8 flex justify-center items-center h-[80vh]">
      {check == 1 ? (
        <div className="gap-6 text-4xl font-bold flex flex-col justify-center items-center h-96 shadow-xl rounded-lg w-[25%]">
          <img src="/verify-success.png" alt="success" className="w-16 h-16" />
          <span className="text-[#081342]">Thank you for confirming the email successfully. </span>{" "}
          <Button className="text-xl">
            <Link href={"/signin"}>
              You can login now
            </Link>
          </Button>
        </div>
      ) : (
        <div className="gap-6 text-4xl font-bold flex flex-col justify-center items-center h-96 shadow-xl rounded-lg w-[25%]">
          <img src="/verify-fail.png" alt="success" className="w-16 h-16" />
          <span className="text-[#081342]">Verifing the email failed</span>{" "}
          <Button className="text-xl">
            <Link href={"/register"}>
              Register again
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConfirmEmail;
