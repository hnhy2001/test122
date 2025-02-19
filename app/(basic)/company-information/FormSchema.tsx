﻿"use client";
import React, { useEffect, useRef, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  getRequest,
  postRequest,
  postRequestWithFormData,
} from "@/hook/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import moment from "moment";
const FormSchema = (props: any) => {
  const [data, setData] = useState<any>();
  const [country, setCountry] = useState<any>();
  const [businessType, setBusinessType] = useState<any>();
  const [numberEmployess, setNumberEmployess] = useState<any>();
  const [salesRevenue, setSalesRevenue] = useState<any>();
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [lSave, setLsave] = useState<any>(false);
  const [currentYear] = useState(moment().year());
  const [yearEstablished, setYearEstablished] = useState<any>([]);

  useEffect(() => {
    (async () => {
      getYearEstablished();
      await Promise.all([
        getRequest("/config/countries").then((data) => setCountry(data)),
        getRequest("/config/type_bussines").then((data) =>
          setBusinessType(data)
        ),
        getRequest("/config/number_of_employee").then((data) =>
          setNumberEmployess(data)
        ),
        getRequest("/config/annual_sale_revenue").then((data) =>
          setSalesRevenue(data)
        ),
      ]);
      getRequest("/auth/user-profile").then((data: any) => {
        setData(data);
        form.reset({
          companyName: data?.company.name,
          businessType: JSON.stringify(data?.company.type),
          country: JSON.stringify({
            code: data?.company?.location?.code,
            name: data?.company?.location?.name,
          }),
          yearEstablished: data?.company.year_established,
          numberOfEmployees: JSON.stringify(data?.company.number_members),
          annualSalesRevenue: JSON.stringify(data?.company.revenue),
          businessRegistrationNumber:
            data?.company.bussiness_registrantion_number,
          ownsWarehouse: data?.company.is_warehouse?.toString(),
          officeAddress: data?.company.address,
          companyDescription: data?.company.description,
          companyWebsite: data?.company.website,
          yourPosition: data?.company.position,
          nationCode: JSON.stringify({
            code: data?.company.phone?.code,
            name: data?.company.phone?.name,
          }),
          phoneNumber: data?.company.phone?.phone,
        });
      }),
        props.loading(false);
    })();
  }, []);
  const formSchema = z
    .object({
      companyName: z.string(),
      businessType: z.string(),
      country: z.string(),
      yearEstablished: z.string(),
      numberOfEmployees: z.string(),
      annualSalesRevenue: z.string(),
      businessRegistrationNumber: z.string(),
      ownsWarehouse: z.string(),
      officeAddress: z.string(),
      companyDescription: z.string(),
      companyWebsite: z.string(),
      yourPosition: z.string(),
      nationCode: z.string(),
      phoneNumber: z.string(),
    })
    .refine(
      (data: any) => {
        const regex = /^(http|https):\/\/.*\..*$/;
        return data.companyWebsite == "" || regex.test(data.companyWebsite);
      },
      {
        message: "Website needs to start with http:// or https://",
        path: ["companyWebsite"],
      }
    )
    .refine(
      (data: any) => {
        // const regex = /^http:\/\/.*\.com$/;
        return data.businessRegistrationNumber != "";
      },
      {
        message: "Business registration number invalid",
        path: ["businessRegistrationNumber"],
      }
    )
    .refine(
      (data: any) => {
        return data.businessType != "";
      },
      {
        message: "Business type invalid",
        path: ["businessType"],
      }
    )
    .refine(
      (data: any) => {
        return data.country != "";
      },
      {
        message: "Country invalid",
        path: ["country"],
      }
    )
    .refine(
      (data: any) => {
        return data.yearEstablished != "";
      },
      {
        message: "Year established invalid",
        path: ["yearEstablished"],
      }
    )
    .refine(
      (data: any) => {
        return data.numberOfEmployees != "";
      },
      {
        message: "Number of employees invalid",
        path: ["numberOfEmployees"],
      }
    )
    .refine(
      (data: any) => {
        return data.phoneNumber != "";
      },
      {
        message: "Phone number invalid",
        path: ["phoneNumber"],
      }
    )
    .refine(
      (data: any) => {
        return data.yourPosition != "";
      },
      {
        message: "Your position invalid",
        path: ["yourPosition"],
      }
    )
    .refine(
      (data: any) => {
        return data.officeAddress != "";
      },
      {
        message: "Address invalid",
        path: ["officeAddress"],
      }
    )
    .refine(
      (data: any) => {
        return data.annualSalesRevenue != "";
      },
      {
        message: "Annual sales revenue invalid",
        path: ["annualSalesRevenue"],
      }
    )
    .refine(
      (data: any) => {
        const regex = /^[0-9]+$/;
        return regex.test(data.businessRegistrationNumber);
      },
      {
        message: "business chỉ được là số",
        path: ["businessRegistrationNumber"],
      }
    );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      businessType: "",
      country: "",
      yearEstablished: "",
      numberOfEmployees: "",
      annualSalesRevenue: "",
      businessRegistrationNumber: "",
      ownsWarehouse: "false",
      officeAddress: "",
      companyDescription: "",
      companyWebsite: "",
      yourPosition: "",
    },
  });

  const getYearEstablished = () => {
    const arr = [];
    for (let i = 0; i <= currentYear - 1945; i++) {
      arr.push((1945 + i).toString());
    }
    setYearEstablished(arr.reverse());
    return arr;
  };

  const { toast } = useToast();
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setLsave(true);
    const location = JSON.parse(values.country);
    const phone = {
      code: JSON.parse(values.nationCode).code,
      name: JSON.parse(values.nationCode).name,
      phone: values.phoneNumber,
    };
    let payload = {
      name: values.companyName,
      location: location,
      type: { code: JSON.parse(values.businessType).code },
      revenue: JSON.parse(values.annualSalesRevenue),
      number_members: JSON.parse(values.numberOfEmployees),
      position: values.yourPosition,
      address: values.officeAddress,
      is_warehouse: values.ownsWarehouse == "true",
      bussiness_registrantion_number: values.businessRegistrationNumber,
      year_established: values.yearEstablished,
      phone: phone,
    } as any;
    payload =
      values.companyWebsite != ""
        ? {
            ...payload,
            website: values.companyWebsite,
          }
        : payload;

    payload =
      values.companyDescription != ""
        ? {
            ...payload,
            description: values.companyWebsite,
          }
        : payload;
    postRequest("/user/company-update", payload)
      .then((data: any) => {
        if (data.code == 200) {
          toast({
            variant: "success",
            title: "Success!",
            description: "Update success",
            action: <ToastAction altText="Try again">Done</ToastAction>,
          });
        } else {
          return toast({
            variant: "destructive",
            title: "Fail!",
            description: JSON.stringify(data.data),
            action: <ToastAction altText="Try again">Again</ToastAction>,
          });
        }
        setLsave(false);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Success!",
          description: "Update success",
          action: <ToastAction altText="Try again">Done</ToastAction>,
        });
        setLsave(false);
      });
  };

  const handleUploadAvatar = (e: any) => {
    setBtnLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("role", data?.role);
    postRequestWithFormData("/user/company/upload-logo", formData)
      .then((res: any) => {
        if (res.code == 200) {
          console.log("first");
          toast({
            variant: "success",
            title: "Success",
            description: "Update image company success",
            action: <ToastAction altText="Try again">Done</ToastAction>,
          });
          getRequest("/auth/user-profile").then((data: any) => {
            setData(data);
            setBtnLoading(false);
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: "Somethings went wrong",
        });
        setBtnLoading(false);
      });
  };

  return (
    <div className="w-full flex flex-col gap-2 col-span-2 pl-6">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <span className="text-3xl leading-[48px] font-bold text-primary">
            Company Logo
          </span>
          <span className="text-sm">
            Upload your company logo. This will be the default image of your
            account.
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <div className="w-24 h-24">
            <img
              src={
                data?.role == "BUYER"
                  ? data?.company.logo_buyer
                  : data?.company.logo_seller
              }
              alt="avatar-company"
              className="w-24 h-24 object-cover"
            />
          </div>
          {btnLoading ? (
            <Button disabled className="!px-7 !py-2">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              load
            </Button>
          ) : (
            <Button
              className="!px-7 !py-2"
              onClick={() => uploadFileRef?.current?.click()}
            >
              Upload image
            </Button>
          )}
          <input
            type="file"
            hidden
            ref={uploadFileRef}
            onChange={(event: any) => handleUploadAvatar(event)}
          />
        </div>
        <span className="font-bold text-4xl text-[#081342]">
          Company Information
        </span>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-3"
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Company name
                      </span>
                      <FormControl>
                        <Input
                          disabled
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
              <span className="">
                If you wish to update your company name, please let us know.{" "}
                <strong className="underline">Contact us</strong>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Business Type
                      </span>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" !h-14 text-[#000000] !text-xl !font-sans">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
                          {businessType?.data.map((e: any) => {
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
              ></FormField>
              <span className="">Non-food manufacturing</span>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Country
                      </span>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" !h-14 text-[#000000] !text-xl !font-sans">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
                          {country?.data.map((e: any) => {
                            return (
                              <SelectItem
                                key={JSON.stringify(e)}
                                value={JSON.stringify({
                                  code: e.code,
                                  name: e.name,
                                })}
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
              ></FormField>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="yearEstablished"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Year Established
                      </span>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" !h-14 text-[#000000] !text-xl !font-sans">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
                          {yearEstablished.map((e: any) => (
                            <SelectItem key={e} value={e}>
                              {e}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="numberOfEmployees"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Number Of Employees
                      </span>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" !h-14 text-[#000000] !text-xl !font-sans">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
                          {numberEmployess?.data.map((e: any) => {
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
              ></FormField>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="annualSalesRevenue"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Annual Sales Revenue
                      </span>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className=" !h-14 text-[#000000] !text-xl !font-sans">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
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
              ></FormField>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="businessRegistrationNumber"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Business Registration Number
                      </span>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          className="!h-14 text-[#000000] !text-xl !font-sans"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="ownsWarehouse"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col gap-3 w-full">
                      <span className="text-xl font-bold">
                        Owns Warehouse
                      </span>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex gap-2"
                        >
                          <FormItem className="flex items-center gap-3 !m-0">
                            <span>Yes</span>
                            <RadioGroupItem
                              value="true"
                              className="w-6 h-6 !m-0"
                            />
                          </FormItem>
                          <FormItem className="flex items-center gap-3 !m-0">
                            <span>No</span>
                            <RadioGroupItem
                              value="false"
                              className="w-6 h-6 !m-0"
                            />
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <div className="flex flex-col gap-2">
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
                          <SelectContent className="">
                            {country?.data.map((e: any) => {
                              return (
                                <SelectItem
                                  key={JSON.stringify(e)}
                                  value={JSON.stringify({
                                    code: e.dial_code,
                                    name: e.code,
                                  })}
                                >
                                  <div className="flex gap-2 w-full items-center text-lg">
                                    <img
                                      src={e.image}
                                      alt={e.name}
                                      className="w-14 h-7"
                                    />
                                    <span>{e.dial_code}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
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
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="officeAddress"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Office address
                      </span>
                      <FormControl>
                        <Textarea
                          placeholder="Enter office address"
                          {...field}
                          className=" text-[#000000] text-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="companyDescription"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Company description
                      </span>
                      <FormControl>
                        <Textarea
                          placeholder="Enter company description"
                          {...field}
                          className=" text-[#000000] text-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Company website
                      </span>
                      <FormControl>
                        <Input
                          placeholder="Enter company website"
                          {...field}
                          type="text"
                          className=" !h-14 text-[#000000] !text-xl !font-sans"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="yourPosition"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <span className="font-bold text-lg">
                        Your position
                      </span>
                      <FormControl>
                        <Input
                          placeholder="Enter your position"
                          {...field}
                          type="text"
                          className=" !h-14 text-[#000000] !text-xl !font-sans"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <div className="flex justify-end w-full">
              <Button type="submit" className="w-1/4 !h-14 !text-xl">
                {lSave ? (
                  <Loader2 className=" w-6 animate-spin mr-2 h-full text-white" />
                ) : (
                  <span className="!text-xl text-white">Save</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormSchema;
