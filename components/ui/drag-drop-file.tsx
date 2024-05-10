"use client";
import { postRequestWithFormData, postRequest } from "@/hook/apiClient";
import Image from "next/image";
import { useRef, useState } from "react";
import { useToast } from "./use-toast";


function isImageUrl(url: any) {
  let validExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];

  let extension = url.split('.').pop().toLowerCase();
  return validExtensions.includes(extension);
}


const DragDropFile = ({ type, fileName }: any) => {
  const { toast } = useToast();
  const [file, setFile] = useState(null) as any;
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const handleDragStart = (event: any) => {
    event.preventDefault();
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
    handleUpload(event.dataTransfer.files[0]);
  };
  const uploadByBussiness = (name: any) => {
    const payload = {
      bussiness_registion: name
    };
    postRequest('/user/company/bussiness-registion', payload)
      .then((res: any) => {
        if (res.code === 200) {
          toast({
            variant: "success",
            title: "Success",
            description: "Upload file successfully",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Fail",
            description: "Somethings went wrong",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "Somethings went wrong",
        });
      });
  };
  const uploadByNameCard = (name: any) => {
    const payload = {
      name_card: name,
    };
    postRequest("/user/company/name-card", payload)
      .then((res: any) => {
        if (res.code === 200) {
          toast({
            variant: "success",
            title: "Success",
            description: "Upload file successfully",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Fail",
            description: "Somethings went wrong",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "Somethings went wrong",
        });
      });
  };
  const handleUpload = (files: any) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("type", "image");
    postRequestWithFormData("/file/upload-file", formData)
      .then((res: any) => {
        if (res.code === 200) {
          switch (type) {
            case "name-card":
              uploadByNameCard(res.data.file_name);
              break;
            case "bussiness":
              uploadByBussiness(res.data.file_name);
              break;
            default:
              break;
          }
        } else {
          toast({
            variant: "destructive",
            title: "Fail",
            description: "Somethings went wrong",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "Somethings went wrong",
        });
      });
  };
  const changeFile = (event: any) => {
    event.preventDefault();
    setFile(event.target.files[0]);
    handleUpload(event.target.files[0]);
  };
  return (
    <div
      className="border border-dashed border-primary flex justify-center items-center py-[24px] text-black"
      onDrag={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {!file ? (
        <div className="flex flex-col justify-center items-center gap-[8px]">
          {fileName ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <input
                type="file"
                onChange={(event: any) => changeFile(event)}
                hidden
                ref={uploadFileRef}
              />
              {
                isImageUrl(fileName) ?
                  <Image src={fileName} alt="image" width={300} height={200} className="w-full aspect-video h-auto object-cover" />
                  :
                  <div className="text-center text-xl">{fileName}</div>
              }
              <div
                className="text-xl hover:underline cursor-pointer"
                onClick={() => uploadFileRef?.current?.click()}
              >
                Click here
              </div>
              <div className="text-[#939AA1] text-xl">
                or drop files or photos to change upload
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src={"/images/company-verification/link-file.svg"}
                width={33}
                height={32}
                alt=""
              ></Image>
              <input
                type="file"
                onChange={(event: any) => changeFile(event)}
                hidden
                ref={uploadFileRef}
              />
              <div
                className="text-xl hover:underline cursor-pointer"
                onClick={() => uploadFileRef?.current?.click()}
              >
                Add files or photos
              </div>
              <div className="text-[#939AA1] text-xl">
                or drop files or photos upload
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <input
            type="file"
            onChange={(event: any) => changeFile(event)}
            hidden
            ref={uploadFileRef}
          />
          {
            isImageUrl(file.name) ?
              <Image src={URL.createObjectURL(file)} alt="image" width={300} height={200} className="w-full aspect-video h-auto object-cover" />
              :
              <div className="text-center text-xl">{file.name}</div>
          }
          <div
            className="text-xl hover:underline cursor-pointer"
            onClick={() => uploadFileRef?.current?.click()}
          >
            Click here
          </div>
          <div className="text-[#939AA1] text-xl">
            or drop files or photos to change upload
          </div>
        </div>
      )}
    </div>
  );
};
export default DragDropFile;
