"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getRequest, postRequest } from "@/hook/apiClient";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
const FormSchema = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Please type your email!")
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
    forgotPassword()
  };
  const forgotPassword = () => {
    const email = form.getValues("email");
    setIsLoading(true);
    getRequest(`/auth/forgot-pass?email=${email}`)
      .then((res: any) => {
        if (!res.error) {
          toast({
            title: "Successfully",
            description: "New Password was sent to your email! Please check your email and Sign In again",
            variant: 'success'
          });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong!",
            variant: "destructive",
          });
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="relative h-screen"
      >
        <div className="p-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border absolute">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="text-3xl font-bold">Reset Password</div>
              <div className="text-base">
                Enter the email address that you would like to reset the
                password.
              </div>
            </div>
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel className="text-primary text-2xl mb-2 font-bold">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="border-black text-black border-[1px] h-20 text-2xl"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <Button
              type="submit"
              className="bg-primary text-white rounded-[6px] w-full font-700 text-2xl h-[68px] flex justify-center items-center"
            >
              {isLoading ? (
                <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-4 border-t-blue-600"></div>
              ) : (
                "Send Instruction"
              )}
            </Button>
            <button>
              Go back to{" "}
              <Link className="font-bold" href={"/api/auth/signin"}>
                Sign In
              </Link>
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default FormSchema;
