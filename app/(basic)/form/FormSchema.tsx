"use client";
import React from "react";
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
} from "@/components/ui/select";
const FormSchema = () => {
  const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    emailAddress: z.string().email(),
    phoneNumber: z.string().min(10),
    nationCode: z.string(),
    countryOfResidence: z.string(),
    oldPassword: z.string().min(6).max(16),
    newPassword: z.string().min(6).max(16),
    confirmPassword: z.string().min(6).max(16),
  });
  //   const userProfile: IUserProfile = await getRequest("/auth/user-profile");
  //   console.log(userProfile);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      nationCode: "",
      countryOfResidence: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
  };
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
                      <FormItem className="w-1/3">
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border border-black">
                              <SelectValue placeholder="Select an nation code" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            <SelectItem value="+84">Việt Nam</SelectItem>
                            <SelectItem value="+85">Việt Nam 1</SelectItem>
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
                      <FormItem className="w-2/3">
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
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border border-black">
                          <SelectValue placeholder="Select an Country of residence" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        <SelectItem value="Việt Nam">Việt Nam</SelectItem>
                        <SelectItem value="Việt Nam 1">Việt Nam 1</SelectItem>
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
