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

const CompanyInformation = ({
  infoUser,
  country,
  company,
  onSubmit,
}: {
  infoUser: IUserProfile;
  country: any[];
  company: any;
  onSubmit: any;
}) => {
  console.log("company :>> ", company);
  const formSchema = z.object({
    name: z.string().min(1, "Please type Company Name"),
    type: z.object({
      code: z.string(),
    }),
    location: z.object({
      code: z.string(),
      name: z.string(),
    }),
    website: z.string(),
    revenue: z.number(),
    number_members: z.number(),
    address: z.string(),
    description: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company.name ? company.name : "",
      type: {
        code: company.type.code ? company.type.code : "",
      },
      location: {
        code: company.location ? company.location.code : "",
        name: company.location ? company.location.name : "",
      },
      website: company.website ? company.website : "",
      revenue: company.revenue ? company.revenue : 0,
      address: company.address ? company.address : "",
      description: company.description ? company.description : "",
      number_members: company.number_members ? company.number_member : 0,
    },
  });
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
  };
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="border-primary text-2xl font-[600] !py-0">
          Company Information
        </AccordionTrigger>
        <AccordionContent className="pt-2 flex flex-col gap-4">
          <div>
            Editing these will also update your company information in your
            settings
          </div>
          <Form {...form} handleSubmit={() => form.handleSubmit(handleSubmit)}>
            <div>
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
              {/* <Label className="c">Company Name *</Label>
              <Input placeholder="Your Name" value={company.name} /> */}
            </div>
            <div>
              <Label className="text-base">Business Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-Select Bussiness Type-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="farming_production_processing_packing">
                      Farming / Production / Processing / Packing
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>{company.type.name}</div>
            </div>
            <div>
              <Label className="text-base">Company Country *</Label>
              <Select defaultValue={company.location.code}>
                <SelectTrigger>
                  <SelectValue
                    placeholder="Company Country"
                    defaultValue={company.location.code}
                  />
                </SelectTrigger>
                <SelectContent>
                  {country.length &&
                    country.map((item: any) => (
                      <SelectItem key={item.code} value={item.code}>
                        {item.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base">Year Established</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-Select Year-" />
                </SelectTrigger>
                <SelectContent></SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base">Number of Employees</Label>
              <Select defaultValue={company.number_members.toString()}>
                <SelectTrigger>
                  <SelectValue
                    placeholder="-Select Number of Employees-"
                    defaultValue={company.number_members.toString()}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="101">101</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base">Annual Sales Revenue</Label>
              <Select defaultValue={company.revenue.toString()}>
                <SelectTrigger>
                  <SelectValue placeholder="-Select Annual Sales Revenue-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="21">21</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-base">Company Website</Label>
              <Input
                placeholder="Enter company website URL"
                className="mb-[8px]"
                value={infoUser.company.website}
              />
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="r1" />
                  <Label htmlFor="r1">My company has no website.</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label className="text-base">Company Address</Label>
              <Input
                placeholder="Enter company address"
                value={infoUser.company.address}
              />
            </div>
            <div>
              <Label className="text-base">Company Description</Label>
              <Textarea
                className="border-black border-[1px]"
                placeholder="Enter company description"
                value={infoUser.company.description}
              />
            </div>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default CompanyInformation;
