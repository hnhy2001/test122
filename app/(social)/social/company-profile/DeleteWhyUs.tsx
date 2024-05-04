"use client";
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
    arr.splice(props.index,1);
    console.log(arr)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Delete</Button>
      </DialogTrigger>
      <DialogContent className="!min-w-1/3 !w-1/3 !max-w-[50%]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Delete Why us</DialogTitle>
        </DialogHeader>
        <span>Are you sure you want to delete?</span>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="border border-black"
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
            <Button variant="default" onClick={deleteWhyUs}>
              Confirm
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWhyUs;
