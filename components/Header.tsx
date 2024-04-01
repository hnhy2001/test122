import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu';
import SignOut from './auth/SignOut';
import { Menu, Package2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';


const Header = async () => {
  const session = await getServerSession(options);
  return (
    <div className='shadow-lg'>
      <div className='container flex items-center justify-between py-4'>
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
            <div className='flex flex-col gap-10 '>
              <Link href={'/'} className='w-full'>
                <Image src={'/logo.png'} alt='logo' width={120} height={64} className='h-auto w-auto' />
              </Link>
              {/* <Link href="/docs" className={'font-bold text-[#081540]'}>
                Data & Analytics
              </Link> */}
              <Link href="/docs" className={'font-bold text-[#081540]'}>
                Insights
              </Link>
              <Link href="/social" className={'font-bold text-[#081540]'}>
                Social Marketplace
              </Link>
              {/* <Link href="/docs" className={'font-bold text-[#081540]'}>
                Fulfillment Solution
              </Link> */}
            </div>
          </SheetContent>
        </Sheet>
        <Link href={'/'} className='w-96 pl-4 md:pl-0'>
          <Image src={'/logo.png'} alt='logo' width={120} height={64} className='h-auto w-auto object-contain' />
        </Link>
        <div className='font-bold hidden md:block'>
          <div className='flex gap-16 '>
            {/* <Link href="/docs" className={'font-bold text-[#081540]'}>
              Data & Analytics
            </Link> */}
            <Link href="/docs" className={'font-bold text-[#081540]'}>
              Insights
            </Link>
            <Link href="/social" className={'font-bold text-[#081540]'}>
              Social Marketplace
            </Link>
            {/* <Link href="/docs" className={'font-bold text-[#081540]'}>
              Fulfillment Solution
            </Link> */}
          </div>
        </div>
        <div className='flex items-center gap-5 w-96 justify-end'>
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg> */}
          {
            session?.user ?
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className='w-14 h-14 cursor-pointer'>
                    <AvatarImage src={session.user?.avatar} alt={session.user?.last_name} />
                    <AvatarFallback>{session.user?.last_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Keyboard shortcuts
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Email</DropdownMenuItem>
                          <DropdownMenuItem>Message</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                      New Team
                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem disabled>API</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignOut />
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              :
              <Button>
                <Link href={'/api/auth/signin'}>Sign in
                </Link>

              </Button>
          }
          <Button className='shadow-lg flex gap-1' variant={'outline'}>
            <div className='font-bold text-xl'>EN</div>
            <Image src={'/flag.png'} alt='flag' width={35} height={35} className='w-8 h-8' />
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg> */}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header