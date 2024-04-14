"use client";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getRequest } from "@/hook/apiClient";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SearchHome = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  // const [category, setCategory] = useState<any[]>([]);
  // const [keyword, setKeyword] = useState("");
  // const route = useRouter();
  useEffect(() => {
    getRequest("/product/list-category").then((data) => {
      let search: any = [];
      data?.data.forEach((element: any) => {
        search.push({
          name: element.name,
          href: "/search?category=" + element.code,
        });
      });
      console.log(search);
      // setCategory(search);
      setData(search);
    });
  }, []);

  const toggleCommandList = () => {
    setIsOpen(true);
  };
  const handleClickOutside = (event: any) => {
    if (event.target.closest(".command-container")) return;
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <Command className="command-container bg-transparent w-[90%] mx-auto">
      <CommandInput
        onClick={toggleCommandList}
        onKeyDown={(e) => {
          // if (e.key === "Enter") route.push("/search?keyword=" + keyword);
        }}
        placeholder="Tìm sản phẩm thực phẩm & nông nghiệp"
      />
      <CommandList>
        <CommandItem>
          <span>Calendar</span>
        </CommandItem>
      </CommandList>
    </Command>
  );
};

export default SearchHome;
