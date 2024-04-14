"use client";
import ConfirmDelete from "@/components/ConfirmDelete";
import { getRequest } from "@/hook/apiClient";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteRFQ = ({ code }: any) => {
  const handleDelte = async () => {
    await getRequest("/rfq/delete/" + code);
  };
  return <ConfirmDelete onSubmit={handleDelte} rfq={true} />;
};

export default DeleteRFQ;
