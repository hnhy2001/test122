"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { postRequest } from "@/hook/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { toast } = useToast();
  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "Please type your email",
      })
      .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
        message: "Invalid email",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };
  const changeEmail = (text: any) => {
    setEmail(text);
  };
  const verifyEmail = () => {
    postRequest("/user/company/verify", { email })
      .then((res: any) => {
        if (res.code == 200) {
          toast({
            variant: "success",
            title: "Success",
            description: res.message,
            duration: 2000,
          });
          setIsOpenModal(false);
          setEmail("");
        } else {
          toast({
            variant: "destructive",
            title: "Fail",
            description: res.message,
            duration: 2000,
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "Somethings went wrong",
          duration: 2000,
        });
      });
  };
  const closeModal = () => {
    setIsOpenModal(false);
    setEmail("");
  };
  return (
    <Dialog open={isOpenModal}>
      <DialogTrigger asChild>
        <button
          className="bg-primary text-white text-[20px] font-bold py-[10px] px-[28px] rounded-[8px]"
          onClick={() => setIsOpenModal(true)}
        >
          Verify my email
        </button>
      </DialogTrigger>
      <DialogContent className="!min-w-1/2 !w-1/2 !max-w-[50%]">
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}> */}
        <DialogHeader>
          <DialogTitle className="text-xl flex justify-between">
            <div>Change email for account verification</div>
            <div className="cursor-pointer" onClick={closeModal}>
              X
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="font-bold text-2xl text-[#4a4a4a] mb-4">
          Enter your new email
        </div>
        <Label>Work email</Label>
        <Input
          placeholder="Ex: jane.doe@tridge.com"
          type="text"
          className="border-black border h-16"
          value={email}
          onChange={(e) => changeEmail(e.target.value)}
        ></Input>
        <small className="text-xs">
          Note: If your work email is from a webmail domain, please submit
          business documents for verification.
        </small>
        {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Work email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: jane.doe@tridge.com"
                        type="text"
                        {...field}
                        className="border-black border h-16"
                      ></Input>
                      <small className="text-xs">
                        Note: If your work email is from a webmail domain,
                        please submit business documents for verification.
                      </small>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
        <DialogFooter>
          <Button type="submit" onClick={verifyEmail}>
            Continue
          </Button>
        </DialogFooter>
        {/* </form>
        </Form> */}
      </DialogContent>
    </Dialog>
  );
};
export default VerifyEmail;
