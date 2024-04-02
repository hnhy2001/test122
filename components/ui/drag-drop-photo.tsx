'use client'
import { useRef, useState } from "react";

// thêm props truyền vào cho component động hơn
const DragDropPhoto = () => {
  const [file, setFile] = useState(null) as any;
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const changeFile = (event: any) => {
    event.preventDefault();
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
        {!file ? (
          <div className="flex flex-col justify-center items-center gap-[8px]">
            <input
              type="file"
              onChange={(event: any) => changeFile(event)}
              hidden
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
          <div>{file.name}</div>
        )}
      </div>
    </div>
  );
}
export default DragDropPhoto