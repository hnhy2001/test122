"use client";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import {
  getRequest,
  postRequest,
  postRequestWithFormData,
} from "@/hook/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Selects, { Value } from "@radix-ui/react-select";
import MultiSelect from "./MultiSelect";
import TargetDate from "./TargetDate";
import ProductCategory from "./ProductCategory";
import moment from "moment";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const CreateRFQ = () => {
  const [productMap, setProductMap] = useState<any>();
  const [sourcingCountries, setSourcingCountries] = useState<any>([]);
  const [sourcingCountriesType, setSourcingCountriesType] = useState<any>("1");
  const [country, setCountry] = useState<any[]>();
  const [unit, setUnit] = useState<any>();
  const [deliveryTerms, setDeliveryTerms] = useState<any>();
  const [deliveryTermsSelected, setDeliveryTermsSelected] = useState<any>();
  const [product, setProduct] = useState<any>();
  const [productSelected, setProductSelected] = useState<any>();
  const [paymentTerms, setPaymentTerms] = useState<any>();
  const [nVolume, setNVolume] = useState<any>(0);
  const [trialOrderAgree, setTrialOrderAgree] = useState<any>(0);
  const [nTrialOrder, setNTrialOrder] = useState<any>(0);
  const [nPackageType, setNPackageType] = useState<any>(0);
  const [certifications, setCertifications] = useState<any>();
  const [certificationsSelected, setCertificationsSelected] = useState<any>();
  const [nRequiredCertifications, setNRequiredCertifications] =
    useState<any>(0);
  const [nDeliveryTerm, setNDeliveryTerm] = useState<any>(0);
  const [nPortOfDestination, setNPortOfDestination] = useState<any>(0);
  const [nTargetShipmentDate, setNTargetShipmentDate] = useState<any>(0);
  const [nPaymentTerm, setNPaymentTerm] = useState<any>(0);
  const [nDetailedPaymentTerm, setNDetailedPaymentTerm] = useState(0);
  const [agree, setAgree] = useState<any>(0);
  const [targetShipmentDate, setTargetShipmentDate] = useState<any>();
  const [parentCode, setParentCode] = useState<any>([]);
  const [atributeSelected, setAtributeSelected] = useState<any>();
  const [filter, setFilter] = useState<any>();
  const [productCategory, setProductCategory] = useState<any>();
  const [paymentType, setPaymentType] = useState<any>();
  const [attachmentsLoading, setAttachmentsLoading] = useState<any>(false);
  const [attachments, setAttachments] = useState<any>(false);
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const createRFQRef = useRef<HTMLInputElement>(null);
  const [lCreateRFQ, setLCreateRFQ] = useState<any>(false);

  const getParentCode = (data: any) => {
    let prCode;
    Object.values(product?.data).map((e: any) => {
      e.children?.forEach((e1: any) => {
        e.children?.forEach((e2: any) => {
          e2.children?.forEach((e3: any) => {
            if (e3.code == data?.code && e3.name == data?.name) {
              const parentCodes = [e1.code, e2.code];
              // setParentCode((item: any) => {
              //   if(item.length < 2){
              //     item = [...parentCodes]
              //   }
              //   return item;
              // })
              prCode = parentCodes;
            }
          });
        });
      });
    });
    return prCode;
  };

  const { toast } = useToast();
  const handleUploadAvatar = (e: any) => {
    setAttachmentsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    postRequestWithFormData("/file/upload-file-2", formData).then(
      (res: any) => {
        if (res.code == 200) {
          toast({
            title: "Success",
            description: "Upload attachment success",
            action: <ToastAction altText="Try again">Done</ToastAction>,
          });
          setAttachments(res.data.file_name);
          setAttachmentsLoading(false);
        } else {
          toast({
            variant: "destructive",
            title: "FAIL!",
            description: "Upload attachment some waring wenrong!",
            action: <ToastAction altText="Try again">Done</ToastAction>,
          });
          setAttachmentsLoading(false);
        }
      }
    );
  };

  // console.log(product)

  const getSourcingCountry = () => {
    let result: any[] = [];
    if (sourcingCountriesType == "1") {
      country?.map((e: any) => {
        result.push({
          code: JSON.parse(e.value).code,
          name: JSON.parse(e.value).name,
        });
      });
      return result;
    }

    if (sourcingCountriesType == "2") {
      country
        ?.filter((e: any) => !sourcingCountries.includes(e))
        .map((e: any) => {
          result.push({
            code: JSON.parse(e.value).code,
            name: JSON.parse(e.value).name,
          });
        });
      return result;
    }

    if (sourcingCountries == "3") {
      sourcingCountries?.map((e: any) => {
        result.push({
          code: JSON.parse(e.value).code,
          name: JSON.parse(e.value).name,
        });
      });
      return result;
    }
  };

  const getDeliveryTerm = () => {
    const result: any[] = [];
    deliveryTermsSelected.map((e: any) => {
      result.push(JSON.parse(e.value));
    });
    return result;
  };

  const getCertifications = () => {
    const result: any[] = [];
    certificationsSelected.map((e: any) => {
      result.push(JSON.parse(e.value));
    });
    return result;
  };
  const productMapFunction = () => {
    const arr: any[] = [];
    if (product) {
      Object.values(product?.data)?.forEach((e: any) => {
        e.children?.forEach((e: any) => {
          e.children?.forEach((e: any) => {
            arr.push(e);
          });
        });
      });
    }
    return setProductMap(removeDuplicates(arr));
  };
  const filterProductSearch = (value: any) => {
    if (value == "") {
      productMapFunction();
    } else {
      setProductMap(productMap.filter((e: any) => e.code.includes(value)));
    }
  };
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const productCategorys = {
      level: 3,
      name: productCategory?.name,
      code: productCategory?.code,
      parent_code: getParentCode(productCategory),
      updated_at: moment.now(),
      created_at: moment.now(),
    };

    const attribute = atributeSelected;
    const sourceCountry = getSourcingCountry();
    const expectedOrderQuantity = {
      tentative_purchasing_volume: {
        quantity: values.tentativePurchasingVolume,
        unit: JSON.parse(values.tentativePurchasingVolumeUnit).name,
        nonnegotiable: nVolume,
      },
      trial_order: {
        agree: trialOrderAgree,
        quantity: values.trialOrder,
        unit: JSON.parse(values.trialOrderUnit).name,
        nonnegotiable: nTrialOrder,
      },
    };

    const requirements = {
      package_type: {
        description: values.packagingType,
        nonnegotiable: nPackageType,
      },
    };

    const logisticTerms = {
      delivery_term: {
        term: getDeliveryTerm(),
        nonnegotiable: nDeliveryTerm,
      },
      port_of_destination: {
        country: {
          code: JSON.parse(values.portOfDestination).code,
          name: JSON.parse(values.portOfDestination).name,
        },
        nonnegotiable: nPortOfDestination,
      },
      target_shipment_date: {
        value: moment(targetShipmentDate, "ddd MMM DD YYYY HH:mm:ss").format(
          "YYYY-MM-DD"
        ),
        nonegotiable: nTargetShipmentDate,
      },
    };

    const paymentTerms = {
      type: paymentType?.map((e: any) => JSON.parse(e.value)),
      nonegotiable: nPaymentTerm,
      detailed_payment_terms: {
        description: values.detailedPaymentTerms,
        nonegotiable: nDetailedPaymentTerm,
      },
      payment_to_be_made_by: values.paymentMade,
    };

    const additionalInformation = {
      reason_for_this_request: values.reasonRequest,
      intended_usage: values.intendedUsage,
      additional_details: values.additionalDetails,
      attachment: attachments,
    };

    const requiredCertifications = {
      cerification: getCertifications(),
      nonegotiable: 1,
    };
    const payload = {
      product_name: values.productName,
      product_category: productCategorys,
      attribute_detail: attribute,
      source_country: sourceCountry,
      expected_order_quantity: expectedOrderQuantity,
      requirements: requirements,
      logistic_terms: logisticTerms,
      payment_terms: paymentTerms,
      additional_information: additionalInformation,
      unit: {
        code: "ton",
        name: "metric ton",
      },
    };

    setLCreateRFQ(true);
    postRequest("/rfq/create", payload).then((data: any) => {
      if (data.message == "Create successfully") {
        toast({
          title: "Success",
          description: "Upload attachment success",
          action: <ToastAction altText="Try again">Done</ToastAction>,
        });
        setLCreateRFQ(false);
      } else {
        toast({
          variant: "destructive",
          title: "FAIL!",
          description: "Upload attachment some waring wenrong!",
          action: <ToastAction altText="Try again">Done</ToastAction>,
        });
        setLCreateRFQ(false);
      }
    });
  };
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
          setProduct(data);
          return setProductMap(removeDuplicates(arr));
        }),

        getRequest("/config/countries").then((data: any) => {
          const arr = data?.data.map((e: any) => ({
            label: e.name,
            value: JSON.stringify(e),
          }));
          setCountry(arr);
        }),

        getRequest("/config/product_unit").then((data: any) =>
          setUnit(data?.data)
        ),
        getRequest("/config/delivery_term").then((data: any) =>
          setDeliveryTerms(data?.data)
        ),
        getRequest("/config/payment_term").then((data: any) =>
          setPaymentTerms(data?.data)
        ),
        getRequest("/config/certification").then((data: any) =>
          setCertifications(data?.data)
        ),
      ]);
    })();
  }, []);

  const removeDuplicates = (arr: any) => {
    const uniqueMap: { [key: string]: any } = {};

    arr.forEach((item: any) => {
      uniqueMap[JSON.stringify(item)] = item;
    });

    return Object.values(uniqueMap);
  };

  const splitCamelCase = (data: any) => {
    return data
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, function (str: any) {
        return str.toUpperCase();
      });
  };
  const formSchema = z
    .object({
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
      trialOrderUnit: z.string(),
      tentativePurchasingVolumeUnit: z.string(),
      additionalDetails: z.string(),
      trialOrderAgree: z.string(),
      requiredCertifications: z.string(),
    })
    .refine(
      (data: any) => {
        return productCategory;
      },
      {
        message: "Product category can not be null",
        path: ["productCategory"],
      }
    )
    .refine(
      (data: any) => {
        return deliveryTermsSelected;
      },
      {
        message: "Delivery terms can not be null",
        path: ["deliveryTerms"],
      }
    )
    .refine(
      (data: any) => {
        return paymentType;
      },
      {
        message: "Payment type can not be null",
        path: ["paymentTerms"],
      }
    )
    .refine(
      (data: any) => {
        return atributeSelected;
      },
      {
        message: "AtributeSelected can not be null",
        path: ["productCategory"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // resolver: zodResolver(
    //   formSchema.superRefine((values, context) => {
    //     Object.keys(values).forEach((v: any) => {
    //       if (!values[v as keyof z.infer<typeof formSchema>])
    //         if (
    //           v == "productName" ||
    //           v == "tentativePurchasingVolume" ||
    //           v == "packageType" ||
    //           v == "requiredCertifications" ||
    //           v == "portOfDestination"
    //         ) {
    //           context.addIssue({
    //             code: z.ZodIssueCode.custom,
    //             message: splitCamelCase(v) + " can not be null",
    //             path: [v],
    //           });
    //         }
    //     });
    //   })
    // ),
    defaultValues: {
      productCategory: "",
      sourcingCountries: "",
      preferredSourcingCountries: "",
      trialOrder: "",
      requeredCertifications: "",
      deliveryTerms: "",
      targetShipmentDate: "",
      paymentTerms: "",
      detailedPaymentTerms: "",
      paymentMade: "",
      reasonRequest: "",
      intendedUsage: "",
      attachments: "",
      nonnegotiable: "",
      additionalDetails: "",
      trialOrderAgree: "",
      requiredCertifications: "",
    },
  });

  console.log(atributeSelected);

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
                      placeholder="Enter product name"
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
                  <FormLabel className="text-lg font-semibold">
                    Product category *
                  </FormLabel>
                  <ProductCategory
                    options={productMap}
                    search={filterProductSearch}
                    // setFilter={setFilter}
                    setAtributeSelected={setAtributeSelected}
                    productCategory={setProductCategory}
                  ></ProductCategory>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          {/* Sourcing Countries */}
          <span className="text-2xl font-bold">Sourcing Countries</span>
          <div className="flex flex-col gap-2">
            <RadioGroup className="flex justify-between" defaultValue="1">
              <div className="flex gap-2">
                <RadioGroupItem
                  value="1"
                  className="w-6 h-6"
                  onClick={() => setSourcingCountriesType("1")}
                />
                <span className="text-xl">All</span>
              </div>

              <div className="flex gap-2 !m-0">
                <RadioGroupItem
                  value="2"
                  className="w-6 h-6"
                  onClick={() => setSourcingCountriesType("2")}
                />
                <span className="text-xl">Exclude</span>
              </div>
              <div className="flex gap-2 !m-0">
                <RadioGroupItem
                  value="3"
                  className="w-6 h-6"
                  onClick={() => setSourcingCountriesType("3")}
                />
                <span className="text-xl">Only</span>
              </div>
              <div className="flex gap-2 !m-0">
                <Checkbox value="4" className="w-6 h-6" />
                <span className="text-xl">Nonnegotiable</span>
              </div>
            </RadioGroup>
            {sourcingCountriesType !== "1" ? (
              <MultiSelect
                options={country}
                selected={sourcingCountries}
                onChange={setSourcingCountries}
                placeholder={"-Select Countries-"}
              />
            ) : (
              ""
            )}
          </div>

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
                          type="number"
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
                name="tentativePurchasingVolumeUnit"
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
                          <SelectGroup>
                            {unit?.map((e: any) => (
                              <SelectItem
                                value={JSON.stringify(e)}
                                key={JSON.stringify(e)}
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
              ></FormField>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                className="w-5 h-5"
                defaultChecked={nVolume == 1}
                onClick={() => (nVolume == 1 ? setNVolume(0) : setNVolume(1))}
              />
              <span>Nonnegotiable</span>
            </div>
          </div>

          <div className="w-full flex flex-col !gap-2">
            <span className="text-xl font-semibold">
              Do you plan to have trial orders?
            </span>
            <FormField
              control={form.control}
              name="trialOrderAgree"
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
                            <span
                              className="text-xl"
                              onClick={() => setTrialOrderAgree(1)}
                            >
                              Yes
                            </span>
                          </div>

                          <div className="flex gap-2 !m-0 items-center">
                            <RadioGroupItem value="2" className="w-6 h-6" />
                            <span
                              className="text-xl"
                              onClick={() => setTrialOrderAgree(0)}
                            >
                              No
                            </span>
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
                name="trialOrder"
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
                name="trialOrderUnit"
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
                          <SelectGroup>
                            {unit?.map((e: any) => (
                              <SelectItem
                                value={JSON.stringify(e)}
                                key={JSON.stringify(e)}
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
              ></FormField>
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox
                className="w-5 h-5"
                defaultChecked={nTrialOrder == 1}
                onClick={() =>
                  nTrialOrder == 1 ? setNTrialOrder(0) : setNTrialOrder(1)
                }
              />
              <span>Nonnegotiable</span>
            </div>
          </div>

          {/* Requirements */}
          <span className="text-2xl font-bold">Requirements</span>
          <FormField
            control={form.control}
            name="packagingType"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Packaging Types *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Specify preferred packaging types"
                      {...field}
                      className="border-black border"
                    />
                  </FormControl>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      className="w-5 h-5"
                      defaultChecked={nPackageType == 1}
                      onClick={() =>
                        nPackageType == 1
                          ? setNPackageType(0)
                          : setNPackageType(1)
                      }
                    />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="requeredCertifications"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Required Certifications *
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={certifications?.map((e: any) => ({
                        label: e.name,
                        value: JSON.stringify(e),
                      }))}
                      selected={certificationsSelected}
                      onChange={setCertificationsSelected}
                      placeholder={"Search and select ceritication"}
                    ></MultiSelect>
                  </FormControl>

                  <div className="flex gap-2 items-center">
                    <Checkbox
                      className="w-5 h-5"
                      defaultChecked={nRequiredCertifications == 1}
                      onClick={() =>
                        nRequiredCertifications == 1
                          ? setNRequiredCertifications(0)
                          : setNRequiredCertifications(1)
                      }
                    />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          {/* Logistic Terms */}
          <span className="text-2xl font-bold">Logistic Terms</span>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-lg">Delivery term *</span>
            <MultiSelect
              options={deliveryTerms?.map((e: any) => ({
                label: e.name,
                value: JSON.stringify(e),
              }))}
              selected={deliveryTermsSelected}
              onChange={setDeliveryTermsSelected}
              placeholder={"-Select Countries-"}
            ></MultiSelect>
            <div className="flex gap-2 items-center">
              <Checkbox
                className="w-5 h-5"
                defaultChecked={nDeliveryTerm == 1}
                onClick={() =>
                  nDeliveryTerm == 1 ? setNDeliveryTerm(0) : setNDeliveryTerm(1)
                }
              />
              <span>Nonnegotiable</span>
            </div>
          </div>

          <FormField
            control={form.control}
            name="portOfDestination"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Port of Destination *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border border-black">
                        <SelectValue placeholder="-Select Country-" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-black">
                      <SelectGroup>
                        {country?.map((e: any) => {
                          const result = JSON.parse(e.value);
                          return (
                            <SelectItem
                              value={JSON.stringify({
                                code: result.code,
                                name: result.name,
                              })}
                              key={JSON.stringify(result)}
                            >
                              {result.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      className="w-5 h-5"
                      defaultChecked={nPortOfDestination == 1}
                      onClick={() =>
                        nPortOfDestination == 1
                          ? setNPortOfDestination(0)
                          : setNPortOfDestination(1)
                      }
                    />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="targetShipmentDate"
            render={({ field }) => {
              return (
                <FormItem className="w-full flex flex-col gap-2">
                  <FormLabel className="font-semibold text-lg">
                    Target Shipment Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full border border-black justify-start text-left font-normal",
                          !targetShipmentDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {targetShipmentDate ? (
                          format(targetShipmentDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                      <Select
                        onValueChange={(value) =>
                          setTargetShipmentDate(
                            addDays(new Date(), parseInt(value))
                          )
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="0">Today</SelectItem>
                          <SelectItem value="1">Tomorrow</SelectItem>
                          <SelectItem value="3">In 3 days</SelectItem>
                          <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="rounded-md border">
                        <Calendar
                          mode="single"
                          selected={targetShipmentDate}
                          onSelect={setTargetShipmentDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>

                  <div className="flex gap-2 items-center">
                    <Checkbox
                      className="w-5 h-5"
                      defaultChecked={nTargetShipmentDate == 1}
                      onClick={() =>
                        nTargetShipmentDate == 1
                          ? setNTargetShipmentDate(0)
                          : setNTargetShipmentDate(1)
                      }
                    />
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
            name="paymentTerms"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Payment Terms *
                  </FormLabel>
                  <MultiSelect
                    options={paymentTerms?.map((e: any) => ({
                      label: e.name,
                      value: JSON.stringify(e),
                    }))}
                    selected={paymentType}
                    onChange={setPaymentType}
                    placeholder={"-Select Payment Terms-"}
                  ></MultiSelect>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      className="w-5 h-5"
                      defaultChecked={nPaymentTerm == 1}
                      onClick={() =>
                        nPaymentTerm == 1
                          ? setNPaymentTerm(0)
                          : setNPaymentTerm(1)
                      }
                    />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="detailedPaymentTerms"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Detailed Payment Terms
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Specify detailed payment terms"
                      type="text"
                      {...field}
                      className="border-black border"
                    />
                  </FormControl>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      className="w-5 h-5"
                      defaultChecked={nDetailedPaymentTerm == 1}
                      onClick={() =>
                        nDetailedPaymentTerm == 1
                          ? setNDetailedPaymentTerm(0)
                          : setNDetailedPaymentTerm(1)
                      }
                    />
                    <span>Nonnegotiable</span>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>

          <FormField
            control={form.control}
            name="paymentMade"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-lg">
                    Payment To Be Made By
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter payment to made by"
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

          {/* Additional Information */}
          <span className="text-2xl font-bold">Additional Information</span>
          <FormField
            control={form.control}
            name="reasonRequest"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Reason For This Request
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add reason for this request"
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
            name="intendedUsage"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Intended Usage
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Specify your intended usage"
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
            name="additionalDetails"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Additional details
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add additional details regarding this request"
                      {...field}
                      className="border-black border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Attachments</span>
            <div className="flex items-center justify-center border border-separate border-black w-full h-24 rounded-lg">
              {attachmentsLoading ? (
                <Loader2 className=" w-4 animate-spin mr-2 h-full" />
              ) : (
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex flex-col gap-2 items-center">
                    <img
                      src="/uploadRFQ.png"
                      alt="uploadRFQ"
                      onClick={() => uploadFileRef?.current?.click()}
                      className="w-6 h-6"
                    />
                    {attachments ? (
                      <span>{attachments}</span>
                    ) : (
                      <div className="flex flex-col gap-2 items-center">
                        <span>Add files or photos</span>
                        <span>or drop files or photos upload</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    hidden
                    ref={uploadFileRef}
                    onChange={(event: any) => handleUploadAvatar(event)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex gap-2">
            <Checkbox
              className="w-5 h-5"
              defaultChecked={agree == 1}
              onClick={() => (agree == 1 ? setAgree(0) : setAgree(1))}
            />
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
          <Button className="w-full" type="submit">
            {
              lCreateRFQ? <Loader2 className=" w-4 animate-spin mr-2 h-full" />:<span>Submit RFQ</span>
            }
          </Button>

        </form>
      </Form>
    </div>
  );
};

export default CreateRFQ;
