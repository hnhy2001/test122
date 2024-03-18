import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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

export const metadata: Metadata = {
  title: "Company verification",
  robots: {
    index: false,
    follow: true,
  },
}

const Page = () => {
  const listSocial = [
    {
      src: "linkedIn.svg",
      isLink: false,
      content: "",
    },
    {
      src: "google.svg",
      isLink: true,
      content: "Minion Tuan",
    },
    {
      src: "facebook.svg",
      isLink: false,
      content: "",
    },
  ]
  return (
    <div className="container text-primary">
      <PersonalTab key="company-verification"></PersonalTab>
      <div className="flex">
        <div className="flex flex-col justify-center items-center gap-[8px] py-[16px] px-[32px]">
          <div className="flex flex-col justify-center items-center gap-[8px]">
            <div className="text-primary text-[32px] font-bold leading-[36px]">
              Personal details
            </div>
            <div className="relative">
              <Avatar
                style={{ width: "188.06px", height: "188.06px" }}
                className="border-primary border-4"
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
              <div className="rounded-full w-40px h-40px flex justify-center items-center border-[3px] border-primary absolute right-[3px] bottom-[12px] bg-white cursor-pointer">
                <Image
                  src={"/images/plan/pen.svg"}
                  alt=""
                  width={25}
                  height={25}
                ></Image>
              </div>
            </div>
            <div className="text-primary text-[48px] font-bold leading-11">
              Tom Invi
            </div>
            <div className="text-[24px] leading-[36px]">
              tomnguyen3006@gmail.com
            </div>
            <div className="flex items-center gap-[8px]">
              <div className="text-[24px] leading-[36px]">Laodiha</div>
              <Badge className="!rounded-sm !bg-primary">Unverified</Badge>
            </div>
          </div>
          <div className="w-4/5 h-[2px] bg-primary"></div>
          <div className="flex flex-col justify-center items-center gap-[8px]">
            <div className="text-[24px] leading-[36px] font-bold">
              Role Setting
            </div>
            <div className="text-[16px] leading-[24px]">
              You are using Tridge as a
            </div>
            <div className="flex items-center gap-[8px]">
              <Badge className="!rounded-sm !bg-primary text-[20px] !px-[28px]">
                Suplier
              </Badge>
              <div className="text-[16px] flex items-center gap-[4px] cursor-pointer hover:text-blue-900 transition">
                <Image
                  src={"/images/plan/switch.svg"}
                  alt=""
                  width={21}
                  height={21}
                ></Image>
                <div>Switch role</div>
              </div>
            </div>
            <div className="text-[16px] leading-[24px]">
              Your current plan is
            </div>
            <div className="text-[24px] leading-[36px] font-medium">
              Basic Plan
            </div>
          </div>
          <div className="w-4/5 h-[2px] bg-primary"></div>
          <div className="flex flex-col justify-center items-center gap-[8px] w-full">
            <div className="text-[24px] leading-[36px] font-bold">
              Linked Accounts
            </div>
            <div className="w-full gap-[16px] flex flex-col">
              {listSocial.map((item, index) => (
                <Card key={item.src} className="w-full">
                  <CardContent className="flex items-center justify-between p-3 w-full">
                    <div className="flex gap-[8px] items-center">
                      <Image
                        src={"/images/plan/" + item.src}
                        alt=""
                        width={38}
                        height={38}
                      ></Image>
                      <div>{item.content}</div>
                    </div>
                    {item.isLink ? (
                      <Button
                        className="text-[16px] !px-[28px]"
                        variant="destructive"
                      >
                        Unlink
                      </Button>
                    ) : (
                      <Button
                        className="text-[16px] !px-[28px]"
                      >
                        Link
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="px-[72px] py-[16px] flex flex-col gap-[16px] text-black">
          <div className='flex flex-col gap-[16px]'>
            <div className='flex items-center gap-[8px]'>
              <div className="text-primary text-[32px] font-bold leading-[36px]">
                Company verification
              </div>
              <Badge className="!rounded-sm text-[16px] !bg-primary">Unverified</Badge>
            </div>
            <div className='text-[16px] leading-[24px]'>
              Built for trust, our full services are exclusively available to verified businesses.
            </div>
          </div>
          <div className='pt-[24px]'>
            <div className='border-l-[3px] border-primary flex items-center gap-[16px]'>
              <div className='text-[20px] leading-[32px] pl-[16px]'>Work Email</div>
              <Image src={'/images/company-verification/check.svg'} width={26} height={26} alt=''></Image>
            </div>
          </div>
          <div className='text-[16px] leading-[24px] italic text-[#939AA1]'>
            Get full advantage of Tridge services as a verified business.
          </div>
          <div>
            <button className='bg-primary text-white text-[20px] font-bold py-[10px] px-[28px] rounded-[8px]'>Verify my email</button>
          </div>
          <div className='pt-[24px]'>
            <div className='border-l-[3px] border-primary flex items-center gap-[16px]'>
              <div className='text-[20px] leading-[32px] pl-[16px]'>Business documents</div>
              <Image src={'/images/company-verification/check.svg'} width={26} height={26} alt=''></Image>
            </div>
          </div>
          <div className='text-[16px] leading-[24px] italic text-[#939AA1]'>
            Verifying your company can help your business come across as trustworthy and give agri partners confidence that your company will deliver high-quality product offerings.
          </div>
          <div className='border py-[16px] px-[32px]'>
            <ul className='list-disc'>
              <li>To ensure a smooth validation process, kindly upload the correct documents.</li>
              <li>Your submitted documents will remain confidential and will never be shared with other users.</li>
            </ul>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className='border-b-0'>
              <AccordionTrigger className='border-l-[3px] border-primary pl-[16px] text-[20px] leading-[32px] font-normal'>Is it accessible?</AccordionTrigger>
              <AccordionContent className='py-[16px]'>
                <DragDropFile/>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className='border-b-0'>
              <AccordionTrigger className='border-l-[3px] border-primary pl-[16px] text-[20px] leading-[32px] font-normal'>Name card</AccordionTrigger>
              <AccordionContent className='py-[16px]'>
                
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default Page