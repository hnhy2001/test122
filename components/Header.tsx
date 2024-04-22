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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignOut from "./auth/SignOut";
import { LogOut, Menu, Package2, User } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import SwitchRoleHearder from "./SwitchRoleHearder";

const Header = async () => {
  const session = await getServerSession(options);
  return (
    <div className="shadow-lg">
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
            <div className="flex flex-col gap-10 ">
              <SheetClose asChild>
                <Link href={"/"} className="w-full">
                  <Image
                    src={"/logo.png"}
                    alt="logo"
                    width={128}
                    height={56}
                    className="h-14 w-32 object-contain"
                  />
                </Link>
              </SheetClose>
              {/* <Link href="/docs" className={'font-bold text-[#081540]'}>
                Data & Analytics
              </Link> */}
              <SheetClose asChild>
                <Link
                  href="/overview"
                  className={"font-bold text-[#081540] w-full"}
                >
                  Insights
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/social"
                  className={"font-bold text-[#081540] w-full"}
                >
                  Social Marketplace
                </Link>
              </SheetClose>
              {/* <Link href="/docs" className={'font-bold text-[#081540]'}>
                Fulfillment Solution
              </Link> */}
            </div>
          </SheetContent>
        </Sheet>
        <div className=" gap-4 items-start w-96 hidden md:flex">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={128}
              height={56}
              className="h-14 w-32 object-contain"
            />
          </Link>
        </div>
        <Link href={"/"} className="pl-4 block w-full md:hidden">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={128}
            height={56}
            className="h-14 w-32 object-contain"
          />
        </Link>
        <div className="font-bold hidden md:block">
          <div className="flex justify-center">
            {/* <Link href="/docs" className={'font-bold text-[#081540]'}>
              Data & Analytics
            </Link> */}
            <Link href="/overview" className={"font-bold text-[#081540] w-44 text-center"}>
              Insights
            </Link>
            <Link href="/social" className={"font-bold text-[#081540] w-44 text-center"}>
              Social Marketplace
            </Link>
            {/* <Link href="/docs" className={'font-bold text-[#081540]'}>
              Fulfillment Solution
            </Link> */}
          </div>
        </div>
        <div className="flex items-center gap-5 justify-end w-96">
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg> */}
          {session?.user ? (
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
          ) : (
            <Button>
              <Link href={"/api/auth/signin"}>Sign in</Link>
            </Button>
          )}
          <Button className="shadow-lg flex gap-1" variant={"outline"}>
            <div className="font-bold text-xl">EN</div>
            <Image
              src={"/flag.png"}
              alt="flag"
              width={35}
              height={35}
              className="w-8 h-8"
            />
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg> */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
