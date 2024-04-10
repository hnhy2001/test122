"use client";
import ConfirmDelete from "@/components/ConfirmDelete";
import { getRequest } from "@/hook/apiClient";
import React from "react";

const DeleteRFQ = ({ code }: any) => {
  const handleDelte = async() => {
    await getRequest("/rfq/delete/" + code)
  };
  return (
    <ConfirmDelete onSubmit={handleDelte} />

  );
};

export default DeleteRFQ;
