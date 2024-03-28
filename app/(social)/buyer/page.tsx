import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getRequest } from '@/hook/api'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: "buyer",
    description: "buyer"
};


const Buyer = async (props: any) => {
    const page = +props?.searchParams?.page || 1
    const limit = 6 * page
    const [buyerData, countryData] = await Promise.all([
        getRequest('/buyer/list?limit=' +  limit),
        getRequest('/config/countries')
    ]);
    const buyers: any[] = buyerData?.data
    const countries: any[] = countryData?.data;
    return (
        <div className='container'>
            <p className='text-3xl font-bold py-7 text-[#081440]'>buyers</p>
            <div>
                <Input className='w-full py-5 rounded-xl bg-[#E7D8D8]' placeholder='Search buyers' />
            </div>
            <p className='py-3 text-[#081342]'>{buyerData?.total * buyers.length + " Results"}</p>
            <div className='grid grid-cols-6 gap-4'>
                {buyers.map((pd: any) => {
                    const country = countries.find(country => country.code == pd.origin_country.code)
                    return (
                        <div className='flex flex-col gap-1' key={pd.code}>
                            <Image src={pd.avatar} alt='Logo' width={266} height={266} className='aspect-square w-full object-cover' />
                            <p className='font-bold text-[#081440]'>{pd.name}</p>
                            <p className='font-bold text-xs text-[#939AA1]'>Variety: {pd.summary?.VARIETY}</p>
                            <div className='flex gap-2 items-center'>
                                <Image src={country.image} alt='flag' width={21} height={18} className='w-6 h-5' />
                                <p className='font-bold text-xs'>{country.name}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='flex justify-center text-[#081342] py-20'>
                {
                    buyers.length < buyerData?.total * limit &&
                    <Link href={'/buyer?page=' + (+page + 1)}>
                        <Button variant='outline' size={'lg'}>Load more</Button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Buyer