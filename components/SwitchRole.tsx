"use client";
import { postRequest } from "@/hook/apiClient";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

const SwitchRole = (props: any) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [info, setInfo] = useState(props.user);
  const { update } = useSession();
  const switchRole = async () => {
    const payload = { role: "" };
    setBtnLoading(true);
    if (info.role && info.role == "SELLER") {
      payload.role = "BUYER";
    } else {
      payload.role = "SELLER";
    }
    postRequest("/user/switch-role", payload).then((data: any) => {
      if (data.code == 200) {
        update({ role: payload.role });
        if (props?.setIsBuyer) {
          props.setIsBuyer(payload.role == "BUYER");
        }
        setBtnLoading(false);
        return setInfo(data.data);
      }
    });
  };
  return (
    <div className="flex w-64 justify-between items-center">
      <div>
        {btnLoading ? (
          <Button disabled className="!px-7 !py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            load
          </Button>
        ) : (
          <Button className="!px-7 !py-2" onClick={switchRole}>
            {info.role}
          </Button>
        )}
      </div>
      <Image
        src="/connection.png"
        alt="connection"
        width={24}
        height={24}
      ></Image>
      <span className="text-sm">Switch role</span>
    </div>
  );
};

export default SwitchRole;
