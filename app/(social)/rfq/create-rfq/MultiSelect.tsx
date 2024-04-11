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
      <Select placeholder={props.placeholder} options={props.options} isMulti onChange={handleChange} className="!border !border-black !rounded-lg"/>
    </div>
  );
};

export default MultiSelect;
