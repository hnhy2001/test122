"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns"
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRequest, postRequest } from "@/hook/apiClient";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { ToastAction } from "@/components/ui/toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  price: z.string(),
  priceUnit: z.string(),
  total: z.string(),
  totalUnit: z.string(),
  country: z.string(),
  delivery: z.string(),
  fromDelivery: z.date(),
  toDelivery: z.date(),
});

const SubmitQuote = (props: any) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [openCofirm, setOpenCofirm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState<any>([]);
  const route = useRouter();
  const [user, setUser] = useState<any>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  useEffect(() => {
    if (open) {
      getRequest("/config/countries").then((data: any) =>
        setCountries(data?.data)
      );
      getRequest("/config/product_unit").then((data: any) =>
        setUnits(data.data)
      );
    }
  }, [open]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData(values);
    if (!form.formState.isDirty && open) {
      setOpenCofirm(true);
    }
  }

  const onSubmitQuote = () => {
    setLoading(true);
    postRequest("/rfq/submit-quote", {
      offer_price: formData.price,
      unit_price: {
        code: formData.priceUnit.split("-")[0],
        name: formData.priceUnit.split("-")[1],
      },
      origin_country: {
        code: formData.country.split("-")[0],
        name: formData.country.split("-")[1],
      },
      delivery_method: formData.delivery,
      estimated_delivery_date_from: format(formData.fromDelivery, 'yyyy-MM-dd') ,
      estimated_delivery_date_to: format(formData.toDelivery, 'yyyy-MM-dd'),
      rfq_code: props.code,
      total_amount: formData.total,
      unit_total: {
        code: formData.totalUnit.split("-")[0],
        name: formData.totalUnit.split("-")[1],
      },
    })
      .then((data) => {
        if (data) {
          handleCancel();
          toast({
            title: "Submit Quote Suscces",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Submit Quote Error",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Submit Quote Error",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      })
      .finally(() => {
        if (props.reload) {
          route.refresh();
        }
        setLoading(false);
        setOpenCofirm(false);
        setOpen(false);
      });
  };

  const handleCancel = () => {
    setOpenCofirm(false);
    setOpen(false);
    form.reset({
      country: "",
      delivery: "",
      price: "",
      priceUnit: "",
      total: "",
      totalUnit: "",
      fromDelivery: undefined,
      toDelivery: undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => {
          getSession()
            .then(session => {
              if (session?.user) {
                setUser(session?.user)
                setOpen(true)
              }
              else {
                toast({
                  variant: "warning",
                  title: "Warning!",
                  description: "Please Login",
                  action: <ToastAction altText="Try again">Done</ToastAction>,
                });
                route.push('/signin')
              }
            })
        }}
      >
        Submit Quote
      </Button>
      <DialogContent className="!max-w-[80%] xl:!max-w-[30%] p-0">
        {user?.role == "BUYER" ? (
          <div className="p-6">
            <p className="text-xl font-bold">Submit Quote</p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-col xl:flex-row gap-2 w-full xl:items-end">
                  <div className="xl:w-4/5">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Suggested Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              placeholder="10000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="xl:w-1/5">
                    <FormField
                      control={form.control}
                      name="priceUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Price Unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value={"USD-America"}>
                                    USD
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col xl:flex-row gap-2 w-full xl:items-end">
                  <div className="xl:w-4/5">
                    <FormField
                      control={form.control}
                      name="total"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Amount</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              placeholder="10000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="xl:w-1/5">
                    <FormField
                      control={form.control}
                      name="totalUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Total Unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {units.map((unit: any) => (
                                  <SelectItem
                                    key={unit.code}
                                    value={unit.code + "-" + unit.name}
                                  >
                                    {unit.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Country</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {countries.map((country: any) => (
                                <SelectItem
                                  key={country.dial_code + "-" + country.name}
                                  value={country.dial_code + "-" + country.name}
                                >
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="delivery"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Method</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Delivery method"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col xl:flex-row gap-3 items-end">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="fromDelivery"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimate Delivery Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal h-14 text-lg",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "yyyy MM dd")
                                  ) : (
                                    <span>From</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date: any) =>
                                  date < new Date()
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="toDelivery"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimate Delivery Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal h-14 text-lg",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "yyyy MM dd")
                                  ) : (
                                    <span>To</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date: any) =>
                                  date < form.getValues('fromDelivery')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-4">
                  <Dialog open={openCofirm}>
                    <DialogTrigger asChild>
                      <Button type="submit">Confirm</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="flex gap-3 items-center">
                        <Image
                          src={"/alert.png"}
                          alt="alert"
                          width={64}
                          height={64}
                          className="w-16 h-16 object-contain"
                        />
                        <div>
                          <p>
                            You are sure of the information you entered and want
                            a quote
                          </p>
                          <div className="flex gap-3">
                            <DialogClose>
                              <Button
                                onClick={() => setOpenCofirm(false)}
                                variant={"outline"}
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            {loading ? (
                              <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                              </Button>
                            ) : (
                              <Button onClick={() => onSubmitQuote()}>
                                Confirm
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <DialogClose>
                    <Button onClick={handleCancel} variant={"outline"}>
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div className="flex gap-4 items-center justify-between p-4">
            <Image
              src={"/alert.png"}
              alt="alert"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
            <div>
              <p className='font-semibold'>You need to switch to buyer</p>
            </div>
            <div className="flex items-start h-full">
              <DialogClose><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>

              </DialogClose>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubmitQuote;
