"use client";
import { useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import Image from "next/image";
import ListImage from "../ListImage";

// thêm props truyền vào cho component động hơn
const DragDropPhoto = ({ img, setImg, multiple }: any) => {
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const changeFile = (event: any) => {
    event.preventDefault();
    setImg([...event.target.files]);
  };
  const handleDragStart = (event: any) => {
    event.preventDefault();
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };
  const handleDrop = (event: any) => {
    event.preventDefault();
  };
  return (
    <div>
      <div
        className="border border-dashed border-primary flex justify-center items-center py-[24px] text-black"
        onDrag={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!img ? (
          <div className="flex flex-col justify-center items-center gap-[8px]">
            <input
              type="file"
              onChange={(event: any) => changeFile(event)}
              hidden
              multiple={multiple}
              ref={uploadFileRef}
            />
            <div
              className="text-[20px] leading-[24px] hover:underline cursor-pointer"
              onClick={() => uploadFileRef?.current?.click()}
            >
              Add Cover photos
            </div>
            <div className="text-[#939AA1] text-[20px]">
              or drop image file to upload
            </div>
          </div>
        ) : (
          <div className="px-4">
            <ListImage
              images={img.map((image: any) => URL.createObjectURL(image))}
            />{" "}
            {/* <Carousel>
              <CarouselContent>
                {img.map((image: any, index: any) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/1 lg:basis-1/2 xl:basis-1/3"
                  >
                    <Image
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt="sdf"
                      width={44}
                      height={44}
                      className="w-full h-full aspect-square object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious src="/arrowleft.png" />
              <CarouselNext src="/arrowright.png" />
            </Carousel> */}
          </div>
        )}
      </div>
    </div>
  );
};
export default DragDropPhoto;
