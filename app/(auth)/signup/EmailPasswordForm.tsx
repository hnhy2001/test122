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

const EmailPasswordForm = () => {
  const formSchema = z.object({
    emailAddress: z.string().email(),
    passWord: z.string().min(6).max(16),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      passWord: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col items-center w-3/4 gap-12">
          <div className="flex flex-col gap-2 w-full items-center">
            <span className="text-4xl font-black">
              To get started, add your work email
            </span>
            <div className="px-16 w-full text-center">
              <span className="text-lg">
                Built for trust, our platform allows verified businesses to get
                exclusive access to advanced Tridge features and benefits.
              </span>
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4 w-3/4">
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-xl font-bold">
                        Work email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email address"
                          type="email"
                          {...field}
                          className="border-black border h-16"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex flex-col gap-4 w-3/4">
              <FormField
                control={form.control}
                name="passWord"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-xl font-bold">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                          className="border-black border h-16"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex">
              <span className="text-lg">
                By signing up, you agree to our{" "}
                <Link href="/" className="font-bold underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/" className="font-bold underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </div>
          </div>
          {/* <TabsList className="!p-0 !m-0 !w-full bg-white border-0">
                <TabsTrigger value="profileInformation" className="!w-full !p-0"> */}
          <Button type="submit" className="w-3/4 flex justify-center !h-16 text-xl">
            Create an account
          </Button >
          {/* </TabsTrigger>
              </TabsList> */}
          <div className="flex justify-center gap-2">
            <span className="text-lg">Already have account?</span>{" "}
            <Link href={"/"} className="text-xl font-bold">
              Sign in now!
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EmailPasswordForm;
