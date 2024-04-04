import Image from "next/image";
import React from "react";

const ListImage = ({ images }: any) => {
  return (
    <div>
      {images.length == 1 ? (
        <div className="flex flex-col gap-1">
          {images.map((img: any) => (
            <Image
              unoptimized
              key={img}
              src={img}
              alt={"image"}
              width={600}
              height={300}
              className="w-full aspect-square object-cover"
            />
          ))}
        </div>
      ) : images.length == 2 ? (
        <div className="grid grid-cols-2 gap-3">
          {images.map((img: any) => (
            <Image
              unoptimized
              key={img}
              src={img}
              alt={"image"}
              width={600}
              height={300}
              className="w-full aspect-square object-cover"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <Image
            unoptimized
            src={images[0]}
            alt={"image"}
            width={600}
            height={300}
            className="w-full aspect-square object-cover col-span-2"
          />
          <div className="flex flex-col gap-3">
            <Image
              unoptimized
              src={images[1]}
              alt={"image"}
              width={600}
              height={300}
              className="w-full aspect-square object-cover"
            />
            <div className="relative">
              <Image
                unoptimized
                src={images[2]}
                alt={"image"}
                width={600}
                height={300}
                className="w-full aspect-square object-cover"
              />
              {images.length - 3 > 0 && (
                <div className="absolute top-0 text-slate-600 bg-slate-400 w-full h-full opacity-85  text-5xl flex justify-center items-center text-center">
                  {"+" + (images.length - 3)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListImage;
