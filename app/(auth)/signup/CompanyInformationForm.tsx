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
import { Checkbox } from "@/components/ui/checkbox";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const CompanyInformationForm = () => {
  const formSchema = z.object({
    companyName: z.string().min(1),
    location: z.string(),
    companyWebsite: z.string().min(1),
    annualSalesRevenue: z.string(),
    numberOfEmployees: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      location: "",
      companyWebsite: "",
      annualSalesRevenue: "",
      numberOfEmployees: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="!w-ful flex flex-col gap-12"
      >
        <div className="flex flex-col gap-2 w-1/2">
          <span className="text-4xl font-black">
            Create your company profile
          </span>
          <span className="text-lg">
            Please note that your company details will be used to verify your
            account.
          </span>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-8 w-[40%]">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col gap-3 w-full">
                    <FormLabel className="text-xl font-bold">
                      Company Name*
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
              name="location"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col gap-3 w-full">
                    <FormLabel className="font-bold text-xl">
                      Location
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border border-black h-16">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        <SelectItem value="Việt Nam">Việt Nam</SelectItem>
                        <SelectItem value="Việt Nam 1">Việt Nam 1</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col gap-3 w-full">
                    <FormLabel className="font-bold text-xl">
                      Company Website*
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="border border-black h-16">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border border-black">
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="Website1">Website1</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="flex flex-col gap-8 w-[60%]">
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-bold">Business type*</span>
              <div className="flex gap-4">
                <div className="w-[45%] flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">
                      Farming / Production / Processing / Packing
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Non-food manufacturing</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Retail</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16]">HORECA</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16]">Government</span>
                  </div>
                </div>
                <div className="w-[30%] flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Food manufacturing</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">
                      Distribution / Wholesale
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Trade</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Logistics</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Academic</span>
                  </div>
                </div>

                <div className="w-[25%] flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Agtech</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Consulting</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Financial</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Market Research</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox className="w-5 h-5" />
                    <span className="text-[16px]">Others</span>
                  </div>
                </div>
              </div>
              <span className="text-xl">
                Please check all relevant business types.
              </span>
              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="annualSalesRevenue"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-[9px] w-1/2">
                        <FormLabel className="font-bold text-xl">
                          Annual Sales Revenue (USD)
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border border-black h-16">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            <SelectItem value="annualSalesRevenue">
                              annualSalesRevenue
                            </SelectItem>
                            <SelectItem value="annualSalesRevenue1">
                              annualSalesRevenue1
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="numberOfEmployees"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col gap-[9px] w-1/2">
                        <FormLabel className="font-bold text-xl">
                          Number of employees
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="border border-black h-16">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="border border-black">
                            <SelectItem value="numberOfEmployees">
                              numberOfEmployees
                            </SelectItem>
                            <SelectItem value="numberOfEmployees1">
                              numberOfEmployees1
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
          </div>
        </div>

        <div className="flex justify-end">
          <TabsList className="!p-0 !m-0 !w-1/4  bg-white border-0">
            <TabsTrigger value={form.formState.isDirty ? "profileInformation":"companyInformation"} className="!w-full !p-0">
              <Button className="!w-full h-16" type="submit">
                Continue
              </Button>
            </TabsTrigger>
          </TabsList>
        </div>
      </form>
    </Form>
  );
};

export default CompanyInformationForm;
