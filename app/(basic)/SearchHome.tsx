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
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getRequest } from "@/hook/apiClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";


const SearchHome = () => {
  const [category, setCategory] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState<any>();
  const [input, setInput] = useState<any>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<any>(false);
  const fetchData = () => {
    getRequest(`/product/list-category-level-3?keyword=${input}&page=${page}&limit=15`)
      .then(data => {
        let search: any = [];
        data?.data.forEach((element: any) => {
          search.push({
            name: element.name,
            href: "/search-home?category=" + element.code,
            avatar: element.avatar
          });
        });
        setPage(prev => prev + 1)
        setCategory((prev) => [...prev, ...search]);
        setLoading(false)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollHeight - scrollTop - clientHeight < 100) {
          if (!loading) {
            if (total) {
              if (category.length < total) {
                setLoading(true)
              }
            }
            else {
              setLoading(true)
            }
          }
        }
      }
    };

    const containerElement = containerRef.current;
    containerElement?.addEventListener('scroll', handleScroll);

    return () => {
      containerElement?.removeEventListener('scroll', handleScroll);
    };
  }, [loading, total, category, containerRef]);
  useEffect(() => {
    if (loading) {
      fetchData()
    }
  }, [loading])
  useEffect(() => {
    if (open) {
      setLoading(true)
      getRequest(`/product/list-category-level-3?keyword=&page=1&limit=15`)
        .then(data => {
          setTotal(() => data?.total_records);
          setCategory(prevData => {
            const newData: any = [];
            data?.data.forEach((element: any) => {
              newData.push({
                name: element.name,
                href: "/search-home?category=" + element.code,
                avatar: element.avatar
              });
            });
            setLoading(false)
            return [...prevData, ...newData];
          });
        })
        .catch(err => console.log(err))
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full">
        <DialogTrigger className="w-full">
          <Command className="command-container bg-transparent w-[90%] mx-auto z-10">
            <CommandInput
              placeholder="Find food and agricultural products"
              id="as"
            />
            <CommandList className="absolute top-20 z-22">
              <CommandItem className="bg-white z-22"></CommandItem>
            </CommandList>
          </Command>
        </DialogTrigger>
      </div>
      <DialogContent className="!max-w-[80%] md:!max-w-[40%] h-[60%] flex flex-col">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") route.push("/search-home?keyword=" + keyword);
          }}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Type keyword then hit enter to search keyword"
        />
        <Input
          placeholder="Type keyword then hit enter to search category"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPage(2);
              setCategory([])
              setLoading(true);
              getRequest(
                `/product/list-category-level-3?keyword=${input}&page=1&limit=15`
              ).then((data: any) => {
                setCategory(prevData => {
                  const newData: any = [];
                  data?.data.forEach((element: any) => {
                    newData.push({
                      name: element.name,
                      href: "/search-home?category=" + element.code,
                      avatar: element.avatar
                    });
                  });
                  setLoading(false)
                  return [...prevData, ...newData];
                });
                setTotal(() => data?.total_records);
              });
            }
          }}
        />
        <div className="flex flex-col h-full overflow-auto flex-1" ref={containerRef}>
          {category.map((d: any, index: any) => (
            <Link href={d.href} key={index} className="flex items-center gap-3 hover:bg-gray-100 cursor-pointer w-full px-1">
              <Image src={d.avatar} alt="image" width={24} height={24} className="h-6 w-6" />
              <div

                className="px-3 py-2 "
              >
                {d.name}
              </div>
            </Link>
          ))}
          {loading && (
            <div className="flex flex-col gap-3 w-full">
              <Skeleton className="h-5 w-full px-3 py-2" />
              <Skeleton className="h-5 w-full px-3 py-2" />
              <Skeleton className="h-5 w-full px-3 py-2" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchHome;
