"use client"
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { Code } from "lucide-react";

const MultiSelect = (props: any) => {
  const handleChange = (data: any) => {
    props.onChange(data);
  };
  return (
    <div>
      <Select placeholder={props.placeholder} options={props.options} isMulti onChange={handleChange} className="border-[#939AA1] border text-[#000000] !text-xl !font-sans !rounded-lg"/>
    </div>
  );
};

export default MultiSelect;
