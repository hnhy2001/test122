import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { getRequest } from '@/hook/api'
import { IRFQ } from '@/type/rfq.interface'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: "Pavilion",
    description: "Pavilion"
};


const RFQ = () => {
    return (
        <div className='container'>
            <div className='flex gap-2 flex-col py-7'>
                <p className='text-3xl font-bold text-[#081440]'>Pavilion</p>
                <p className='text-[#081440]'>Explore premium suppliers and products from Tridge Pavilion.</p>
            </div>
            <div className='relative'>
                <Image src={'/banner2.png'} alt='Jeollanamdo' width={1683} height={547} className='w-full object-cover h-[80vh] md:h-auto blur-sm' />
                <div className='absolute flex flex-col gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/2 text-white text-center'>
                    <p className='font-bold text-6xl items-center'>Jeollanamdo</p>
                    <p className='font-semibold text-xl'>Land of Life, Best Jeonnam</p>
                    <p>Jeollanamdo, situated in the southwest of korea is a place of natural beauty, with Dadohae, clean coastlines, and wide-open fields We're making our home even nicer, creating a joyful time for everyone. Join us to discover the special charm and exciting possibilities waiting here!</p>
                    <div>
                        <Button className="text-[#081440]" variant={'outline'}>Learn more</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RFQ