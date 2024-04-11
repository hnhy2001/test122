import Image from "next/image";
import React from "react";

export const isVideoUrl = (url: string) => {
  const extension = url.split(".").pop()?.toLowerCase(); // Lấy phần mở rộng của URL và chuyển sang chữ thường
  return extension === "mp4" || extension === "webm";
};
export const RenderImageVdieo = ({ url, isVideo }: any) => {
  return isVideo ? (
    <video
      width="600"
      height="300"
      controls
      playsInline
      className="w-full aspect-square object-cover"
    >
      <source src={url} type="video/mp4" />
      <track src={url} kind="subtitles" srcLang="en" label="English" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <Image
      unoptimized
      key={url}
      src={url}
      alt={"image"}
      width={600}
      height={300}
      className="w-full h-full aspect-square object-cover"
    />
  );
};

const ListImage = ({ images, types }: any) => {
  return (
    <div>
      {images.length == 1 ? (
        <div className="flex flex-col gap-1">
          {images.map((img: any, index: any) => (
            <RenderImageVdieo
              key={index}
              url={img}
              isVideo={types ? types[index] == "video" : isVideoUrl(img)}
            />
          ))}
        </div>
      ) : images.length == 2 ? (
        <div className="grid grid-cols-2 gap-3">
          {images.map((img: any, index: any) => (
            <RenderImageVdieo
              key={index}
              url={img}
              isVideo={types ? types[index] == "video" : isVideoUrl(img)}
            />
          ))}
        </div>
      ) : (
        images.length >= 3 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <RenderImageVdieo
                url={images[0]}
                isVideo={types ? types[0] == "video" : isVideoUrl(images[0])}
              />
            </div>
            <div className="flex flex-col gap-3">
              <RenderImageVdieo
                url={images[1]}
                isVideo={types ? types[1] == "video" : isVideoUrl(images[1])}
              />
              <div className="relative">
                <RenderImageVdieo
                  url={images[2]}
                  isVideo={types ? types[2] == "video" : isVideoUrl(images[2])}
                />
                {images.length - 3 > 0 && (
                  <div className="absolute top-0 text-slate-600 bg-slate-400 w-full h-full opacity-85  text-5xl flex justify-center items-center text-center">
                    {"+" + (images.length - 3)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ListImage;
