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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
import Image from "next/image";
import { useEffect, useState } from "react";

const DeleteCertificate = ({ setCertifications, ce, index }: any) => {
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
    let arr: any = ce;
    arr.splice(index, 1);
    const payload = {
      certification: arr,
    };
    setLoading(true);
    postRequest("/user/company-update", payload)
      .then((data) => {
        toast({
          variant: "success",
          title: "Success",
          description: "Create why us success",
        });
        setCertifications(data.data.certifications);
        setOpen(false);
        setCertificate("");
        setCertificateNumber("");
        setOrganization("");
        setIssued("");
        setFrom("");
        setTo("");
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
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Image
          src="/trash.png"
          width={24}
          height={24}
          alt="delete"
          className="!w-6 !h-6 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex gap-4 items-center p-4">
          <Image
            src={"/alert.png"}
            alt="alert"
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
          />
          <div>
            <p>Do you want to delete it?</p>
            <div className="flex gap-3 pt-4">
              <Button onClick={() => setOpen(false)} variant={"outline"}>
                Cancel
              </Button>
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={() => handleCertificate()}>Confirm</Button>
              )}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DeleteCertificate;
