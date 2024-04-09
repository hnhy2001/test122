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
      <Select options={props.options} isMulti onChange={handleChange} />
    </div>
  );
};

export default MultiSelect;
