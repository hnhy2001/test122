"use client";
import ContactInformation from "./contact";
import CompanyInformation from "./company";
import Request from "./request";
import { IUserProfile } from "@/type/user-profile.interface";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const CreateRFQ = ({
  countries,
  company,
  bussiness,
  userProfile,
  productCategory,
  productUnit,
}: {
  countries: any[];
  company: any[];
  bussiness: any[];
  userProfile: IUserProfile;
  productCategory: any[];
  productUnit: any[]
}) => {
  const formSchema = z.object({
    product_name: z.string().min(1, "Please type Product Name"),
    product_category: z.string().min(1, "Please select Product Category"),
    source_country: z.any(),
    attribute_detail: z.any(),
    quantity: z.string(),
    unit: z.string(),
    expected_order_quantity: z.object({
      tentative_purchasing_volume: z.object({
        quantity: z.string().min(1, "Please type quantity"),
        unit: z.string().min(1, "Please select unit"),
        nonnegotiable: z.boolean(),
      }),
      trial_order: z.object({
        quantity: z.string().min(1, "Please type quantity"),
        unit: z.string().min(1, "Please select unit"),
        nonnegotiable: z.boolean(),
      }),
    }),
    requirements: z.object({
      package_type: z.object({
        description: z.string().min(1, "Please type Packaging type"),
        nonnegotiable: z.boolean(),
      }),
      required_certifications: z.object({
        cerification: z.any(),
        nonnegotiable: z.boolean(),
      }),
    }),
    logistic_terms: z.object({
      delivery_term: z.any(),
      nonnegotiable: z.boolean(),
      port_of_destination: z.object({
        country: z.string(),
        nonnegotiable: z.boolean(),
        port: z.string(),
      }),
      target_shipment_date: z.object({
        value: z.any(),
        nonnegotiable: z.boolean(),
      }),
    }),
    payment_terms: z.object({
      type: z.any(),
      nonegotiable: z.string(),
      detailed_payment_terms: z.object({
        description: z.string(),
        nonnegotiable: z.boolean(),
      }),
      payment_to_be_made_by: z.string(),
    }),
    additional_information: z.object({
      reason_for_this_request: z.string(),
      intended_usage: z.string(),
      additional_details: z.string(),
      attachment: z.string(),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      product_category: "",
      source_country: [],
      attribute_detail: "",
      quantity: "",
      unit: "",
      expected_order_quantity: {
        tentative_purchasing_volume: {
          quantity: "",
          unit: "",
          nonnegotiable: false,
        },
        trial_order: {
          quantity: "",
          unit: "",
          nonnegotiable: false,
        },
      },
      requirements: {
        package_type: {
          description: "",
          nonnegotiable: false,
        },
        required_certifications: {
          cerification: null,
          nonnegotiable: false,
        },
      },
      logistic_terms: {
        delivery_term: null,
        nonnegotiable: false,
        port_of_destination: {
          country: "",
          nonnegotiable: false,
          port: "",
        },
        target_shipment_date: {
          value: null,
          nonnegotiable: false,
        },
      },
      payment_terms: {
        type: null,
        nonegotiable: "",
        detailed_payment_terms: {
          description: "",
          nonnegotiable: false,
        },
        payment_to_be_made_by: "",
      },
      additional_information: {
        reason_for_this_request: "",
        intended_usage: "",
        additional_details: "",
        attachment: "",
      },
    },
  });
  const onSubmit = (e:any, values: any) => {
    e.preventDefault()
    console.log({ values });
    console.log("values.getValues() :>> ", values.getValues());
  };
  return (
    <div className="w-1/3 mx-auto py-8 flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="text-base">
          Your RFQ will be uploaded and visible on Social Marketplace once you
          become a verified buyer. Fill in the fields below and submit to
          proceed.
        </div>
        <div className="text-[32px] leading-[40px] font-bold">
          Create New RFQ
        </div>
        <div className="text-base">
          Relevant suppliers will be notified through email when your RFQ is
          successfully uploaded. Once uploaded, an RFQ will be valid for 30
          days.
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-bold">My Information</div>
        <div className="text-base">
          You must fill out this section to insert your request details.
        </div>
      </div>
      <div>
        <ContactInformation info={userProfile} country={countries} />
      </div>
      <div>
        <CompanyInformation
          infoUser={userProfile}
          country={countries}
          company={company}
          bussiness={bussiness}
        />
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Request
              form={form}
              country={countries}
              productCategory={productCategory}
              productUnit={productUnit}
            />
            <button
              className="h-[42px] bg-primary text-white font-bold leading-[20px] w-full rounded-[6px]"
              onClick={(e) => onSubmit(e,form)}
            >
              Submit RFQ
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default CreateRFQ;
