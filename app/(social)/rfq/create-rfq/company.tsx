"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { IUserProfile } from "@/type/user-profile.interface";
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
import { Button } from "@/components/ui/button";
import { postRequest } from "@/hook/apiClient";
import { useToast } from "@/components/ui/use-toast";

const CompanyInformation = ({
  infoUser,
  country,
  company,
  bussiness,
}: {
  infoUser: IUserProfile;
  country: any[];
  company: any;
  bussiness: any[]
}) => {
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();
  const startYear = 1949;
  const [listYear, setListYear] = useState([] as any[])
  const [listNumber, setListNumber] = useState(["101", "102"]);
  const formSchema = z.object({
    name: z.string().min(1, "Please type Company Name"),
    type: z.string(),
    location: z.string(),
    website: z.string(),
    revenue: z.string(),
    number_members: z.any(),
    address: z.string(),
    description: z.string(),
    year_established: z.string()
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company.name ? company.name : "",
      type: company.type.code ? company.type.code : "",
      location: company.location ? company.location.code : "",
      website: company.website ? company.website : "",
      revenue: company.revenue ? Number(company.revenue).toString() : "0",
      address: company.address ? company.address : "",
      description: company.description ? company.description : "",
      number_members: company.number_members
        ? Number(company.number_members).toString()
        : "0",
      year_established: company.year_established ? company.year_established : ""
    },
  });
  const handleSubmit = (values: any) => {
    console.log("values :>> ", values);
    const payload = {
      ...values,
      location: {
        code: values.location,
      },
      type: {
        code: values.type
      }
    };
    postRequest("/user/company-update", payload).then((res: any) => {
      if (res.code == 200) {
        toast({
          title: "Success",
          description: "Update Company Infomation Successfully",
        });
      }
    });
  };
  const getListYear = () => {
    let list: any[] = []
    for (let i = currentYear; i >= startYear; i--) {
      list.push(i)
    }
    setListYear(list)
  }
  useEffect(() => {
    getListYear()
  }, []);
  return (
    <Form {...form}>
      {/* <form onSubmit={form.handleSubmit(handleSubmit)}> */}
      <Accordion type="single" collapsible className="mb-4">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="border-primary text-2xl font-[600] !py-0">
            Company Information
          </AccordionTrigger>
          <AccordionContent className="pt-2 flex flex-col gap-4">
            <div>
              Editing these will also update your company information in your
              settings
            </div>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base text-neutral-400">
                        Company Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Company Name"
                          type="text"
                          {...field}
                          className="border-black border"
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base">Business Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="-Select Bussiness Type-" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {bussiness.map((item: any) => (
                              <SelectItem key={item.code} value={item.code}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <div>{company.type.name}</div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base text-neutral-400">
                        Company Country *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Company Country"
                              defaultValue={company.location.code}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {country.length &&
                            country.map((item: any) => (
                              <SelectItem key={item.code} value={item.code}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="year_established"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base">
                        Year Established
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="-Select Year-" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listYear.map((item: any) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div>{company.type.name}</div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="number_members"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base">
                        Number of Employees
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="-Select Number of Employees-" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {listNumber.map((item: any) => (
                            <SelectItem key={item} value={item.toString()}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="revenue"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base">
                        Annual Sales Revenue
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="-Select Annual Sales Revenue-" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="21">21</SelectItem>
                          <SelectItem value="22">22</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base">
                        Company Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter company website URL"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <RadioGroup>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="" id="r1" />
                          <Label htmlFor="r1">My company has no website.</Label>
                        </div>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base">
                        Company Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter company address"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base">
                        Company Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="border-black border-[1px] w-full"
                          placeholder="Enter company description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        className="h-[42px] bg-primary text-white font-bold leading-[20px] w-full rounded-[6px]"
        type="submit"
        onClick={() => handleSubmit(form.getValues())}
      >
        Save
      </Button>
      {/* </form> */}
    </Form>
  );
};
export default CompanyInformation;
