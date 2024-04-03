"use client";
import { useState } from "react";
import AddProduct from "../add-product";
import Image from "next/image";
import NewCertificate from "./new-certificate";

const CertificateTab = () => {
  return (
    <div className="py-8 grid grid-cols-2 gap-12 relative">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-primary">Certifications</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-4 col-span-2">
            <div className="text-xs text-[#8C8585]">
              List out all the products that your business has to offer. This
              will help your potential buyers know what they could expect of
              your business.
            </div>
            <div className="text-lg text-[#8C8585]">
              There are no certifications to be shown yet.
            </div>
          </div>
          <div className="flex justify-end items-end">
            <NewCertificate/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CertificateTab;
