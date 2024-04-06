"use client";
import ListImage from "@/components/ListImage";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { postRequestWithFormData } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const CreatePost = ({ user }: any) => {
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const route = useRouter();
  const ref: any = useRef();
  const handleUploadAvatar = (e: any) => {
    e.preventDefault();
    setImages([...e.target.files]);
  };

  const createPost = () => {
    setLoading(true);
    const formData = new FormData();
    images.forEach((image: any, index: any) => {
      formData.append(`galleries[${index}]`, image);
    });
    formData.append("content", ref?.current?.value);
    formData.append("user_role", user.role);
    postRequestWithFormData("/post/create", formData)
      .then((res: any) => {
        if (res) {
          route.refresh();
          setImages([]);
          if (ref && ref.current) ref.current.value = "";
          toast({
            title: "Success",
            description: "Change Avatar Successfully",
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
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="flex gap-2 w-full">
      {user && (
        <Image
          unoptimized
          src={user?.avatar}
          alt={user.last_name}
          width={45}
          height={45}
          className="h-11 w-11 rounded-full object-cover"
        />
      )}
      <Dialog>
        <div className="w-full">
          <DialogTrigger asChild>
            <div>
              <Input
                className="w-full rounded-2xl bg-[#E7D8D8]"
                placeholder={user?.last_name + ", create a post"}
              />
            </div>
          </DialogTrigger>

          <div className="flex justify-around py-4">
            <DialogTrigger asChild>
              <div className="flex gap-3 items-center text-[#515151]">
                <Image
                  src={"/img.png"}
                  alt="imgIcon"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                Photo
              </div>
            </DialogTrigger>
            <DialogTrigger asChild>
              <div className="flex gap-3 items-center text-[#515151]">
                <Image
                  src={"/videocam.png"}
                  alt="videocam"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                Video
              </div>
            </DialogTrigger>

            <div className="flex gap-3 items-center text-[#515151]">
              <Image
                src={"/text_snippet.png"}
                alt="text_snipper"
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
              RFQ
            </div>
          </div>
        </div>
        <DialogContent className="!max-w-[80%] md:!max-w-[60%] p-0">
          <div className="p-6 flex flex-col gap-4">
            <p className="text-xl font-bold text-[#081342] text-center">
              Create new post
            </p>
            <div className="flex gap-3">
              <Image
                src={user?.avatar}
                alt={user?.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full"
              />
              <p>{user?.last_name}</p>
            </div>
            <Textarea
              ref={ref}
              placeholder={user?.last_name + ", create a post"}
            ></Textarea>
            <div className="flex w-full justify-center">
              <div className="w-2/5">
                <ListImage
                  images={images.map((image: any) =>
                    URL.createObjectURL(image)
                  )}
                />
              </div>
              {/* <Carousel>
                <CarouselContent>
                  {images.map((image: any, index: any) => (
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
            <div>
              <div className="flex gap-4 justify-end py-4">
                <p>Add into your post</p>
                <div
                  className="flex gap-3 items-center text-[#515151]"
                  onClick={() => uploadFileRef?.current?.click()}
                >
                  <Image
                    src={"/img.png"}
                    alt="imgIcon"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                  Photo
                </div>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  ref={uploadFileRef}
                  onChange={(event: any) => handleUploadAvatar(event)}
                ></input>
                <div className="flex gap-3 items-center text-[#515151]">
                  <Image
                    src={"/videocam.png"}
                    alt="videocam"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                  />
                  Video
                </div>
              </div>
            </div>
            {loading ? (
              <Button disabled size={"lg"}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button onClick={() => createPost()}>Post</Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
