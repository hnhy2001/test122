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
import { zodResolver } from "@hookform/resolvers/zod";
import { title } from "process";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const WhyUs = () => {
  const formSchema = z.object({
    title: z.string(),
    content: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const payload = {
        
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add</Button>
      </DialogTrigger>
      <DialogContent className="!min-w-1/3 !w-1/3 !max-w-[50%]">
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
                      <Textarea placeholder="Content" className="h-28 text-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
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
              <Button variant="default" type="submit">Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WhyUs;
