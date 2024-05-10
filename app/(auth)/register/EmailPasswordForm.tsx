"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";

const EmailPasswordForm = (props: any) => {
  const formSchema = z
    .object({
      emailAddress: z.string().min(1, { message: "Required" }),
      password: z.string().min(1, { message: "Required" }),
    })
    .refine(
      (data: any) => {
        const regex = /.+@.+\..+/;
        return regex.test(data.emailAddress);
      },
      {
        message: "Invalid email",
        path: ["emailAddress"],
      }
    )
    .refine(
      (data: any) => {
        return data.password.length >=6 && data.password.length <= 20;
      },
      {
        message: "Password must be from 6 to 20 characters",
        path: ["password"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // console.log(values)
    props.updateParentData(values);
    props?.setTab("companyInformation");
    props?.updateEmail(values.emailAddress);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col items-center w-[85%] gap-12">
          <div className="flex flex-col gap-2 w-full items-center">
            <span className="text-[2.5rem] font-black text-[#081342] text-center">
              To get started, add your work email
            </span>
            <div className=" text-[1.25rem] px-16 w-full text-center text-[#081342]">
              <span className="hidden xs:inline text-[1.25rem]">
                Built for trust, our platform allows verified businesses to get
                exclusive access to advanced Tridge features and benefits.
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4 w-[85%]">
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-xl font-bold text-[#081342]">
                        Work email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="border !h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl !bg-white"
                        />
                      </FormControl>
                      <FormMessage className="text-lg" />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex flex-col gap-4 w-[85%]">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-xl font-bold text-[#081342]">
                        Password <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          className="border !h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl"
                        />
                      </FormControl>
                      <FormMessage className="text-lg" />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex w-3/4 justify-start">
              <span className="text-lg text-[#081342]">
                By signing up, you agree to our{" "}
                <Link href="/" className="font-bold underline text-[#081342]">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/" className="font-bold underline text-[#081342]">
                  Privacy Policy
                </Link>
                .
              </span>
            </div>
          </div>
          {/* <TabsList className="!p-0 !m-0 !w-full bg-white border-0">
            <TabsTrigger value="companyInformation" className="!w-full !p-0"> */}
          <Button
            type="submit"
            className="w-[85%] flex justify-center !h-[4.5rem] text-xl text-[#FFFFFF]"
          >
            Create an account
          </Button>
          {/* </TabsTrigger>
          </TabsList> */}
          <div className="flex justify-center gap-2 text-[#081342]">
            <span className="text-lg">Already have account?</span>{" "}
            <Link
              href={"/signin"}
              className="text-xl font-bold underline !h-18 text-[#081342]"
            >
              Sign in now!
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EmailPasswordForm;
