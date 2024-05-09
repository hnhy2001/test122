import SendMessage from "@/components/SendMessage";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SupplierItem = ({ pd, country }: any) => {
  console.log(pd)
  return (
    <div className="flex flex-col gap-4 shadow-sm rounded-lg p-2">
      <Link
        target="_blank"
        href={
          "/supplier/" +
          pd.supplier_name.split(" ").join("-") +
          "-i." +
          pd.supplier_code
        }
        className="flex flex-col gap-2"
      >
        <Image
          src={pd.supplier_avatar}
          alt={pd.name}
          width={266}
          height={266}
          className="aspect-video w-full object-cover"
        />
        <div className="flex gap-3 justify-between">
          <div>
            <div className="flex gap-2 items-center">
              <p className="font-bold text-[#081440] text-xl">{pd.supplier_name}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-blue-600"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>

            </div>
            <div className="flex gap-2 items-center">
              <Image
                src={country?.image}
                alt="flag"
                width={21}
                height={18}
                className="w-6 h-5"
              />
              <p className="font-bold text-xs">{country?.name}</p>

            </div>
          </div>
          <Image
            src={pd.supplier_avatar}
            alt={pd.supplier_name}
            width={40}
            height={40}
            className="aspect-square w-10 h-10 object-cover"
          />
        </div>
        <p className="font-[650] text-[0.95rem] text-base text-gray-700 line-clamp-2 min-h-[3rem]">
          {pd?.supplier_summary}
        </p>
      </Link>
      <Link
        className="flex gap-6 items-center justify-between p-1 ring-[1px] ring-gray-300 rounded-md"
        href={"/product/" + pd.name.split(" ").join("-") + "-i." + pd.code}
      >
        <div className="flex gap-3 items-center">
          <Image
            src={pd.avatar}
            alt={pd.name}
            width={56}
            height={56}
            className="w-10 h-10 aspect-square object-cover"
          />
          <p className="text-base font-semibold break-all line-clamp-1">{pd.name}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>

      <div className="flex gap-2 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Contact now</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[80%] md:max-w-[30%] max-h-[70vh] p-0 scroll-auto">
            <div className="max-h-[70vh] flex flex-col py-10 p-10">
              <p className="text-xl font-bold ">Choose a Representative</p>
              <p className="text-xl py-4 ">
                Choose a representative to contact.
              </p>
              <div className="py-6 flex-1 h-full overflow-auto flex flex-col gap-8">
                {pd?.representative &&
                  pd?.representative.map((re: any, index: any) => (
                    <div className="flex flex-col gap-3" key={index}>
                      <div className="flex gap-3 justify-between items-center">
                        <div className="flex gap-5 items-center">
                          <Image
                            src={re.avatar}
                            alt="flag"
                            width={64}
                            height={64}
                            className="w-16 h-16"
                          />
                          <div>
                            <p className="font-bold text-[#081440]">
                              {re.last_name}
                            </p>
                            <p className="font-bold text-[#908E8E]">
                              Export Manager
                            </p>
                          </div>
                        </div>
                        <Checkbox />
                      </div>
                      <p>
                        Hi! I'm {re.last_name}. Send me your business card if
                        you are interested in a collaboration and I will reach
                        out to you!
                      </p>
                      {/* <div className="flex gap-1 items-center">
                        {[1, 2, 3, 4, 5].map((_, index: any) => (
                          <Image
                            key={index}
                            src={"/555.png"}
                            alt="555"
                            width={40}
                            height={40}
                            className="w-10 h-10"
                          />
                        ))}
                        <p>+30</p>
                      </div> */}
                      {/* <p className="flex gap-1 items-center">
                        View products
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </p> */}
                    </div>
                  ))}
              </div>
              <div className="flex gap-1 justify-end pt-8">
                {/* <Button variant={"outline"}>Book a Meeting</Button> */}
                <SendMessage />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* <Image src={'/folder.png'} width={24} height={24} className='h-6 w-6' alt='folder' /> */}
      </div>
    </div>
  );
};

export default SupplierItem;
