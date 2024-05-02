"use client";
import React, { useEffect, useState } from "react";
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
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
  SelectGroup,
} from "@/components/ui/select";
import { getRequest, postRequest } from "@/hook/apiClient";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { getSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
const FormSchema = (props: any) => {
  // const [data, setData] = useState<any>();
  const [country, setCountry] = useState<any>();
  const [lSave, setLsave] = useState<any>(false);
  useEffect(() => {
    (async () => {
      await Promise.all([
        getRequest("/config/countries").then((data) => setCountry(data)),
      ]);
      getRequest("/auth/user-profile").then((data) => {
        form.reset({
          firstName: data?.first_name,
          lastName: data?.last_name,
          emailAddress: data?.email,
          phoneNumber: data?.phone?.phone,
          nationCode: JSON.stringify({
            code: data?.phone?.code,
            name: data?.phone?.name,
          }),
          countryOfResidence: JSON.stringify(data?.country),
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }),
        props.loading(false);
    })();
  }, []);
  const formSchema = z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      emailAddress: z.string().email(),
      phoneNumber: z.string().min(10),
      nationCode: z.string(),
      countryOfResidence: z.string(),
      oldPassword: z.string(),
      newPassword: z.string(),
      confirmPassword: z.string(),
    })
    .refine(
      (data: any) => {
        return data.newPassword === data.confirmPassword;
      },
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }
    )
    .refine(
      (data: any) => {
        return (
          data.newPassword == "" ||
          (data.newPassword.length >= 6 && data.newPassword.length < 20)
        );
      },
      {
        message: "New password min 6 and max 20",
        path: ["newPassword"],
      }
    );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: () => {
    //   // return getRequest("/auth/user-profile").then((data) => {
    //   //   return {
    //   //     firstName: data?.first_name,
    //   //     lastName: data?.last_name,
    //   //     emailAddress: data?.email,
    //   //     phoneNumber: data?.phone?.phone,
    //   //     nationCode: JSON.stringify({
    //   //       code: data?.phone?.code,
    //   //       name: data?.phone?.name,
    //   //     }),
    //   //     countryOfResidence: JSON.stringify(data?.country),
    //   //     oldPassword: "",
    //   //     newPassword: "",
    //   //     confirmPassword: "",
    //   //   };
    //   // });
    // },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    updateUserInfor(values);
  };

  const { toast } = useToast();
  const updateUserInfor = (values: any) => {
    setLsave(true);
    const phone = {
      code: JSON.parse(values.nationCode).code,
      name: JSON.parse(values.nationCode).name,
      phone: values.phoneNumber,
    };
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: phone,
      country: JSON.parse(values.countryOfResidence),
    };
    postRequest("/user/upload", payload).then((data: any) => {
      if (data.code == 200) {
        if (values.newPassword !== "") {
          const payload = {
            old_password: values.oldPassword,
            new_password: values.newPassword,
            password_confirmation: values.confirmPassword,
          };
          postRequest("/auth/change-pass", payload).then((data: any) => {
            if (data.code == 400) {
              return toast({
                variant: "destructive",
                title: "Fail!",
                description: data.message,
                action: <ToastAction altText="Try again">Again</ToastAction>,
              });
            } else {
              getSession().then((data: any) => (data = data?.data));
              return toast({
                variant: "success",
                title: "Success!",
                description: "Change Success",
                action: <ToastAction altText="Try again">Done</ToastAction>,
              });
            }
          });
          return;
        } else {
          toast({
            variant: "success",
            title: "Success!",
            description: "Change Success",
            action: <ToastAction altText="Try again">Again</ToastAction>,
          });
        }
      }
      setLsave(false);
      // return setData(data);
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-8"
      >
        <div className="w-full flex flex-col gap-4">
          <span className="text-4xl font-[900] leading-[48px] text-[#081342]">
            Account Information
          </span>

          <div className="flex flex-col gap-4 w-full">
            {/* fist name lastname */}
            <div className="flex gap-2 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem className="w-1/3">
                      <FormLabel className="font-bold text-lg">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          type="text"
                          {...field}
                          className=" !h-14 text-[#000000] !text-xl !font-sans"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem className="w-2/3">
                      <FormLabel className="font-bold text-lg">
                        Last name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          type="text"
                          {...field}
                          className=" !h-14 text-[#000000] !text-xl !font-sans"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>

            {/* email address */}
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Email address"
                        type="email"
                        {...field}
                        className=" !h-14 text-[#000000] !text-xl !font-sans"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* phone number */}
            <div className="w-full flex flex-col !gap-2">
              <span className="font-bold text-lg ">Phone Number</span>
              <div className="w-full flex gap-2">
                <FormField
                  control={form.control}
                  name="nationCode"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-1/4">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className=" !h-14 text-[#000000] !text-xl !font-sans">
                              <SelectValue placeholder="Select an nation code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className=" text-[#000000] text-xl">
                            <SelectGroup>
                              {country?.data.map((e: any, index: any) => (
                                <SelectItem
                                  key={index}
                                  value={JSON.stringify({
                                    code: e.dial_code,
                                    name: e.code,
                                  })}
                                >
                                  <div className="flex gap-2 w-full items-center text-lg">
                                    <img
                                      src={e.image}
                                      alt={e.name}
                                      className="w-11 h-7"
                                    />
                                    <span>{e.dial_code}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                ></FormField>

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-3/4">
                        <FormControl>
                          <Input
                            placeholder="Enter office phone number"
                            type="text"
                            {...field}
                            className=" !h-14 text-[#000000] !text-xl !font-sans"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                ></FormField>
              </div>
            </div>

            {/* Country of residence */}
            <FormField
              control={form.control}
              name="countryOfResidence"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Country of residence
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className=" !h-14 text-[#000000] !text-xl !font-sans">
                          <SelectValue placeholder="Select an Country of residence" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className=" text-[#000000] text-xl">
                        {country?.data.map((e: any) => (
                          <SelectItem
                            value={JSON.stringify({
                              code: e.code,
                              name: e.name,
                            })}
                            key={JSON.stringify(e)}
                          >
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <span className="text-3xl font-[900] text-[#081342]">
            Password Change
          </span>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold text-lg">
                    Old password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter old password"
                      type="text"
                      {...field}
                      className=" !h-14 text-[#000000] !text-xl !font-sans"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold text-lg">
                    New password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter New password"
                      type="text"
                      {...field}
                      className=" !h-14 text-[#000000] !text-xl !font-sans"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold text-lg">
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Confirm password"
                      type="text"
                      {...field}
                      className=" !h-14 text-[#000000] !text-xl !font-sans"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex justify-end w-full">
          <Button type="submit" className="w-1/4 h-14 text-xl">
            {lSave ? (
              <Loader2 className=" w-6 animate-spin mr-2 h-full text-white" />
            ) : (
              <span className="!text-xl text-white">Save</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSchema;
