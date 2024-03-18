'use client'
import Image from 'next/image'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"

import Link from 'next/link'

const Header = () => {
  const searchParams = useSearchParams()

  const auth = searchParams.get('auth')
  return (
    <div className='shadow-lg'>
      <div className='container flex items-center justify-between'>
        <Image src={'/logo.png'} alt='logo' width={194} height={72} className='w-[194px] h-[72px]' />
        <div className='font-bold'>
          <div className='flex gap-16 '>
            <Link href="/docs" className={'font-bold text-[#081540]'}>
              Data & Analytics
            </Link>
            <Link href="/docs" className={'font-bold text-[#081540]'}>
              Insights
            </Link>
            <Link href="/docs" className={'font-bold text-[#081540]'}>
              Social Marketplace
            </Link>
            <Link href="/docs" className={'font-bold text-[#081540]'}>
              Fulfillment Solution
            </Link>
          </div>
        </div>
        <div className='px-4 flex items-center gap-5'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          {
            auth ?
              <Image src={'/ava.png'} alt='ava' width={58} height={58} />
              :
              <Button>Đăng nhập</Button>
          }
          <Button className='shadow-lg flex gap-1' variant={'outline'}>
            <div className='font-bold text-xl'>EN</div>
            <Image src={'/flag.png'} alt='flag' width={35} height={35} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Header