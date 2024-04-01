"use client";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { getRequest } from "@/hook/apiClient";

const SetupProfileForm = (props: any) => {
  const [country, setCountry] = useState<any>();
  const [role, setRole] = useState<any>();
  const [jobLevel, setJobLevel] = useState<any>();
  const [thing, setThing] = useState<any>();
  useEffect(() => {
    (() => {
      getRequest("/config/countries").then((data) => setCountry(data));
      getRequest("/config/department_role").then((data) => setRole(data));
      getRequest("/config/job_level").then((data) => setJobLevel(data));
      getRequest("/config/thing_of_interest").then((data) => setThing(data));
    })();
  }, []);
  const formSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    countryOfResidence: z.string(),
    departmentRole: z.string(),
    jobLevel: z.string().min(1),
    type: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      countryOfResidence: "",
      departmentRole: "",
      jobLevel: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    props.updateParentData(values);
    props.setTab("selectProduct");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-12"
      >
        <div className="w-full flex flex-col gap-12">
          <div className="flex flex-col gap-2 w-1/2">
            <span className="text-4xl font-black">
              Set up your account information
            </span>
            <span className="text-lg">
              Please note that your company details will be used to verify your
              account.
            </span>
          </div>

          <div className="flex gap-16 w-full">
            <div className="flex flex-col gap-8 w-1/2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col gap-3 w-full">
                      <FormLabel className="text-xl font-bold">
                        First name*
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
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col gap-3 w-full">
                      <FormLabel className="text-xl font-bold">
                        Last name*
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

              <div className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="countryOfResidence"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="font-bold text-xl">
                          Country of residence
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
                            {country?.data.map((e: any) => (
                              <SelectItem value={JSON.stringify(e)}>
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

              <div className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="departmentRole"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="font-bold text-xl">
                          Department role
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
                            {role?.data.map((e: any) => (
                              <SelectItem value={JSON.stringify(e)}>
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

            <div className="flex flex-col gap-8 w-1/2">
              <div className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="jobLevel"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="font-bold text-xl">
                          Job level*
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
                            {jobLevel?.data.map((e: any) => (
                              <SelectItem value={JSON.stringify(e)}>
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

              <div className="flex flex-col gap-4 w-full">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-3 w-full">
                        <FormLabel className="text-xl font-bold">
                          I’m most interested in..*
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormItem className="flex flex-col gap-2 w-full">
                              {thing?.data.map((e: any) => (
                                <div className="flex px-2 items-center justify-between border-black border h-16 rounded-lg gap-16">
                                  <span className="text-lg">
                                    {e.description}
                                  </span>
                                  <RadioGroupItem
                                    value={JSON.stringify(e)}
                                    className="w-6 h-6"
                                  />
                                </div>
                              ))}
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                ></FormField>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button 
              className="!w-[15%] h-16 border-2 border-black"
              variant="outline"
              onClick={()=> props.setTab("companyInformation")}
            >
              Back
            </Button>

            <Button className="!w-[15%] !m-0 !p-0 h-16" type="submit">
              Continue
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SetupProfileForm;
