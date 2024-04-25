"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

const ConfirmDelete = ({ onSubmit, type, setReload, rfq }: any) => {
  const [loading, setLoading] = useState(false);
  const [openCofirm, setOpenCofirm] = useState(false);
  const route = useRouter();
  const { toast } = useToast();
  const onSubmit_ = () => {
    setLoading(true);
    onSubmit()
      .then(() => {
        toast({
          variant: "success",
          title: "Sucess",
          description: "Delete",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Delete",
        });
      })
      .finally(() => {
        if (setReload) {
          setReload((prev: any) => !prev);
        } else {
          if(rfq){
            route.push('/rfq')
          }
          else{
            route.refresh();
          }
        }
        setLoading(false);
        setOpenCofirm(false);
      });
  };
  return (
    <DropdownMenu open={openCofirm} onOpenChange={setOpenCofirm}>
      <DropdownMenuTrigger asChild>
        {
          (type == "company" ? (
            <Image
              src="/trash.png"
              width={24}
              height={24}
              alt="delete"
              className="w-6 h-6 cursor-pointer"
            />
          ) : (
            <Button type="submit" variant={"destructive"}>
              Delete
            </Button>
          ))
        }
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
              <Button onClick={() => setOpenCofirm(false)} variant={"outline"}>
                Cancel
              </Button>
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button onClick={() => onSubmit_()}>Confirm</Button>
              )}
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConfirmDelete;
