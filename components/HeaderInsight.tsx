import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignOut from "./auth/SignOut";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { LogOut, Menu, User } from "lucide-react";
import { NavigationMenuInsight } from "./MenuInsight";
import SwitchRoleHearder from "./SwitchRoleHearder";
import { formatRole } from "./HeaderSocial";

const HeaderInsight = async () => {
  const session = await getServerSession(options);
  return (
    <div className="shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-10">
              <SheetClose asChild>
                <Link href={"/"}>
                  <Image
                    src={"/logo.png"}
                    alt="logo"
                    width={128}
                    height={56}
                    className="h-14 w-32 object-contain"
                  />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/overview"}>
                  <Image
                    src={"/insight.png"}
                    alt="logo"
                    width={128}
                    height={56}
                    className="h-14 w-32 object-contain"
                  />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/news" className={"font-bold text-[#081540] w-full"}>
                  News
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/on-the-ground-update"
                  className={"font-bold text-[#081540] w-full"}
                >
                  On The Ground Update
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/opinion"
                  className={"font-bold text-[#081540] w-full"}
                >
                  Opinion
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/analysis"
                  className={"font-bold text-[#081540] w-full"}
                >
                  Analysis
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/weekly-product-updates"
                  className={"font-bold text-[#081540] w-full"}
                >
                  Weekly Product Update
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/retailer-trend"
                  className={"font-bold text-[#081540] w-full"}
                >
                  Retailer Trends{" "}
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/report"
                  className={"font-bold text-[#081540] w-full"}
                >
                  Report{" "}
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
        <div className=" gap-4 items-center w-96 hidden md:flex">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={128}
              height={56}
              className="h-14 w-32 object-contain"
            />
          </Link>
          <Link href={"/overview"}>
            <Image
              src={"/insight.png"}
              alt="logo"
              width={128}
              height={56}
              className="h-14 w-32 object-contain"
            />
          </Link>
        </div>
        <Link href={"/social"} className="pl-4 w-full block md:hidden">
          <Image
            src={"/insight.png"}
            alt="logo"
            width={128}
            height={56}
            className="h-14 w-32 object-contain"
          />
        </Link>

        <div className="!font-bold hidden md:block">
          <NavigationMenuInsight />
        </div>
        <div className="flex items-center gap-5 w-96 justify-end">
          <div className="gap-1 hidden lg:flex items-center">
            <Image
              src={"/flag.png"}
              alt="flag"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <div className="font-bold">EN</div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg> */}
          </div>
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg> */}
          {session?.user ? (
            <div className="flex gap-5 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-14 h-14 cursor-pointer">
                    <AvatarImage
                      src={session.user?.avatar}
                      alt={session.user?.last_name}
                    />
                    <AvatarFallback>
                      {session.user?.last_name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href={"/my-account"}>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <div>
                      <SwitchRoleHearder />
                    </div>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <SignOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex flex-col">
                <strong>{session?.user?.last_name}</strong>
                <span>{session?.user?.role == "SELLER" ? formatRole("SUPPLIER") : formatRole(session?.user?.role)} role</span>
              </div>
            </div>
          ) : (
            <Button>
              <Link href={"/api/auth/signin"}>Sign in</Link>
            </Button>
          )}

        </div>
      </div>
    </div>
  );
};

export default HeaderInsight;
