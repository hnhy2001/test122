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

const SetupProfileForm = () => {
  const formSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    countryOfResidence: z.string(),
    departmentRole: z.string(),
    jobLevel: z.string().min(1),
    type: z.enum(["1", "2", "3"]),
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
    console.log({ values });
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
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border border-black h-16">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            <SelectItem value="countryOfResidence">
                              Country of residence
                            </SelectItem>
                            <SelectItem value="countryOfResidence 1">
                              Country of residence 1
                            </SelectItem>
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
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border border-black h-16">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            <SelectItem value="Department role">
                              Department role
                            </SelectItem>
                            <SelectItem value="Department role 1">
                              Department role 1
                            </SelectItem>
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
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border border-black h-16">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            <SelectItem value="Job level*">
                              Job level
                            </SelectItem>
                            <SelectItem value="Job level 1">
                              Job level 1
                            </SelectItem>
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
                          <RadioGroup onValueChange={field.onChange}>
                            <FormItem  className="flex flex-col gap-2 w-full">
                              <div className="flex px-2 items-center justify-between border-black border h-16 rounded-lg gap-16">
                                <span className="text-lg">
                                  Sourcing and purchasing the best quality of
                                  agri products
                                </span>
                                <RadioGroupItem value="1" className="w-6 h-6"/>
                              </div>

                              <div className="flex px-2 items-center justify-between border-black border h-16 rounded-lg gap-16">
                                <span className="text-lg">
                                  Selling and marketing agri products and
                                  services
                                </span>
                                <RadioGroupItem value="2" className="w-6 h-6"/>
                              </div>

                              <div className="flex px-2 items-center justify-between border-black border h-16 rounded-lg gap-16">
                                <span className="text-lg">
                                  Conducting academic research in agriculture,
                                  including all non-trading activities
                                </span>
                                <RadioGroupItem value="3" className="w-6 h-6"/>
                              </div>
                            </FormItem >
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
            <TabsList className="!p-0 !m-0 !w-[15%]  bg-white border-0">
              <TabsTrigger value="companyInformation" className="!w-full !p-0">
                <Button
                  className="!w-full h-16 border-2 border-black"
                  variant="outline"
                >
                  Back
                </Button>
              </TabsTrigger>
            </TabsList>

            <TabsList className="!p-0 !m-0 !w-[15%]  bg-white border-0">
              <TabsTrigger
                value={
                  form.formState.isDirty
                    ? "emailVerification"
                    : "selectProduct"
                }
                className="!w-full !p-0"
              >
                <Button className="!w-full h-16" type="submit">
                  Continue
                </Button>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SetupProfileForm;
