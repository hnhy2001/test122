import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";
import { getRequest } from "@/hook/api";
import { getAllLevelThreeItems } from "@/heppler";

const CategoryItems = async () => {
  let search: any = [];
  // getRequest("/product/list-category-by-level").then((data: any) =>
  //   setCategoryies(getAllLevelThreeItems(data.data))
  // );
  let data = (await getRequest("/product/list-category-by-level")).data;
  data = getAllLevelThreeItems(data)
  search = data.map((element: any) => ({
    name: element.name,
    href: "?category=" + element.code,
  }));
  return (
    <div className="flex gap-3 py-2">
      <Carousel className="w-full">
        <CarouselContent>
          {search.map((d: any, index: any) => (
            <CarouselItem key={index} className={`basis-1/10`}>
              <div className="p-1">
                <Link
                  key={index}
                  href={d.href}
                  className="py-2 w-full hover:bg-gray-100 cursor-pointer text-base"
                >
                  {d.name}
                </Link>
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
