import { Badge } from '@/components/ui/badge'
import PersonalDetail from '@/components/ui/personal-detail'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import DragDropFile from '@/components/ui/drag-drop-file'
import PersonalTab from '@/components/ui/personal-tab'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { IUserProfile } from '@/type/user-profile.interface'
import { getRequest } from '@/hook/api'
import VerifyEmail from './verify-email'

export const metadata: Metadata = {
  title: "Company verification",
  robots: {
    index: false,
    follow: true,
  },
}

const Page = async () => {
  return (
    <div className="container text-primary">
      <PersonalTab key="company-verification"></PersonalTab>
      <div className="flex flex-col lg:flex-row gap-10">
        <PersonalDetail />
        <div className="px-[72px] py-2.5 flex flex-col gap-[16px] text-black">
          <div className="flex flex-col gap-[16px]">
            <div className="flex items-center gap-[8px]">
              <div className="text-primary text-3xl font-bold">
                Company verification
              </div>
              <Badge className="!rounded-sm text-[16px] !bg-primary">
                Unverified
              </Badge>
            </div>
            <div className="text-[16px] leading-[24px]">
              Built for trust, our full services are exclusively available to
              verified businesses.
            </div>
          </div>
          <div className="pt-[24px]">
            <div className="border-l-[3px] border-primary flex items-center gap-[16px]">
              <div className="text-[20px] leading-[32px] pl-[16px]">
                Work Email
              </div>
              <Image
                src={"/images/company-verification/check.svg"}
                width={26}
                height={26}
                alt=""
              ></Image>
            </div>
          </div>
          <div className="text-[16px] leading-[24px] italic text-[#939AA1]">
            Get full advantage of Tridge services as a verified business.
          </div>
          <div className="w-full">
            <VerifyEmail />
          </div>
          <div className="pt-[24px]">
            <div className="border-l-[3px] border-primary flex items-center gap-[16px]">
              <div className="text-[20px] leading-[32px] pl-[16px]">
                Business documents
              </div>
              <Image
                src={"/images/company-verification/check.svg"}
                width={26}
                height={26}
                alt=""
              ></Image>
            </div>
          </div>
          <div className="text-[16px] leading-[24px] italic text-[#939AA1]">
            Verifying your company can help your business come across as
            trustworthy and give agri partners confidence that your company will
            deliver high-quality product offerings.
          </div>
          <div className="border py-[16px] px-[32px]">
            <ul className="list-disc">
              <li>
                To ensure a smooth validation process, kindly upload the correct
                documents.
              </li>
              <li>
                Your submitted documents will remain confidential and will never
                be shared with other users.
              </li>
            </ul>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="border-l-[3px] border-primary pl-[16px] text-[20px] leading-[32px] font-normal">
                Business registration certificate
              </AccordionTrigger>
              <AccordionContent className="py-[16px]">
                <DragDropFile key={1} type="bussiness" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="border-l-[3px] border-primary pl-[16px] text-[20px] leading-[32px] font-normal">
                Name card
              </AccordionTrigger>
              <AccordionContent className="py-[16px]">
                <DragDropFile key={2} type="name-card" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Page