"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  price: z.string(),
  priceUnit: z.string(),
  total: z.string(),
  country: z.string(),
  delivery: z.string(),
  fromDelivery: z.string(),
  toDelivery: z.string(),
});

const SubmitQuote = (props: any) => {
  const { toast } = useToast();
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState<any>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  useEffect(() => {
    getRequest("/config/countries").then((data: any) =>
      setCountries(data?.data)
    );
  }, []);
  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData(values);
  }

  const onSubmitQuote = () => {
    console.log(formData);
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
      estimated_delivery_date_from: formData.fromDelivery,
      estimated_delivery_date_to: formData.toDelivery,
      rfq_code: props.code,
      total_amount: formData.total,
    })
      .then((data) => {
        console.log(data);
        if (data) {
          toast({
            title: "Submit Quote Suscces",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Submit Quote Error",
            description: "Friday, February 10, 2023 at 5:57 PM",
          });
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Submit Quote Error",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Submit Quote</Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[80%] md:!max-w-[60%] h-[70vh] p-0">
        <div className="p-6">
          <p className="text-xl font-bold">Submit Quote</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-2 w-full items-end">
                <div className="w-4/5">
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
                <div className="w-1/5">
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
                                <SelectValue placeholder="Search and select product category" />
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
                            <SelectValue placeholder="country" />
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Delivery Method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={"ship"}>Ship</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3 items-end">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="fromDelivery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimate Delivery Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="toDelivery"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="date"
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
              </div>
              <div className="flex flex-row-reverse gap-4">
                <Dialog>
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
                          You are sure of the information you entered and want a
                          quote
                        </p>
                        <div className="flex gap-3">
                          <DialogClose>
                            <Button variant={"outline"}>Cancel</Button>
                          </DialogClose>
                          <Button onClick={() => onSubmitQuote()}>
                            Confirm
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <DialogClose>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitQuote;
