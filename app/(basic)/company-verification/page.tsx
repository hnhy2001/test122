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
import Company from './comany'

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
      <div className="grid lg:grid-cols-4 gap-10">
        <PersonalDetail />
        <div className="col-span-3 lg:px-20 py-2.5">
          <Company />
        </div>
      </div>
    </div>
  );
}

export default Page