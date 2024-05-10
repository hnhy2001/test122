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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { getRequest } from "@/hook/apiClient";

const SetupProfileForm = (props: any) => {
  const formSchema = z
    .object({
      firstName: z.string().min(1, "Required"),
      lastName: z.string().min(1, "Required"),
      countryOfResidence: z.string().min(1, "Required"),
      departmentRole: z.string().min(1, "Required"),
      jobLevel: z.string().min(1, "Required"),
      mostType: z.string().min(1, "Required"),
    })
    .refine(
      (data: any) => {
        return data.firstName.length >= 2;
      },
      {
        message: "First name needs at least 2 characters",
        path: ["firstName"],
      }
    )
    .refine(
      (data: any) => {
        return data.lastName.length >= 2;
      },
      {
        message: "Last name needs at least 2 characters",
        path: ["lastName"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      countryOfResidence: "",
      departmentRole: "",
      jobLevel: "",
      mostType: "",
      ...props.profile
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    props.updateParentData(values);
    props.setTab("selectProduct");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-12"
      >
        <div className="w-full flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-black text-[#081342]">
              Set up your account information
            </span>
            <span className="hidden xs:inline text-[1.25rem]">
              Please note that your company details will be used to verify your
              account.
            </span>
          </div>

          <div className="grid gap-16 w-full grid-cols-2">
            <div className="flex flex-col gap-8 col-span-2 lg:col-span-1">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col gap-3 w-full">
                      <FormLabel className="text-xl font-bold text-[#081342]">
                        First name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
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

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col gap-3 w-full">
                      <FormLabel className="text-xl font-bold text-[#081342]">
                        Last name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
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

              <div className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="countryOfResidence"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="font-bold text-xl text-[#081342]">
                          Country of residence <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border !h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl !bg-white">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            {props.country?.data.map((e: any) => (
                              <SelectItem
                                value={JSON.stringify(e)}
                                key={JSON.stringify(e)}
                              >
                                {e.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-lg" />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="departmentRole"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="font-bold text-xl text-[#081342]">
                          Department role <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border !h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl !bg-white">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            {props.role?.data.map((e: any) => (
                              <SelectItem
                                value={JSON.stringify(e)}
                                key={JSON.stringify(e)}
                              >
                                {e.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-lg" />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-8 col-span-2 lg:col-span-1">
              <div className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="jobLevel"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="font-bold text-xl text-[#081342]">
                          Job level <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border !h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl !bg-white">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            {props.jobLevel?.data.map((e: any) => (
                              <SelectItem
                                value={JSON.stringify(e)}
                                key={JSON.stringify(e)}
                              >
                                {e.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-lg" />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="mostType"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="text-xl font-bold text-[#081342]">
                          I’m most interested in.. <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormItem className="flex flex-col gap-2 w-full">
                              {props.thing?.data.map((e: any) => (
                                <div
                                  className="flex px-2 items-center justify-between border !min-h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl rounded-lg gap-16"
                                  key={JSON.stringify(e)}
                                >
                                  <span className="text-[8px] sm:text-lg">
                                    {e.description}
                                  </span>
                                  <RadioGroupItem
                                    value={JSON.stringify(e)}
                                    className="w-6 h-6"
                                  />
                                </div>
                              ))}
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-lg" />
                      </FormItem>
                    );
                  }}
                ></FormField>
              </div>
            </div>
          </div>

          <div className="grid xl:grid-cols-2 gap-16">
            <div className="hidden md:block"></div>
            <div className="col-span-2 xl:col-span-1 grid xl:grid-cols-2 gap-8">
              <Button
                className="border-2 border-black !h-[4.5rem] border-#939AA1 text-[#081342] text-xl font-black"
                variant="outline"
                onClick={() => props.setTab("companyInformation")}
              >
                Back
              </Button>

              <Button
                className=" !m-0 !p-0 border !h-[4.5rem] border-#939AA1 text-xl"
                type="submit"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SetupProfileForm;
