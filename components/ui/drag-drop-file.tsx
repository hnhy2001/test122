"use client";
import { postRequestWithFormData, postRequest } from "@/hook/apiClient";
import Image from "next/image";
import { useRef, useState } from "react";
import { useToast } from "./use-toast";

const DragDropFile = ({type}: any) => {
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
            title: "Success",
            description: "Upload file successfully",
          });
        } else {
          toast({
            title: "Fail",
            description: "Somethings went wrong",
          });
        }
      })
      .catch(() => {
        toast({
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
            title: "Success",
            description: "Upload file successfully",
          });
        } else {
          toast({
            title: "Fail",
            description: "Somethings went wrong",
          });
        }
      })
      .catch(() => {
        toast({
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
            title: "Fail",
            description: "Somethings went wrong",
          });
        }
      })
      .catch(() => {
        toast({
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
            className="text-[20px] leading-[24px] hover:underline cursor-pointer"
            onClick={() => uploadFileRef?.current?.click()}
          >
            Add files or photos
          </div>
          <div className="text-[#939AA1] text-[20px]">
            or drop files or photos upload
          </div>
        </div>
      ) : (
        <div>{file.name}</div>
      )}
    </div>
  );
};
export default DragDropFile;
