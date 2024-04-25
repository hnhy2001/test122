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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const NewCertificate = ({ setCertifications }: any) => {
  const [certificates, setCertificates] = useState<any>([]);
  const [certificate, setCertificate] = useState<any>();
  const [certificateNumber, setCertificateNumber] = useState("");
  const [organization, setOrganization] = useState("");
  const [issued, setIssued] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getRequest("/config/certification")
      .then((data) => setCertificates(data?.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCertificate = () => {
    setLoading(true);
    postRequest("/user/company-update", {
      certification: {
        certificate: certificate,
        certificate_number: certificateNumber,
        organization: organization,
        date_issued: issued,
        valid_from: from,
        valid_to: to,
      },
    })
      .then((data) => {
        toast({
          title: "Success",
          description: "Update New Certificate",
        });
        setCertifications(data.data.certifications)
        setOpen(false)
        setCertificate('')
        setCertificateNumber('')
        setOrganization('')
        setIssued('')
        setFrom('')
        setTo('')
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
            <Label>Certificate *</Label>
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
            <Input
              value={issued}
              onChange={(e) => setIssued(e.target.value)}
              type="date"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Validity Period</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
              <Input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
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
