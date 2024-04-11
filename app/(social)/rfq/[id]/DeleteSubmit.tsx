"use client";
import ConfirmDelete from "@/components/ConfirmDelete";
import { getRequest } from "@/hook/apiClient";
import React from "react";

const DeleteSubmit = ({ rfqcode, code }: any) => {
  const handleDelte = async () => {
    await getRequest("/rfq/delete-quote/" + rfqcode + "/" + code);
  };
  return (
    <ConfirmDelete onSubmit={handleDelte} />
  );
};

export default DeleteSubmit;
