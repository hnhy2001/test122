"use client";
import ConfirmDelete from "@/components/ConfirmDelete";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DragDropPhoto from "@/components/ui/drag-drop-photo";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { postRequest } from "@/hook/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { title } from "process";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const DeleteWhyUs = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  const { toast } = useToast();
  const deleteWhyUs = () => {
    let arr: any = props.whyUs;
    arr.splice(props.index, 1);
    console.log(arr);
    const payload = {
      why_us: arr,
    };
    setLoading(true);
    postRequest("/user/company-update", payload)
      .then((res: any) => {
        props.setWhyUs(arr);
        toast({
          variant: "success",
          title: "Success",
          description: "Delete Why us success",
        });
        setOpen(false);
        setLoading(false);
        props.setReload((prev: any) => !prev);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: JSON.stringify(err),
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Image
          src="/trash.png"
          width={24}
          height={24}
          alt="delete"
          className="w-6 h-6 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex gap-4 items-center p-4">
          <Image
            src={"/alert.png"}
            alt="alert"
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
          />
          <div>
            <p>Do you want to delete it?</p>
            <div className="flex gap-3 pt-4">
              <Button onClick={() => setOpen(false)} variant={"outline"}>
                Cancel
              </Button>
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={() => deleteWhyUs()}>Confirm</Button>
              )}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteWhyUs;
