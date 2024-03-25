import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ContactInformation = () => {
  return (
    <Accordion className="!py-0" type="single" collapsible>
      <AccordionItem value="item-1" className='border-b-0'>
        <AccordionTrigger className='border-primary text-2xl font-[600] !py-0'>Contact Information</AccordionTrigger>
        <AccordionContent className='pt-[8px] flex flex-col gap-4'>
          <div>
            <Label className="text-base">Your Name *</Label>
            <Input placeholder="Your Name" />
          </div>
          <div>
            <Label className="text-base">Email Address *</Label>
            <Input placeholder="Email Address" />
          </div>
          <div>
            <Label className="text-base">Phone Number *</Label>
            <div className="flex gap-1">
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
            <Label className="text-base">Other Contact Information</Label>
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