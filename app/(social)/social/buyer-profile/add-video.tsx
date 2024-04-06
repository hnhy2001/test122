'use client'
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

const AddVideos = () => {
  const [type, setType] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const openDialog = (type: string) => {
    setType(type)
    setIsOpen(true)
  }
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              Add Video {">"}
            </Button>
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
      <DialogContent className="!min-w-1/2 !w-1/2 !max-w-[50%]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Photo</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label>Title *</Label>
            <Input placeholder="Enter title" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea placeholder="Enter Description" />
          </div>
          {type === "video" ? (
            <div className="flex flex-col gap-2">
              <Label>Video *</Label>
              <DragDropPhoto />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Label>Video URL *</Label>
              <Input placeholder="Paste URL to Youtube or Vimeo video" />
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
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button variant="default">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddVideos;
