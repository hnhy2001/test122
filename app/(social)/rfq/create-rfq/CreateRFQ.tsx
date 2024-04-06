"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getRequest } from "@/hook/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreateRFQ = () => {
  const [productCategory, setProductCategory] = useState<any>();
  const [productMap, setProductMap] = useState<any>();
  const [sourcingCountries, setSourcingCountries] = useState<any>();
  // const []

  useEffect(() => {
    (async () => {
      await Promise.all([
        getRequest("/product/list-category-by-level").then((data) => {
          const arr: any[] = [];
          Object.values(data.data).forEach((e: any) => {
            e.children?.forEach((e: any) => {
              e.children?.forEach((e: any) => {
                arr.push(e);
              });
            });
          });
          console.log(arr);
          return setProductMap(arr);
        }),
      ]);
    })();
  }, []);
  const formSchema = z.object({
    productName: z.string(),
    productCategory: z.string(),
    sourcingCountries: z.string(),
    preferredSourcingCountries: z.string(),
    tentativePurchasingVolume: z.string(),
    trialOrder: z.string(),
    packagingType: z.string(),
    requeredCertifications: z.string(),
    deliveryTerms: z.string(),
    portOfDestination: z.string(),
    targetShipmentDate: z.string(),
    paymentTerms: z.string(),
    detailedPaymentTerms: z.string(),
    paymentMade: z.string(),
    reasonRequest: z.string(),
    intendedUsage: z.string(),
    attachments: z.string(),
    nonnegotiable: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <span className="text-3xl font-[900]">Request Details</span>
          {/* Product & Specifications */}
          <span className="text-2xl font-bold">Product & Specifications</span>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Product name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product name"
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
            name="productCategory"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Product category *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-black">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-black">
                      {productMap?.map((e: any) => (
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
          ></FormField>

          {/* Sourcing Countries */}
          <span className="text-2xl font-bold">Sourcing Countries</span>
          <RadioGroup className="flex justify-between">
              <div className="flex gap-2">
                <RadioGroupItem value="1" className="w-6 h-6" />
                <span className="text-xl">All</span>
              </div>

              <div className="flex gap-2 !m-0">
                <RadioGroupItem value="2" className="w-6 h-6" />
                <span className="text-xl">Exclude</span>
              </div>
              <div className="flex gap-2 !m-0">
                <RadioGroupItem value="3" className="w-6 h-6" />
                <span className="text-xl">Only</span>
              </div>
              <div className="flex gap-2 !m-0">
                <RadioGroupItem value="4" className="w-6 h-6" />
                <span className="text-xl">Nonnegotiable</span>
              </div>
          </RadioGroup>

          {/* Expected Order Quantity */}
          <span className="text-2xl font-bold">Expected Order Quantity</span>
          <div className="w-full flex flex-col !gap-2">
            <span className="text-xl font-semibold">
              Tentative Purchasing Volume *
            </span>
            <div className="w-full flex gap-2">
              <FormField
                control={form.control}
                name="tentativePurchasingVolume"
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
              <FormField
                control={form.control}
                name="tentativePurchasingVolume"
                render={({ field }) => {
                  return (
                    <FormItem className="w-1/4">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border border-black">
                            <SelectValue placeholder="-- Select Unit --" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border border-black">
                          <SelectGroup></SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox className="w-5 h-5" />
              <span>Nonnegotiable</span>
            </div>
          </div>

          <div className="w-full flex flex-col !gap-2">
            <span className="text-xl font-semibold">
              Do you plan to have trial orders?
            </span>
            <FormField
              control={form.control}
              name="sourcingCountries"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col gap-3 w-full">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormItem className="flex gap-4 w-full items-center">
                          <div className="flex gap-2 items-center">
                            <RadioGroupItem value="1" className="w-6 h-6" />
                            <span className="text-xl">Yes</span>
                          </div>

                          <div className="flex gap-2 !m-0 items-center">
                            <RadioGroupItem value="2" className="w-6 h-6" />
                            <span className="text-xl">No</span>
                          </div>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                );
              }}
            ></FormField>
            <div className="w-full flex gap-2">
              <FormField
                control={form.control}
                name="tentativePurchasingVolume"
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
              <FormField
                control={form.control}
                name="tentativePurchasingVolume"
                render={({ field }) => {
                  return (
                    <FormItem className="w-1/4">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border border-black">
                            <SelectValue placeholder="-- Select Unit --" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border border-black">
                          <SelectGroup></SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox className="w-5 h-5" />
              <span>Nonnegotiable</span>
            </div>
          </div>

          {/* Requirements */}
          <span className="text-2xl font-bold">Requirements</span>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Packaging Types *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product name"
                      {...field}
                      className="border-black border"
                    />
                  </FormControl>
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Required Certifications *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-black">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-black"></SelectContent>
                  </Select>
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          {/* Logistic Terms */}
          <span className="text-2xl font-bold">Logistic Terms</span>
          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Delivery Terms *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-black">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-black"></SelectContent>
                  </Select>
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Port of Destination *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-black">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-black"></SelectContent>
                  </Select>
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Target Shipment Date
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-black">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-black"></SelectContent>
                  </Select>
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          {/* Payment Terms */}
          <span className="text-2xl font-bold">Payment Terms</span>
          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Payment Terms *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-black">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-black"></SelectContent>
                  </Select>
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Detailed Payment Terms
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-black">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-black"></SelectContent>
                  </Select>
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="productCategory"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Payment To Be Made By
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-black">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-black"></SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          {/* Additional Information */}
          <span className="text-2xl font-bold">Additional Information</span>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Reason For This Request
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product name"
                      {...field}
                      className="border-black border"
                    />
                  </FormControl>
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Intended Usage
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product name"
                      {...field}
                      className="border-black border"
                    />
                  </FormControl>
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Intended Usage
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product name"
                      {...field}
                      className="border-black border"
                    />
                  </FormControl>
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button className="w-full">upload photos</Button>

          <div className="w-full flex gap-2">
            <Checkbox className="w-5 h-5" />
            <span>
              * I acknowledge that I have read and understood Tridge Terms of
              Service and Privacy Policy, and I hereby grant my consent to
              Tridge to share my personal information that I voluntarily provide
              to Tridge with third parties for the purpose of providing services
              such as offering products and services; sending information about
              potential business opportunities, products, or services; or
              disclosing contact information for communication with visitors or
              participants to Social Marketplace and Tridge’s partners.
            </span>
          </div>

          <Button className="w-full">Submit RFQ</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateRFQ;
