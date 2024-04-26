'use client'
import { useState, useRef } from "react";
import { postRequestWithFormData } from "@/hook/apiClient";

const DragDropVideo = ({ img, setImg, multiple }: any) => {
  const [loading, setLoading] = useState(false);
  const uploadFileRef = useRef<HTMLInputElement>(null);

  const changeFile = (event: any) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append(`file`, event.target.files[0]);

    postRequestWithFormData("/file/upload-file-2", formData)
      .then((data) => {
        setImg([data?.data.file_url]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const files = event.dataTransfer.files;
    formData.append(`file`, files[0]);

    postRequestWithFormData("/file/upload-file-2", formData)
      .then((data) => {
        setImg([data?.data.file_url]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div
        className="border border-dashed border-primary flex justify-center items-center py-[24px] text-black"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {img.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <input
              type="file"
              onChange={(event) => changeFile(event)}
              hidden
              multiple={multiple}
              ref={uploadFileRef}
            />
            {loading ? (
              <div className="text-[20px] leading-[24px] hover:underline cursor-pointer">
                Uploading...
              </div>
            ) : (
              <div
                className="text-[20px] leading-[24px] hover:underline cursor-pointer"
                onClick={() => uploadFileRef.current && uploadFileRef.current.click()}
              >
                Add Cover Videos
              </div>
            )}
            <div className="text-[#939AA1] text-[20px]">
              or drop video file to upload
            </div>
          </div>
        ) : (
          <div className="px-4 flex justify-center items-center">
            <video controls className="w-3/4 aspect-video">
              <source src={img[0]} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropVideo;
