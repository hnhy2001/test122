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

const CategoryItems = async () => {
  let search: any = [];
  let data = (await getRequest("/product/list-category")).data;
  search = data.map((element: any) => ({
    name: element.name,
    href: "?category=" + element.code,
  }));
  return (
    <div className="flex gap-3 py-2">
      <Carousel className="w-full">
        <CarouselContent>
          <CarouselItem className={`basis-1/10`}>
            <div className="p-1">
              <Link
                href={"?category="}
                className="p-2 w-full hover:bg-gray-100 cursor-pointer text-lg"
              >
                All
              </Link>
            </div>
          </CarouselItem>
          {search.map((d: any, index: any) => (
            <CarouselItem key={index} className={`basis-1/10`}>
              <div className="p-1">
                <Link
                  key={index}
                  href={d.href}
                  className="p-2 w-full hover:bg-gray-100 cursor-pointer text-lg"
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
