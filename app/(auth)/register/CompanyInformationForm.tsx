"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const CompanyInformationForm = (props: any) => {
  // const [websiteCheck, setWebsiteCheck] = useState<any>(true);
  const formSchema = z
    .object({
      companyName: z.string().min(2).max(100),
      location: z.string(),
      companyWebsite: z.string(),
      annualSalesRevenue: z.string(),
      numberOfEmployees: z.string(),
      businessType: z
        .array(z.string())
        .refine((value) => value.some((item) => item), {
          message: "You have to select at least one item.",
        }),
    })
    .refine(
      (data: any) => {
        const regex = /^http:\/\/.*\.com$/;
        return regex.test(data.companyWebsite) || props.websiteCheck;
      },
      {
        message: "website cần bắt đầu bằng http:// và kết thúc bằng .com",
        path: ["companyWebsite"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      location: "",
      companyWebsite: "",
      annualSalesRevenue: "",
      numberOfEmployees: "",
      businessType: [],
    },
  });

  const updateData = (values: any) => props.updateParentData(values);
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!form.formState.isDirty) {
      props?.setTab("profileInformation");
      updateData(values);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="!w-ful flex flex-col gap-12"
      >
        <div className="flex flex-col gap-2 w-full">
          <span className="text-4xl font-black text-[#081342]">
            Create your company profile
          </span>
          <span className="text-lg text-[#081342]">
            Please note that your company details will be used to verify your
            account.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-16">
          <div className="flex flex-col gap-8 col-span-10 md:col-span-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col gap-3 w-full">
                    <FormLabel className="text-xl font-bold">
                      Company Name*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
                        {...field}
                        className="border !h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col gap-3 w-full">
                    <FormLabel className="font-bold text-xl text-[#081342]">
                      Location*
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border !h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        <SelectGroup>
                          {props.location?.data.map((e: any) => (
                            <SelectItem
                              className="!text-2xl !px-2 !p-4"
                              key={JSON.stringify(e)}
                              value={JSON.stringify(e)}
                            >
                              {e.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col gap-3 w-full">
                    <FormLabel className="text-xl font-bold text-[#081342]">
                      Company website*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
                        {...field}
                        className="border !h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl"
                      />
                    </FormControl>
                    <div className="flex gap-2 items-center">
                      <Checkbox className="rounded-full w-5 h-5 !border !border-[#081342]" checked={props.websiteCheck} onClick={() => props.setWebsiteCheck(!props.websiteCheck)}/>
                      <span className="text-lg text-[#081342]">My company has no website.</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="flex flex-col gap-8 col-span-10 md:col-span-6 h-full">
            <div className="flex flex-col gap-6 h-full">
              <span className="text-2xl font-bold text-[#081342]">
                Business type*
              </span>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={() => (
                    <FormItem className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center !m-0">
                      {props.businessType?.data.map((item: any) => (
                        <FormField
                          key={JSON.stringify(item)}
                          control={form.control}
                          name="businessType"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={JSON.stringify(item)}
                                className="!flex !gap-2 !items-center !m-0 !p-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    className="w-5 h-5 border border-#939AA1"
                                    checked={field.value?.includes(
                                      JSON.stringify(item)
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            JSON.stringify(item),
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value !== JSON.stringify(item)
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal !m-0 text-sm">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <span className="text-2xl text-[#081342]">
                Please check all relevant business types.
              </span>
              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="annualSalesRevenue"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-1/2">
                        <FormLabel className="font-bold text-xl text-[#081342]">
                          Annual Sales Revenue (USD)*
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border !h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            {props.salesRevenue?.data.map((e: any) => {
                              return (
                                <SelectItem
                                  className="!text-2xl !px-2 !p-4"
                                  key={JSON.stringify(e)}
                                  value={JSON.stringify(e)}
                                >
                                  {e.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="numberOfEmployees"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-1/2">
                        <FormLabel className="font-bold text-xl text-[#081342]">
                          Number of employees*
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border !h-[4.5rem] border-#939AA1 !text-[#081342] !text-2xl">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            {props.numberOfEmployees?.data.map((e: any) => (
                              <SelectItem
                                className="!text-2xl !px-2 !p-4"
                                value={JSON.stringify(e)}
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
          </div>
        </div>

        <div></div>

        <div className="grid grid-cols-10 gap-16">
          <div className="col-span-4"></div>
          <div className="col-span-6 grid grid-cols-2 gap-8">
            <div className="col-span-0 md:col-span-1">

            </div>
            <Button
              className="border !h-[4.5rem] border-#939AA1 !text-xl col-span-10 md:col-span-1"
              type="submit"
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CompanyInformationForm;
