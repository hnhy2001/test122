import React, { useRef } from "react";
import ListImage from "../ListImage";

const DragDropPhoto = React.memo(({ img, setImg, multiple }: any) => {
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    if (files) {
      const fileList = Array.from(files);
      setImg([...fileList]);
    }
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setImg([...fileList]);
    }
  };

  const handleFileInputClick = () => {
    const fileInput =
      dropAreaRef.current?.querySelector<HTMLInputElement>(
        'input[type="file"]'
      );
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div>
      <div
        className="border border-dashed border-primary flex justify-center items-center py-[24px] text-black"
        ref={dropAreaRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!img ? (
          <div className="flex flex-col justify-center items-center gap-[8px]">
            <input
              type="file"
              onChange={handleChangeFile}
              hidden
              multiple={multiple}
            />
            <div
              className="text-[20px] leading-[24px] hover:underline cursor-pointer"
              onClick={handleFileInputClick}
            >
              Add Cover photos
            </div>
            <div className="text-[#939AA1] text-[20px]">
              or drop image file to upload
            </div>
          </div>
        ) : (
          <div className="w-1/2">
            <input
              type="file"
              onChange={handleChangeFile}
              hidden
              multiple={multiple}
            />
            <ListImage
              images={img.map((image: any) =>
                typeof image === "string" ? image : URL.createObjectURL(image)
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
});

DragDropPhoto.displayName = 'DragDropPhoto';

export default DragDropPhoto;