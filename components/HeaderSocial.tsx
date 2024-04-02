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
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

const HeaderSocial = async () => {
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
            <div className="flex flex-col gap-10">
              <SheetClose asChild>
                <Link href={"/"}>
                  <Image
                    src={"/logo.png"}
                    alt="logo"
                    width={120}
                    height={64}
                    className="h-auto w-auto"
                  />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={"/social"}>
                  <Image
                    src={"/social.png"}
                    alt="logo"
                    width={120}
                    height={64}
                    className="h-14 w-auto"
                  />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/social"
                  className={"font-bold text-[#081540] w-28"}
                >
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/product"
                  className={"font-bold text-[#081540] w-28"}
                >
                  Products
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/supplier"
                  className={"font-bold text-[#081540] w-28"}
                >
                  Suppliers
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/buyer" className={"font-bold text-[#081540] w-28"}>
                  Buyers
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/rfq" className={"font-bold text-[#081540] w-28"}>
                  RFQ
                </Link>
              </SheetClose>
              {/* <SheetClose asChild>
                                <Link href="/pavilion" className={'font-bold text-[#081540]  w-28'}>
                                    Pavilion
                                </Link>
                            </SheetClose> */}
            </div>
          </SheetContent>
        </Sheet>
        <div className=" gap-4 items-center w-96 hidden md:flex">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              width={120}
              height={64}
              className="h-auto w-auto object-contain"
            />
          </Link>
          <Link href={"/social"}>
            <Image
              src={"/social.png"}
              alt="logo"
              width={120}
              height={64}
              className="h-auto w-auto object-contain"
            />
          </Link>
        </div>
        <Link href={"/social"} className="pl-4 block md:hidden">
          <Image
            src={"/social.png"}
            alt="logo"
            width={120}
            height={64}
            className="h-auto w-auto object-contain"
          />
        </Link>

        <div className="font-bold hidden md:block">
          <div className="flex">
            <Link
              href="/social"
              className={"font-bold text-[#081540] w-28 text-center"}
            >
              Home
            </Link>
            <Link
              href="/product"
              className={"font-bold text-[#081540] w-28 text-center"}
            >
              Products
            </Link>
            <Link
              href="/supplier"
              className={"font-bold text-[#081540] w-28 text-center"}
            >
              Suppliers
            </Link>
            <Link
              href="/buyer"
              className={"font-bold text-[#081540] w-28 text-center"}
            >
              Buyers
            </Link>
            <Link
              href="/rfq"
              className={"font-bold text-[#081540] w-28 text-center"}
            >
              RFQ
            </Link>
            {/* <Link href="/pavilion" className={'font-bold text-[#081540]  w-28 text-center'}>
                            Pavilion
                        </Link> */}
          </div>
        </div>
        <div className="flex items-center gap-5 w-96 justify-end">
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
                  <Link href={'/my-account'}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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

export default HeaderSocial;
