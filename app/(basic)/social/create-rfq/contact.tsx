import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ContactInformation = () => {
  return (
    <Accordion className="!py-0" type="single" collapsible>
      <AccordionItem value="item-1" className='border-b-0'>
        <AccordionTrigger className='border-primary text-[24px] leading-[36px] font-[600] !py-0'>Contact Information</AccordionTrigger>
        <AccordionContent className='pt-[8px] flex flex-col gap-[16px]'>
          <div>
            <Label className="leading-[30px]">Your Name *</Label>
            <Input placeholder="Your Name" />
          </div>
          <div>
            <Label className="leading-[30px]">Email Address *</Label>
            <Input placeholder="Email Address" />
          </div>
          <div>
            <Label className="leading-[30px]">Phone Number *</Label>
            <div className="flex gap-[4px]">
              <div className="w-1/4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Việt Nam"> Việt Nam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-3/4">
                <Input
                  type="text"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>
          <div>
            <Label className="leading-[30px]">Other Contact Information</Label>
            <Input
              type="text"
              placeholder="Example: WhatsApp +1-000-000-0000"
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
export default ContactInformation