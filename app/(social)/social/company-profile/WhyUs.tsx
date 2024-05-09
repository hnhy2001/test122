﻿"use client";
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

const WhyUs = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const formSchema = z.object({
    title: z.string().min(1, "Required"),
    content: z.string().min(1, "Required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    let arr: any = props.whyUs;
    const whyUs = {
      title: values.title,
      content: values.content,
    };
    arr.push(whyUs);
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
          description: "Update New Why us success",
        });
        setLoading(false);
        setOpen(false);
        props.setReload((prev: any) => !prev);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: JSON.stringify(err),
        });
      })
      .finally(() => {
        form.reset()
        setLoading(false);
      });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[90%] lg:min-w-[30%] !w-1/3 !max-w-[90%] lg:max-w-[30%]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create Why us</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Title" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-bold text-lg">
                      Content <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Content"
                        className="h-28 text-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <DialogFooter className="sm:justify-end">
              <div className="flex gap-3 justify-end">
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
                  <Button variant="default" type="submit">
                    Confirm
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WhyUs;
