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
import { getRequest } from "@/hook/apiClient";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

const NewCertificate = () => {
  const [date, setDate] = useState<Date>();
  const [certificates, setCertificates] = useState<any>([]);
  const [certificate, setCertificate] = useState<any>();

  useEffect(() => {
    getRequest("/config/certification")
      .then((data) => setCertificates(data?.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add</Button>
      </DialogTrigger>
      <DialogContent className="!min-w-1/2 !w-1/2 !max-w-[50%]">
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
                {certificates.map((category: any, index: any) => (
                  <SelectItem
                    key={category.code + "*" + index}
                    value={category.code + "*" + index}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <Input placeholder="Type to search and select a certification, or add a new one" /> */}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Certificate Number</Label>
            <Textarea placeholder="Enter certificate number" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Issuing Organization</Label>
            <Textarea placeholder="Enter organization name" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Date Issued</Label>
            <Input type="date" />
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>-Select Date-</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover> */}
          </div>
          <div className="flex flex-col gap-2">
            <Label>Validity Period</Label>
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" />
              <Input type="date" />

              {/* <Popover key={1}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>From</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover key={2}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>To</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */}
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
          <Button variant="default">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default NewCertificate;
