'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

const CompanyInformation = () => {
  const [selectedBussiness, setSelectedBussiness] = useState(null)
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className='border-b-0'>
        <AccordionTrigger className='border-primary text-[24px] leading-[36px] font-[600] !py-0'>Company Information</AccordionTrigger>
        <AccordionContent className='pt-[8px] flex flex-col gap-[16px]'>
          <div>
            Editing these will also update your company information in your settings
          </div>
          <div>
            <Label className="leading-[30px]">Company Name *</Label>
            <Input placeholder="Your Name" />
          </div>
          <div>
            <Label className="leading-[30px]">Company Name *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-Select Bussiness Type-" />
              </SelectTrigger>
              <SelectContent>
              </SelectContent>
            </Select>
            <div>
              {selectedBussiness ? selectedBussiness : ''}
            </div>
          </div>
          <div>
            <Label className="leading-[30px]">Company Country *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Vietnam" />
              </SelectTrigger>
              <SelectContent>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="leading-[30px]">Year Established</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-Select Year-" />
              </SelectTrigger>
              <SelectContent>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="leading-[30px]">Number of Employees</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-Select Number of Employees-" />
              </SelectTrigger>
              <SelectContent>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="leading-[30px]">Annual Sales Revenue</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-Select Annual Sales Revenue-" />
              </SelectTrigger>
              <SelectContent>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="leading-[30px]">Company Website</Label>
            <Input placeholder="Enter company website URL" className="mb-[8px]" />
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">My company has no website.</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label className="leading-[30px]">Company Address</Label>
            <Input placeholder="Enter company address" />
          </div>
          <div>
            <Label className="leading-[30px]">Company Description</Label>
            <Textarea className="border-black border-[1px]" placeholder="Enter company description" />
          </div>
        </AccordionContent>
      </AccordionItem>
      <button className="h-[42px] bg-primary text-white font-bold leading-[20px] w-full rounded-[6px]">Save</button>
    </Accordion>
  )
}
export default CompanyInformation