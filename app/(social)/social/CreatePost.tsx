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
import PostSocial from "./PostSocial";
import { getSession } from "next-auth/react";

const CreatePost = ({ user }: any) => {
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [open_, setOpen_] = useState(false);

  const { toast } = useToast();
  const route = useRouter();
  const ref: any = useRef();
  const [posts, setPosts] = useState<any>([]);
  const handleUploadAvatar = (e: any) => {
    e.preventDefault();
    setImages([...e.target.files]);
    const newTypes = Array.from(e.target.files).map(
      (file: any) => file.type.split("/")[0]
    );
    setTypes([...newTypes]);
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
          // route.refresh();
          console.log(res);
          setPosts((prev: any) => [res.post, ...prev]);
          setImages([]);
          if (ref && ref.current) ref.current.value = "";
          toast({
            title: "Success",
            description: "Create Post Successfully",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Fail",
            description: "Please fill in all required fields.",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "Please fill in all required fields.",
        });
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };
  return (
    <div className="flex flex-col gap-4">
      <Dialog open={open_} onOpenChange={setOpen_}>
        <DialogContent className="!max-w-[80%] md:!max-w-[30%] p-0">
          <div className="flex gap-4 items-center p-4">
            <Image
              src={"/alert.png"}
              alt="alert"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
            <div>
              <p>You need to switch to supplier</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex gap-2 w-full bg-white p-4 rounded-lg shadow-lg">
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
        <Dialog open={open} onOpenChange={setOpen}>
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
                <div className="flex gap-3 items-center text-[#515151] cursor-pointer">
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
                <div className="flex gap-3 items-center text-[#515151] cursor-pointer">
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

              <div
                className="flex gap-3 items-center text-[#515151] cursor-pointer"
                onClick={() => {
                  getSession().then((session) => {
                    let user = session?.user;
                    if (user.role == "SELLER") {
                      route.push("/rfq/create-rfq");
                    } else {
                      setOpen_(true);
                    }
                  });
                }}
              >
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
          <DialogContent className="!max-w-[80%] md:!max-w-[40%] p-0">
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
                    types={types}
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
                <div className="flex gap-4 justify-end py-4 cursor-pointer">
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
                    accept="image/*, video/*"
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
                <Button disabled>
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
      {posts.length > 0 && (
        <div className="flex flex-col gap-4">
          {posts.map((post: any) => (
            <PostSocial key={post.code} dt={post} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatePost;
