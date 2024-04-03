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
const FormSchema = () => {
  const [data, setData] = useState<any>();
  const [country, setCountry] = useState<any>();
  useEffect(() => {
    (() => {
      getRequest("/config/countries").then((data) => setCountry(data));
      getRequest("/auth/user-profile").then((data) => {
        setData(data);
        // console.log("+" + data?.country.code);
        // return form.reset({
        //   firstName: data?.first_name,
        //   lastName: data?.last_name,
        //   emailAddress: data?.email,
        //   phoneNumber: "",
        //   nationCode: "+84",
        //   countryOfResidence: data?.country.name,
        //   oldPassword: "",
        //   newPassword: "",
        //   confirmPassword: "",
        // });
      });
    })();
  }, []);
  const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    emailAddress: z.string().email(),
    phoneNumber: z.string().min(10),
    nationCode: z.string(),
    countryOfResidence: z.string(),
    oldPassword: z.string().min(6).max(20),
    newPassword: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  }).refine((data: any) => {
    return data.newpPassword === data.confirmPassword;
  },{
    message:"Passwords do not match",
    path: ["confirmPassword"]
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {

    //   firstName: "",
    //   lastName: "",
    //   emailAddress: "",
    //   phoneNumber: "",
    //   nationCode: "",
    //   countryOfResidence: "",
    //   oldPassword: "",
    //   newPassword: "",
    //   confirmPassword: "",
    // },
    defaultValues: () => {
      return getRequest("/auth/user-profile").then((data) => {
        return ({
          firstName: data?.first_name,
          lastName: data?.last_name,
          emailAddress: data?.email,
          phoneNumber: data?.phone,
          nationCode: JSON.stringify(data?.country),
          countryOfResidence: JSON.stringify(data?.country),
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      });
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    updateUserInfor(values);
  
  };

  const updateUserInfor = (values: any) => {
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phoneNumber
    }
    postRequest("/user/upload", payload).then((data:any) => {
      return setData(data);
    })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-8"
      >
        <div className="w-full flex flex-col gap-4">
          <span className="text-3xl font-[900]">Account Information</span>

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
                          className="border-black border"
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
                          className="border-black border"
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
                        placeholder="Email address"
                        type="email"
                        {...field}
                        className="border-black border"
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
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="border border-black">
                              <SelectValue placeholder="Select an nation code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            <SelectGroup>
                              {country?.data.map((e: any, index: any) => (
                                <SelectItem key={index} value={JSON.stringify({code: e.code, name:e.name})}>
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
                            className="border-black border"
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border border-black">
                          <SelectValue placeholder="Select an Country of residence" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        {
                          country?.data.map((e:any) => (
                            <SelectItem value={JSON.stringify({code: e.code, name: e.name})} key={JSON.stringify(e)}>
                              {e.name}
                            </SelectItem>
                          ))
                        }
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
          <span className="text-3xl font-[900]">Password Change</span>
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
                      className="border-black border"
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
                      className="border-black border"
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
                      className="border-black border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex justify-end w-full">
          <Button type="submit" className="w-1/4">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSchema;
