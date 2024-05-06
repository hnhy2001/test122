"use client";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import MultiSelect from "react-select";
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
import moment from "moment";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import DragDropPhoto from "@/components/ui/drag-drop-photo";
import ProductCategory from "./ProductCategory";

const CreateRFQ = (props: any) => {
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
  const [trialOrderAgree, setTrialOrderAgree] = useState<any>("0");
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
  const [atributeSelected, setAtributeSelected] = useState<any>([]);
  const [paymentType, setPaymentType] = useState<any>();
  const [lCreateRFQ, setLCreateRFQ] = useState<any>(false);
  const [attribute, setAttribute] = useState<any>([]);
  const [galleries, setGalleries] = useState<any>();

  const getParentCode = (data: any) => {
    let prCode;
    Object.values(product?.data).map((e: any) => {
      e.children?.forEach((e1: any) => {
        e.children?.forEach((e2: any) => {
          e2.children?.forEach((e3: any) => {
            if (e3.code == data?.code && e3.name == data?.name) {
              const parentCodes = [e1.code, e2.code];
              prCode = parentCodes;
            }
          });
        });
      });
    });
    return prCode;
  };

  const { toast } = useToast();

  const getSourcingCountry = () => {
    let result: any[] = [];
    if (sourcingCountriesType == "1") {
      country?.map((e: any) => {
        result.push({
          code: JSON.parse(e.value).code,
          name: JSON.parse(e.value).name,
        });
      });
      return "All country";
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

    if (sourcingCountriesType == "3") {
      sourcingCountries?.map((e: any) => {
        result.push({
          code: JSON.parse(e.value).code,
          name: JSON.parse(e.value).name,
        });
      });
      return result;
    }
  };

  const getDeliveryTerm = (deliveryTerms: any) => {
    console.log(deliveryTerms);
    const result: any[] = [];
    deliveryTerms?.map((e: any) => {
      result.push(JSON.parse(e));
    });
    return result;
  };

  const getCertifications = (data: any) => {
    const result: any[] = [];
    data.map((e: any) => {
      result.push(JSON.parse(e));
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

  const saveRFQ = (values: any, arr: any) => {
    const productCategorys = {
      level: 3,
      name: JSON.parse(values.productCategory).name,
      code: JSON.parse(values.productCategory).code,
      avatar: JSON.parse(values.productCategory).avatar,
      parent_code: getParentCode(JSON.parse(values.productCategory)),
      updated_at: moment.now(),
      created_at: moment.now(),
    };

    const attribute = atributeSelected;
    const sourceCountry = getSourcingCountry();
    let expectedOrderQuantity = {
      tentative_purchasing_volume: {
        quantity: values.tentativePurchasingVolume,
        unit: JSON.parse(values.tentativePurchasingVolumeUnit).name,
        nonnegotiable: nVolume,
      },
    } as any;

    trialOrderAgree == "1"
      ? (expectedOrderQuantity = {
          ...expectedOrderQuantity,
          trial_order: {
            agree: trialOrderAgree,
            quantity: values.trialOrder,
            unit: JSON.parse(values.trialOrderUnit)?.name,
            nonnegotiable: nTrialOrder,
          },
        })
      : (expectedOrderQuantity = expectedOrderQuantity);

    const requirements = {
      package_type: {
        description: values.packagingType,
        nonnegotiable: nPackageType,
      },
    };

    const logisticTerms = {
      delivery_term: {
        term: getDeliveryTerm(values.deliveryTerms),
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
      type: values.paymentTerms?.map((e: any) => JSON.parse(e)),
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
      attachment: arr,
    };

    const requiredCertifications = {
      cerification: getCertifications(values.requiredCertifications),
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
    postRequest("/rfq/create", payload)
      .then((data: any) => {
        if (data.message == "Create successfully") {
          toast({
            variant: "success",
            title: "Success",
            description: data.message,
            action: <ToastAction altText="Try again">Done</ToastAction>,
          });
        } else {
          toast({
            variant: "destructive",
            title: "FAIL!",
            description: "Upload attachment some waring wenrong!",
            action: <ToastAction altText="Try again">Again</ToastAction>,
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "FAIL!",
          description: err.response.data,
          action: <ToastAction altText="Try again">Again</ToastAction>,
        });
      })
      .finally(() => setLCreateRFQ(false));
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (agree == 0) {
      toast({
        variant: "destructive",
        title: "FAIL!",
        description: "You need to agree to plolyticy to be able to create rfq!",
        action: <ToastAction altText="Try again">Again</ToastAction>,
      });
    } else {
      setLCreateRFQ(true);
      getRequest("/user/check-full-info").then((res: any) => {
        if (res.is_full_info == 1) {
          if (galleries) {
            const formData = new FormData();
            galleries.forEach((image: any, index: any) => {
              formData.append(`file[${index}]`, image);
            });
            postRequestWithFormData("/file/upload-file-2", formData).then(
              (res: any) => {
                if (res.code == 200) {
                  const arr = res.data.map((e: any) => {
                    return e.file_name;
                  });
                  console.log(arr);
                  saveRFQ(values, arr);
                } else {
                  toast({
                    variant: "destructive",
                    title: "FAIL!",
                    description: "Upload attachment some waring wenrong!",
                    action: (
                      <ToastAction altText="Try again">Again</ToastAction>
                    ),
                  });
                }
              }
            );
          } else {
            saveRFQ(values, null);
          }
        } else {
          toast({
            variant: "warning",
            title: "Warning!",
            description:
              "You need to fill full contact and company information then save first",
            action: <ToastAction altText="Try again">Again</ToastAction>,
          });
          setLCreateRFQ(false);
        }
      });
    }
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

      props.loading(false);
    })();
  }, []);

  const removeDuplicates = (arr: any) => {
    const uniqueMap: { [key: string]: any } = {};

    arr.forEach((item: any) => {
      uniqueMap[JSON.stringify(item)] = item;
    });

    return Object.values(uniqueMap);
  };

  const formSchema = z.object({
    productName: z.string().min(1, "Required"),
    productCategory: z.string().min(1, "Required"),
    sourcingCountries: z
      .array(z.string())
      .refine((e) => e.length > 0 || sourcingCountriesType == "1", {
        message: "Required",
      }),
    tentativePurchasingVolume: z.string().min(1, "Required"),
    tentativePurchasingVolumeUnit: z.string().min(1, "Required"),
    trialOrder: z.string().refine((e) => trialOrderAgree == "0" || e != "", {
      message: "Required",
    }),
    trialOrderUnit: z
      .string()
      .refine((e) => trialOrderAgree == "0" || e != "", {
        message: "Required",
      }),
    packagingType: z.string().min(1, "Required"),
    requiredCertifications: z.array(z.string()).min(1, "Required"),
    deliveryTerms: z.array(z.string()).min(1, "Required"),
    portOfDestination: z.string().min(1, "Required"),
    targetShipmentDate: z.string(),
    paymentTerms: z.array(z.string()).min(1, "Required"),
    detailedPaymentTerms: z.string(),
    paymentMade: z.string(),
    reasonRequest: z.string(),
    intendedUsage: z.string(),
    additionalDetails: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourcingCountries: [],
      trialOrder: "",
      trialOrderUnit: "",
      targetShipmentDate: "",
      paymentMade: "",
      reasonRequest: "",
      intendedUsage: "",
      additionalDetails: "",
      detailedPaymentTerms: "",
    },
  });

  const getAtribute = (e: any) => {
    getRequest("/product/attribute/" + JSON.parse(e).code).then((data: any) => {
      setAttribute(Object.values(data.data));
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <span className="text-3xl font-[900]">Request Details</span>
          {/* Product & Specifications */}
          <span className="text-2xl font-bold">Product & Specifications</span>
          <div className="border border-gray-200 p-8 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-lg font-semibold">
                      Product name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter product name"
                        type="text"
                        {...field}
                        className=" !h-[3.4rem] text-[#000000] !text-xl !font-sans"
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
                      Product category <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(e: any) => {
                        getAtribute(e);
                        field.onChange(e);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className=" !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                        <SelectValue placeholder="Search and select product category" />
                      </SelectTrigger>
                      <SelectContent className=" text-[#000000] text-xl">
                        {productMap?.map((category: any, index: any) => (
                          <SelectItem
                            key={category.code + "*" + index}
                            value={JSON.stringify(category)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-4 gap-3">
                      {attribute &&
                        Object.keys(attribute)?.map((value: any, idx: any) => {
                          return (
                            <div key={idx}>
                              <div key={idx} className="font-bold py-2">
                                {attribute[value][0]?.label}
                              </div>
                              <div className="flex flex-col gap-2">
                                {attribute[value].map(
                                  (item: any, index: any) => (
                                    <div
                                      className="flex items-center gap-2"
                                      key={index}
                                    >
                                      <Checkbox
                                        className=""
                                        id={item._id}
                                        value={item.value}
                                        onCheckedChange={(e) => {
                                          if (e) {
                                            setAtributeSelected((prev: any) => [
                                              ...prev,
                                              item,
                                            ]);
                                          } else {
                                            let detail_ =
                                              atributeSelected.filter(
                                                (d: any) => d._id !== item?._id
                                              );
                                            setAtributeSelected(detail_);
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor={item.value}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        {item.value}
                                      </label>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
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
                    onClick={() => {
                      setSourcingCountriesType("1");
                    }}
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
                  <Checkbox className=" h-6 w-6" value="4" />
                  <span className="text-xl">Nonnegotiable</span>
                </div>
              </RadioGroup>
              {sourcingCountriesType !== "1" ? (
                <FormField
                  control={form.control}
                  name="sourcingCountries"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel className="text-lg font-semibold">
                          Preferred Sourcing Countries{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <MultiSelect
                            ref={field.ref}
                            options={country}
                            isMulti
                            onChange={(e: any) =>
                              field.onChange(e.map((e: any) => e.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              ) : (
                ""
              )}
            </div>

            {/* Expected Order Quantity */}
            <span className="text-2xl font-bold">Expected Order Quantity</span>
            <div className="w-full flex flex-col !gap-2">
              <span className="text-lg font-semibold">
                Tentative Purchasing Volume{" "}
                <span className="text-red-500">*</span>
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
                            placeholder="10,000"
                            type="number"
                            {...field}
                            className=" !h-[3.4rem] text-[#000000] !text-xl !font-sans"
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
                            <SelectTrigger className=" !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                              <SelectValue placeholder="-- Select Unit --" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className=" text-[#000000] text-xl">
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
              <span className="text-lg font-semibold">
                Do you plan to have trial orders?
              </span>
              <RadioGroup defaultValue="0">
                <FormItem className="flex gap-16 w-full items-center">
                  <div className="flex gap-2 items-center">
                    <RadioGroupItem
                      value="1"
                      className="w-6 h-6"
                      onClick={() => setTrialOrderAgree("1")}
                    />
                    <span className="text-xl">Yes</span>
                  </div>

                  <div className="flex gap-2 !m-0 items-center">
                    <RadioGroupItem
                      value="0"
                      className="w-6 h-6"
                      onClick={() => {
                        form.resetField("trialOrder")
                        form.resetField("trialOrderUnit")
                        setTrialOrderAgree("0");
                      }}
                    />
                    <span className="text-xl">No</span>
                  </div>
                </FormItem>
              </RadioGroup>
              {trialOrderAgree == "1" ? (
                <div className="w-full flex gap-2">
                  <FormField
                    control={form.control}
                    name="trialOrder"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-3/4">
                          <FormControl>
                            <Input
                              placeholder="10,000"
                              type="number"
                              {...field}
                              className=" !h-[3.4rem] text-[#000000] !text-xl !font-sans"
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
                              <SelectTrigger className=" !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                                <SelectValue placeholder="-- Select Unit --" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className=" text-[#000000] text-xl">
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
              ) : (
                ""
              )}
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

            <span className="text-2xl font-bold">Requirements</span>
            <FormField
              control={form.control}
              name="packagingType"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="text-lg font-semibold">
                      Packaging Types <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Specify preferred packaging types"
                        {...field}
                        className=" !h-36 text-[#000000] !text-xl !font-sans"
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
              name="requiredCertifications"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-lg">
                      Required Certifications{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        ref={field.ref}
                        options={certifications?.map((e: any) => ({
                          label: e.name,
                          value: JSON.stringify(e),
                        }))}
                        isMulti
                        onChange={(e: any) =>
                          field.onChange(e.map((e: any) => e.value))
                        }
                      />
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

            <span className="text-2xl font-bold">Logistic Terms</span>
            <FormField
              control={form.control}
              name="deliveryTerms"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-lg">
                      Delivery terms <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        ref={field.ref}
                        options={deliveryTerms?.map((e: any) => ({
                          label: e.name,
                          value: JSON.stringify(e),
                        }))}
                        isMulti
                        onChange={(e: any) =>
                          field.onChange(e.map((e: any) => e.value))
                        }
                      />
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

            <FormField
              control={form.control}
              name="portOfDestination"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-lg">
                      Port of Destination{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className=" !h-[3.4rem] text-[#000000] !text-xl !font-sans"
                          ref={field.ref}
                        >
                          <SelectValue placeholder="-Select Country-" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className=" text-[#000000] text-xl">
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
                            "w-full  !h-[3.4rem] text-[#000000] !text-xl !font-sans justify-start text-left font-normal",
                            !targetShipmentDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {targetShipmentDate ? (
                            moment(
                              targetShipmentDate,
                              "ddd MMM DD YYYY HH:mm:ss"
                            ).format("YYYY-MM-DD")
                          ) : (
                            <span>-Select Date-</span>
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

            <span className="text-2xl font-bold">Payment Terms</span>
            <FormField
              control={form.control}
              name="paymentTerms"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-lg">
                      Payment Terms <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        ref={field.ref}
                        options={paymentTerms?.map((e: any) => ({
                          label: e.name,
                          value: JSON.stringify(e),
                        }))}
                        isMulti
                        onChange={(e: any) =>
                          field.onChange(e.map((e: any) => e.value))
                        }
                      />
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
                        className=" !h-[3.4rem] text-[#000000] !text-xl !font-sans"
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
                        placeholder="Specify Whom"
                        type="text"
                        {...field}
                        className=" !h-[3.4rem] text-[#000000] !text-xl !font-sans"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>

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
                        className=" !h-36 text-[#000000] !text-xl !font-sans"
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
                        className=" !h-36 text-[#000000] !text-xl !font-sans"
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
                        className=" !h-36 text-[#000000] !text-xl !font-sans"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold">Attachments</span>
              <div className="flex flex-col gap-2 relative">
                <DragDropPhoto
                  img={galleries}
                  setImg={setGalleries}
                  multiple={true}
                  key="other"
                  className="rounded-lg"
                />
                {!!galleries && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7 absolute top-6 right-1 text-red-500 cursor-pointer"
                    onClick={() => setGalleries(null)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                      clipRule="evenodd"
                    />
                  </svg>
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
                Tridge to share my personal information that I voluntarily
                provide to Tridge with third parties for the purpose of
                providing services such as offering products and services;
                sending information about potential business opportunities,
                products, or services; or disclosing contact information for
                communication with visitors or participants to Social
                Marketplace and Tridge’s partners.
              </span>
            </div>
          </div>
          <Button className="w-full h-14 text-xl" type="submit">
            {lCreateRFQ ? (
              <Loader2 className=" w-4 animate-spin mr-2 h-full" />
            ) : (
              <span>Submit RFQ</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateRFQ;
