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
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getRequest } from "@/hook/apiClient";

const CompanyInformationForm = (props: any) => {
  const [location, setLocation] = useState<any>();
  const [businessType, setBusinessType] = useState<any>();
  const [salesRevenue, setSalesRevenue] = useState<any>();
  const [numberOfEmployees, setNumberOfEmployees] = useState<any>();

  useEffect(() => {
    (() => {
      getRequest("/config/countries").then((data) => setLocation(data));
      getRequest("/config/type_bussines").then((data) => setBusinessType(data));
      getRequest("/config/annual_sale_revenue").then((data) =>
        setSalesRevenue(data)
      );
      getRequest("/config/number_of_employee").then((data) =>
        setNumberOfEmployees(data)
      );
    })();
  }, []);
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
        return regex.test(data.companyWebsite);
      },
      {
        message: "website cần bắt đầu bằng http:// và kết thúc bằng .com",
        path: ["companyWebsite"],
      }
    );

  console.log(salesRevenue);

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
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-4xl font-black">
            Create your company profile
          </span>
          <span className="text-lg">
            Please note that your company details will be used to verify your
            account.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-16">
          <div className="flex flex-col gap-8 col-span-4">
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
                        className="border-black border h-16"
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
                    <FormLabel className="font-bold text-xl">
                      Location
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border border-black h-16">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        <SelectGroup>
                          {location?.data.map((e: any) => (
                            <SelectItem
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
                    <FormLabel className="text-xl font-bold">
                      Company website*
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        type="text"
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

          <div className="flex flex-col gap-8 col-span-6 h-full">
            <div className="flex flex-col gap-4 justify-between h-full">
              <span className="text-2xl font-bold">Business type*</span>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={() => (
                    <FormItem className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center !m-0">
                      {businessType?.data.map((item: any) => (
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
                                    className="w-5 h-5"
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
              <span className="text-xl">
                Please check all relevant business types.
              </span>
              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="annualSalesRevenue"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-1/2">
                        <FormLabel className="font-bold text-xl">
                          Annual Sales Revenue (USD)
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border border-black h-16">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            {salesRevenue?.data.map((e: any) => {
                              return (
                                <SelectItem
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
                        <FormLabel className="font-bold text-xl">
                          Number of employees
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border border-black h-16">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            {numberOfEmployees?.data.map((e: any) => (
                              <SelectItem
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

        <div className="flex justify-end">
          <Button className="!w-1/4 h-16" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CompanyInformationForm;
