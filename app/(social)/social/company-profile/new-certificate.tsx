"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns"
import DragDropPhoto from "@/components/ui/drag-drop-photo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getRequest, postRequest } from "@/hook/apiClient";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const NewCertificate = ({ setCertifications, ce }: any) => {
  const [certificates, setCertificates] = useState<any>([]);
  const [certificate, setCertificate] = useState<any>();
  const [certificateNumber, setCertificateNumber] = useState("");
  const [organization, setOrganization] = useState("");
  const [issued, setIssued] = useState<any>();
  const [from, setFrom] = useState<any>();
  const [to, setTo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getRequest("/config/certification")
      .then((data) => setCertificates(data?.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCertificate = () => {
    let arr: any = ce;
    arr.push({
      certificate: certificate,
        certificate_number: certificateNumber,
        organization: organization,
        date_issued: issued,
        valid_from: format(from, 'yyyy-MM-dd'),
        valid_to: format(to, 'yyyy-MM-dd'),
    });
    const payload = {
      certification: arr
    }
    setLoading(true);
    postRequest("/user/company-update", payload)
      .then((data) => {
        toast({
          variant: "success",
          title: "Success",
          description: "Create why us success",
        });
        setCertifications(data.data.certifications)
        setOpen(false)
        setCertificate('')
        setCertificateNumber('')
        setOrganization('')
        setIssued('')
        setFrom(undefined)
        setTo(undefined)
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Fail",
          description: JSON.stringify(err),
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[90%] md:min-w-[30%] !w-1/3 !max-w-[90%] md:max-w-[30%]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            New Certificate
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>
              Certificate <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(e: any) => {
                setCertificate({
                  code: e.split("*")[0],
                  name: e.split("*")[1],
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type to search and select a certification, or add a new one" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {certificates?.map((category: any, index: any) => (
                  <SelectItem
                    key={category.code + "*" + category.name}
                    value={category.code + "*" + category.name}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Certificate Number</Label>
            <Textarea
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              placeholder="Enter certificate number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Issuing Organization</Label>
            <Textarea
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="Enter organization name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Date Issued</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal h-14 text-lg",
                    !issued && "text-muted-foreground"
                  )}
                >
                  {issued ? (
                    format(issued, "yyyy MM dd")
                  ) : (
                    <span>Issued</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={issued}
                  onSelect={(e) => setIssued(e)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Validity Period</Label>
            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal h-14 text-lg",
                      !from && "text-muted-foreground"
                    )}
                  >
                    {from ? (
                      format(from, "yyyy MM dd")
                    ) : (
                      <span>From</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={from}
                    onSelect={(e) => setFrom(e)}
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal h-14 text-lg",
                      !to && "text-muted-foreground"
                    )}
                  >
                    {to ? (
                      format(to, "yyyy MM dd")
                    ) : (
                      <span>To</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={to}
                    onSelect={(e) => setTo(e)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="border border-black"
            >
              Cancel
            </Button>
          </DialogClose>
          {loading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button variant="default" onClick={handleCertificate}>
              Confirm
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default NewCertificate;
