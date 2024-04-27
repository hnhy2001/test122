"use client";
import { postRequest } from "@/hook/apiClient";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";

const SwitchRoleHearder = () => {
  const [btnBuyLoading, setBtnBuyLoading] = useState(false);
  const [btnSellLoading, setBtnSellLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { update } = useSession();
  const { toast } = useToast();
  const route = useRouter();
  const switchRole = (e: any) => {
    const payload = { role: e };
    e == "BUYER" ? setBtnBuyLoading(true) : setBtnSellLoading(true);
    // setBtnLoading(true);
    // if (info.role && info.role == "SELLER") {
    //   payload.role = "BUYER";
    // } else {
    //   payload.role = "SELLER";
    // }
    postRequest("/user/switch-role", payload).then((data: any) => {
      if (data.code == 200) {
        update({ role: payload.role });
        // e == "BUYER" ? setBtnBuyLoading(false) : setBtnSellLoading(false);
        toast({
          variant: "success",
          title: "Success!",
          description: "Change role " + e + " success",
          action: <ToastAction altText="Try again">Done</ToastAction>,
        });
        if (window.location.pathname == '/social/company-profile' && payload.role == "BUYER") {
          window.location.href = '/social/buyer-profile'
        }
        else if (window.location.pathname == '/social/buyer-profile' && payload.role == "SELLER") {
          window.location.href = '/social/company-profile'
        }
        else {
          setTimeout(() => {
            location.reload()
          }, 500)
        }
        setOpen(false);
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="hover:bg-gray-50 cursor-default relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <RefreshCcw className="mr-2 h-4 w-4" />
          <span>Switch role</span>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[40vw] !min-h-[50vh] flex flex-col items-center justify-center gap-12">
        <DialogHeader className="flex flex-col gap-8 items-center relative">
          <DialogClose asChild className="absolute top-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </DialogClose>
          <DialogTitle className="text-4xl text-[#081342] font-bold">
            How do you like to continue?
          </DialogTitle>
          <DialogDescription>
            <span className="text-center text-lg">
              Choose how you would like to continue. You can have access to
              different features depending on what you choose
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full gap-6">
          <div className="col-span-2 xl:col-span-1 border border-[#939AA1] rounded-lg p-8 flex flex-col gap-4">
            <span className="text-3xl text-[#081342] font-semibold">Buy</span>
            <span className="text-lg font-medium">
              I would like to buy food and agriculture products from the global
              market.
            </span>
            {btnBuyLoading ? (
              <Button disabled className="h-14 text-sm xs:text-xl">
                <Loader2 className="h-4 w-4 animate-spin" />
                Plese wait
              </Button>
            ) : (
              <Button
                className="h-14 text-sm xs:text-xl"
                onClick={() => switchRole("BUYER")}
              >
                Continue as Buyer
              </Button>
            )}
          </div>
          <div className="col-span-2 xl:col-span-1 border border-[#939AA1] rounded-lg p-8 flex flex-col gap-4">
            <span className="text-3xl text-[#081342] font-semibold">Sell</span>
            <span className="text-lg font-medium">
              I would like to sell my food and agriculture products to the
              global market.
            </span>
            {btnSellLoading ? (
              <Button disabled className="h-14 text-sm xs:text-xl">
                <Loader2 className="h-4 w-4 animate-spin" />
                Plese wait
              </Button>
            ) : (
              <Button
                className="h-14 text-sm xs:text-xl"
                onClick={() => switchRole("SELLER")}
              >
                Continue as Supplier
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwitchRoleHearder;
