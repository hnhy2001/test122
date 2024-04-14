"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getRequest } from "@/hook/apiClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchHome = () => {
  const [category, setCategory] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const route = useRouter();
  useEffect(() => {
    getRequest("/product/list-category").then((data) => {
      let search: any = [];
      data?.data.forEach((element: any) => {
        search.push({
          name: element.name,
          href: "/search-home?category=" + element.code,
        });
      });
      setCategory(search);
    });
  }, []);

  return (
    <Dialog>
      <div className="w-full">
        <DialogTrigger className="w-full">
          <Command className="command-container bg-transparent w-[90%] mx-auto z-10">
            <CommandInput
              placeholder="Tìm sản phẩm thực phẩm & nông nghiệp"
              id="as"
            />
            <CommandList className="absolute top-20 z-22">
              <CommandItem className="bg-white z-22"></CommandItem>
            </CommandList>
          </Command>
        </DialogTrigger>
      </div>
      <DialogContent className="!max-w-[80%] md:!max-w-[40%] h-[60%]">
        <Command>
          <CommandInput
            onKeyDown={(e) => {
              if (e.key === "Enter") route.push("/search-home?keyword=" + keyword);
            }}
            onValueChange={(e) => setKeyword(e)}
            placeholder="Tìm sản phẩm thực phẩm & nông nghiệp"
          />

          <CommandList className="min-h-full">
            <CommandEmpty>Keydown Enter</CommandEmpty>
            <CommandGroup>
              {category.map((c, index) => (
                <CommandItem
                  key={index}
                  className="text-xl p-4 hover:bg-teal-50 cursor-pointer text-gray-600"
                  role="link"
                  onClickCapture={() => route.push(c.href)}
                >
                  <span>{c.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchHome;
