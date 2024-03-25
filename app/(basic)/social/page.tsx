import { options } from '@/app/api/auth/[...nextauth]/options'
import { Badge } from '@/components/ui/badge'
import { Command, CommandInput, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { getRequest } from '@/hook/api'
import { ISocial } from '@/type/social.interface'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import PostSocial from './PostSocial'
import { IProduct } from '@/type/product.interface'

export const metadata: Metadata = {
    title: "Social",
    description: "Social"
};


const Social = async () => {
    const session = await getServerSession(options);
    const user = session?.user
    const [socialData, productData, countryData] = await Promise.all([
        getRequest('/post/list'),
        getRequest('/product/list'),
        getRequest('/config/countries')
    ]);
    const social: ISocial[] = socialData.data
    const product: IProduct[] = productData.data
    const countries: any[] = countryData.data;

    return (
        <div className='container'>
            <div className='pt-16'>
                <Command className='bg-transparent w-full'>
                    <CommandInput placeholder="Search social marketplact" />
                    <CommandList></CommandList>
                </Command>
            </div>
            <div className='grid grid-cols-5 gap-16 relative'>
                <div className='flex flex-col gap-3 sticky h-16 py-8 top-0'>
                    <p className='text-[#8C8585]'>Company profile</p>
                    <div className='flex gap-2'>
                        <Image src={'/i71.png'} alt='Logo' width={69} height={69} className='p-1 h-[69px] w-[69px] rounded-md object-cover' />
                        <div className='flex gap-2 items-center'>
                            <div>
                                <p className='text-xl font-bold text-[#081342]'>Laodiha</p>
                                <p className='text-[#8C8585]'>0 Follower</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[21px] h-[21px] text-[#081342]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                            </svg>
                            <div>
                                <p className='text-sm text-[#081342]'>Switch role</p>
                                <p className='text-[#8C8585]'>0 Follower</p>
                            </div>
                        </div>
                    </div>
                    <Separator className="mb-2 bg-[#8C8585] w-full" />
                    <p className='text-[#8C8585]'>Personal profile</p>
                    <div className='flex gap-2 items-center'>
                        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='Logo' width={69} height={69} className='p-1 h-[69px] w-[69px] rounded-md object-cover' />
                        <div className='flex flex-col'>
                            <span className='text-xl font-bold text-[#081342]'>Tom Invi</span>
                            <div>
                                <Badge>Suplier</Badge>
                            </div>
                            <div className='flex justify-between text-sm gap-2 text-[#8C8585]'>
                                <p>0 Follower</p>
                                <p>0 Following</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-[#8C8585]'>Inform suppliers about your requirements by creating an RFQ.</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-11">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                    </div>
                </div>
                <div className='col-span-2 py-8'>
                    <div className='flex gap-2 w-full'>
                        <Image src={user?.avatar} alt='Logo' width={45} height={45} className='h-11 w-11 rounded-full object-contain' />
                        <div className='w-full'>
                            <Input className='w-full rounded-2xl bg-[#E7D8D8]' placeholder='Laodiha, create a post' />
                            <div className='flex justify-around py-4'>
                                <div className='flex gap-3 items-center text-[#515151]'><Image src={'/img.png'} alt='imgIcon' width={24} height={24} className='w-6 h-6 object-contain'/>Photo</div>
                                <div className='flex gap-3 items-center text-[#515151]'><Image src={'/videocam.png'} alt='videocam' width={24} height={24} className='w-6 h-6 object-contain'/>Video</div>
                                <div className='flex gap-3 items-center text-[#515151]'><Image src={'/text_snippet.png'} alt='text_snipper' width={24} height={24} className='w-6 h-6 object-contain'/>RFQ</div>
                            </div>
                        </div>
                    </div>
                    {
                        social.map((dt) => (
                            <PostSocial dt={dt} key={dt.code} />
                        ))
                    }
                </div>
                <div className='col-span-2 sticky py-8 h-screen flex flex-col top-0 right-0'>
                    <div className='flex justify-between'>
                        <p className='text-2xl text-[#081440] font-bold'>Browse Products</p>
                        <p className='text-[#081440] text-xl'>View all</p>
                    </div>
                    <div className='flex gap-5 py-3'>
                        <p className='text-[#081342] border-b-2 border-[#081342] border-solid px-2'>All</p>
                        <p className='px-2 text-gray-400'>Seafood</p>
                        <p className='px-2 text-gray-400'>Vegetable</p>
                        <p className='px-2 text-gray-400'>Packaged Fruits & Vegetables</p>
                    </div>
                    <div className='flex-1 overflow-auto'>
                        <div className='grid grid-cols-2 gap-6'>
                            {
                                product.map((pd) => {
                                    const country = countries.find(country => country.code == pd.origin_country.code)
                                    
                                    return (
                                        <div className='flex flex-col gap-1' key={pd.code}>
                                            <Image src={pd.avatar} alt='Logo' width={266} height={266} className='aspect-square w-full object-cover' />
                                            <p className='font-bold text-[#081440]'>{pd.name}</p>
                                            <p className='font-bold text-xs text-[#939AA1]'>Variety: {pd.summary?.VARIETY}</p>
                                            <div className='flex gap-2 items-center'>
                                                <Image src={country.image} alt='flag' width={21} height={18} className='w-6 h-5'/>
                                                <p className='font-bold text-xs'>{country.name}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Social