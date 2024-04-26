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
import ListImage from "@/components/ListImage";
import { Avatar } from "@radix-ui/react-avatar";

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
  const [parentCode, setParentCode] = useState<any>([]);
  const [atributeSelected, setAtributeSelected] = useState<any>([]);
  const [filter, setFilter] = useState<any>();
  const [productCategory, setProductCategory] = useState<any>();
  const [paymentType, setPaymentType] = useState<any>();
  const [attachmentsLoading, setAttachmentsLoading] = useState<any>(false);
  const [attachments, setAttachments] = useState<any>(false);
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const createRFQRef = useRef<HTMLInputElement>(null);
  const [lCreateRFQ, setLCreateRFQ] = useState<any>(false);
  const [listImage, setListImage] = useState<any>([]);
  const [imageType, setImageType] = useState<any>([]);
  const [attribute, setAttribute] = useState<any>([]);

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
    setListImage([...e.target.files]);
    const newTypes = Array.from(e.target.files).map(
      (file: any) => file.type.split("/")[0]
    );
    setImageType([...newTypes]);
    [...e.target.files].forEach((image: any, index: any) => {
      formData.append(`file[${index}]`, image);
    });
    postRequestWithFormData("/file/upload-file-2", formData).then(
      (res: any) => {
        if (res.code == 200) {
          toast({
            variant: "success",
            title: "Success",
            description: "Upload attachment success",
            action: <ToastAction altText="Try again">Done</ToastAction>,
          });
          const arr = res.data.map((e: any) => {
            return e.file_name;
          });
          setAttachments(arr);
          setAttachmentsLoading(false);
        } else {
          toast({
            variant: "destructive",
            title: "FAIL!",
            description: "Upload attachment some waring wenrong!",
            action: <ToastAction altText="Try again">Again</ToastAction>,
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
    if (agree == 0) {
      toast({
        variant: "destructive",
        title: "FAIL!",
        description: "You need to agree to plolyticy to be able to create rfq!",
        action: <ToastAction altText="Try again">Again</ToastAction>,
      });
    } else if (!props.myInformationCheck) {
      toast({
        variant: "warning",
        title: "Warning!",
        description:
          "You need save data 'Contact Information' and 'Company Information' to create rfq!",
        action: <ToastAction altText="Try again">Again</ToastAction>,
      });
    } else {
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
            variant: "success",
            title: "Success",
            description: data.message,
            action: <ToastAction altText="Try again">Done</ToastAction>,
          });
          setLCreateRFQ(false);
        } else {
          toast({
            variant: "destructive",
            title: "FAIL!",
            description: "Upload attachment some waring wenrong!",
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
        console.log(data.productCategory);
        return data.productCategory.length > 1;
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
        return (
          trialOrderAgree == "0" ||
          (data.trialOrder != "" && data.trialOrderUnit != "")
        );
      },
      {
        message: "Required",
        path: ["trialOrder", "trialOrderUnit"],
      }
    )
    .refine(
      (data: any) => {
        return atributeSelected.leght();
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
      trialOrder: "",
      trialOrderUnit: "",
    },
  });

  console.log(trialOrderAgree);
  const getAtribute = (e: any) => {
    // console.log(JSON.parse(e).code);
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
                      className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
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
                  {/* <ProductCategory
                    options={productMap}
                    search={filterProductSearch}
                    // setFilter={setFilter}
                    setAtributeSelected={setAtributeSelected}
                    productCategory={setProductCategory}
                  ></ProductCategory> */}
                  <Select
                    onValueChange={(e: any) => {
                      getAtribute(e);
                      field.onChange(e);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                      <SelectValue placeholder="Search and select product category" />
                    </SelectTrigger>
                    <SelectContent className="border-[#939AA1] border text-[#000000] text-xl">
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
                              {attribute[value].map((item: any, index: any) => (
                                <div
                                  className="flex items-center gap-2"
                                  key={index}
                                >
                                  <Checkbox
                                    className="border-[#939AA1] border"
                                    id={item._id}
                                    value={item.value}
                                    onCheckedChange={(e) => {
                                      if (e) {
                                        setAtributeSelected((prev: any) => [
                                          ...prev,
                                          item,
                                        ]);
                                      } else {
                                        let detail_ = atributeSelected.filter(
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
                              ))}
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
              <div>
                <span className="text-lg font-semibold">
                  Preferred Sourcing Countries{" "}
                  <span className="text-red-500">*</span>
                </span>
                <MultiSelect
                  options={country}
                  selected={sourcingCountries}
                  onChange={setSourcingCountries}
                  placeholder={"-Select Countries-"}
                />
              </div>
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
                          className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
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
                          <SelectTrigger className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                            <SelectValue placeholder="-- Select Unit --" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-[#939AA1] border text-[#000000] text-xl">
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
                              onClick={() => setTrialOrderAgree("0")}
                            />
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
                name="trialOrder"
                render={({ field }) => {
                  return (
                    <FormItem className="w-3/4">
                      <FormControl>
                        <Input
                          placeholder="10,000"
                          type="text"
                          {...field}
                          className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
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
                          <SelectTrigger className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                            <SelectValue placeholder="-- Select Unit --" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="border-[#939AA1] border text-[#000000] text-xl">
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
                    Packaging Types <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Specify preferred packaging types"
                      {...field}
                      className="border-[#939AA1] border !h-36 text-[#000000] !text-xl !font-sans"
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
            <span className="font-semibold text-lg">
              Delivery term <span className="text-red-500">*</span>
            </span>
            <MultiSelect
              options={deliveryTerms?.map((e: any) => ({
                label: e.name,
                value: JSON.stringify(e),
              }))}
              selected={deliveryTermsSelected}
              onChange={setDeliveryTermsSelected}
              placeholder={"-Select Delivery Team-"}
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
                    Port of Destination <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                        <SelectValue placeholder="-Select Country-" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-[#939AA1] border text-[#000000] text-xl">
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
                          "w-full border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans justify-start text-left font-normal",
                          !targetShipmentDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {targetShipmentDate ? (
                          format(targetShipmentDate, "PPP")
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

          {/* Payment Terms */}
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
                      className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
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
                      className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
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
                      className="border-[#939AA1] border !h-36 text-[#000000] !text-xl !font-sans"
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
                      className="border-[#939AA1] border !h-36 text-[#000000] !text-xl !font-sans"
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
                      className="border-[#939AA1] border !h-36 text-[#000000] !text-xl !font-sans"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">Attachments</span>
            <div className="flex items-center justify-center border-separate border-[#939AA1] border w-full py-4 min-h-36 rounded-lg">
              {attachmentsLoading ? (
                <Loader2 className=" w-4 animate-spin mr-2 h-full" />
              ) : (
                <div className="flex flex-col gap-2 items-center">
                  <div
                    className="flex flex-col gap-2 items-center cursor-pointer"
                    onClick={() => uploadFileRef?.current?.click()}
                  >
                    <img
                      src="/uploadRFQ.png"
                      alt="uploadRFQ"
                      className="w-6 h-6"
                    />
                    {attachments ? (
                      <div className="!w-2/5 object-cover">
                        <ListImage
                          className="!w-3/5 object-cover h-32"
                          images={listImage.map((image: any) =>
                            URL.createObjectURL(image)
                          )}
                          types={imageType}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 items-center">
                        <span className="text-black">Add files or photos</span>
                        <span className="text-gray-500">
                          or drop files or photos upload
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    hidden
                    accept="image/*, video/*"
                    multiple
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
