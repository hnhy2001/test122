'use client'
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { getRequest } from "@/hook/apiClient";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import Loading from "./Loading";

const CategoryItems = () => {
  const route = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('category') || ''
  const [category, setCategory] = useState<any>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getRequest("/product/list-category")
      .then((data: any) => {
        const search = data?.data.map((element: any) => ({
          name: element.name,
          href: "?category=" + element.code,
          code: element.code
        }))
        setCategory([{ name: "All", href: "?category=", code: "" }, ...search])
      })
  }, [])
  useEffect(() => {
    setLoading(false)
  }, [search, setLoading])

  return (
    <div className="flex gap-3 py-2">
      {
        loading && <div className="fixed h-screen w-screen opacity-50 bg-slate-400 z-40 top-0 right-0"><Loading /></div>
      }
      <Carousel className="w-full">
        <CarouselContent>
          {category.map((d: any, index: any) => (
            <CarouselItem key={index} className={`basis-1/10`}>
              <div className="p-1">
                <div
                  key={index}
                  className={`p-2 w-full hover:bg-gray-100 cursor-pointer text-lg ${search == d.code && "bg-gray-100"}`}
                  onClick={() => {
                    setLoading(true)
                    route.push(d.href)
                  }}
                >
                  {d.name}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious src="/arrowleft.png" />
        <CarouselNext src="/arrowright.png" />
      </Carousel>
    </div>
  );
};

export default CategoryItems;
