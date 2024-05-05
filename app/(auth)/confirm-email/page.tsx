import { Button } from "@/components/ui/button";
import { getRequest } from "@/hook/api";
import Image from "next/image";
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
    <div className="text-center pt-8">
      {check == -1 ? (
        <div className="text-3xl font-bold flex flex-col justify-center">
          <Image
            src="/verify-success.png"
            width={64}
            height={64}
            alt="delete"
            className="w-6 h-6 cursor-pointer"
          />
          <span>Thank you for confirming the email successfully. </span>{" "}
          {/* <Link className="underline" href={"/signin"}>
            <Button>You can login now</Button>
          </Link> */}
          <Button>ok</Button>
        </div>
      ) : (
        "Verifing the email failed"
      )}
    </div>
  );
};

export default ConfirmEmail;
