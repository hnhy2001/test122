"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DragDropPhoto from "@/components/ui/drag-drop-photo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { postRequest } from "@/hook/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import DragDropVideo from "@/components/ui/drag-drop-video";

const AddVideos = () => {
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const openDialog = (type: string) => {
    setType(type);
    setIsOpen(true);
  };

  const handleVideo = () => {
    setLoading(true);
    postRequest("/user/company-update", {
      video: {
        title: title,
        description: description,
        path: images[0],
      },
    })
      .then(() => {
        toast({
          variant: "success",
          title: "Success",
          description: "Update Video",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "Update Video",
        });
      })
      .finally(() => {
        setLoading(false);
        handleCancel();
      });
  };
  const handleCancel = () => {
    setIsOpen(false);

    setTitle("");
    setDescription("");
    setImages([]);
  };
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Add Video {">"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[120px] font-normal text-black text-base">
            <DropdownMenuItem onClick={() => openDialog("video")}>
              <div>Add video</div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openDialog("link")}>
              <div>Add link</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DialogTrigger>
      <DialogContent className="min-w-[90%] md:min-w-[30%] !w-1/2 !max-w-[90%] md:max-w-[30%]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Photo</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label>Title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
          </div>
          {type === "video" ? (
            <div className="flex flex-col gap-2">
              <Label>Video *</Label>
              <DragDropVideo img={images} setImg={setImages} multiple={false} />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Label>Video URL *</Label>
              <Input
                value={images[0]}
                onChange={(e) => setImages([e.target.value])}
                placeholder="Paste URL to Youtube or Vimeo video"
              />
              <Label className="text-sm">
                If you already have a video on YouTube or Vimeo, you can paste
                the URL to the video here.
              </Label>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="border border-black"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </DialogClose>
          {loading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button variant="default" onClick={handleVideo}>
              Confirm
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddVideos;
