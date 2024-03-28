import React from 'react'
import { cache } from 'react';
import { getRequest } from '@/hook/api'
import { Metadata } from 'next';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MONTH } from '@/const/month';
import PostSocial from '../../social/PostSocial';
import { Checkbox } from '@/components/ui/checkbox';
const data = [
    {
        "user_name": "User code EMP-LKD877",
        "user_avatar": "https://images.tridge.com/fit-in/284x284/booth-logo/21/4f/3a/214f3af31b176cfc41841cc7fa7dfd0c61a1b611/al_foah_logo_google.png",
        "user_country": {
            "code": 84,
            "name": "Vietnam"
        },
        "user_code": "EMP-LKD877",
        "user_type": "BASIC",
        "code": "POST-000007",
        "content": "Connecting Moments\n\nIndulge in some good old breakfast with your family with a warm cup of Silverback black tea – Kivu Blend, Rich, Buttery, andNutty.",
        "view": 3,
        "like": 3,
        "share": 3,
        "galleries": [
            "http://64.176.220.144:8080/file/media/cHVibGljL2ltYWdlcy9aUktwdzJIWERhUTJ1M3llSzdnd0xORFJ6dzhHQ3BXaDNGYWR5OWxFLmpwZw==.jpg",
            "http://64.176.220.144:8080/file/media/cHVibGljL2ltYWdlcy96YjhVcGNrQ2p4Y1Nvc3JCZlNmRW9qTXVVb2V5RE5GR3NNQ3hXTEJTLnBuZw==.png",
            "http://64.176.220.144:8080/file/media/cHVibGljL2ltYWdlcy9ZTjR1TmY0anZvNDh3dFpBVkozbmpsRG1Ya1FBMHgxOWpoUzc0RmNLLm1wNA==.mp4"
        ],
        "comment_list": [
            {
                "content": "This is a first comment",
                "created_at": "2024-03-26T07:16:57.000",
                "user": {
                    "first_name": "User code",
                    "last_name": "EMP-LKD877",
                    "code": "EMP-LKD877",
                    "country": {
                        "code": 84,
                        "name": "Vietnam"
                    },
                    "avatar": "https://images.tridge.com/fit-in/284x284/booth-logo/21/4f/3a/214f3af31b176cfc41841cc7fa7dfd0c61a1b611/al_foah_logo_google.png"
                }
            },
            {
                "content": "This is a second comment You must provide an absolute path to the make sure you don't forget to create a symbolic link to your app public folder:",
                "created_at": "2024-03-26T07:17:27.000",
                "user": {
                    "first_name": "User code",
                    "last_name": "EMP-LKD877",
                    "code": "EMP-LKD877",
                    "country": {
                        "code": 84,
                        "name": "Vietnam"
                    },
                    "avatar": "https://images.tridge.com/fit-in/284x284/booth-logo/21/4f/3a/214f3af31b176cfc41841cc7fa7dfd0c61a1b611/al_foah_logo_google.png"
                }
            },
            {
                "content": "This is a second comment You must provide an absolute path to the make sure you don't forget to create a symbolic link to your app public folder:",
                "created_at": "2024-03-26T07:19:03.000",
                "user": {
                    "first_name": "User code",
                    "last_name": "EMP-LKD877",
                    "code": "EMP-LKD877",
                    "country": {
                        "code": 84,
                        "name": "Vietnam"
                    },
                    "avatar": "https://images.tridge.com/fit-in/284x284/booth-logo/21/4f/3a/214f3af31b176cfc41841cc7fa7dfd0c61a1b611/al_foah_logo_google.png"
                }
            }
        ],
        "created_at": "2024-03-26T07:16:23.493000Z"
    },
    {
        "user_name": "User code EMP-LKD877",
        "user_avatar": "https://images.tridge.com/fit-in/284x284/booth-logo/21/4f/3a/214f3af31b176cfc41841cc7fa7dfd0c61a1b611/al_foah_logo_google.png",
        "user_country": {
            "code": 84,
            "name": "Vietnam"
        },
        "user_code": "EMP-LKD877",
        "user_type": "BASIC",
        "code": "POST-000006",
        "content": "Fresh Artichokes - Egypt\nEgyptian artichokes boast a vibrant green color and a distinct, globe-like shape. Cultivated in the fertile Nile Delta region, they offer a tender, earthy flavor with a",
        "view": 0,
        "like": 0,
        "share": 0,
        "galleries": [
            "http://64.176.220.144:8080/file/media/cHVibGljL2ltYWdlcy9GMVVXZ1l0ckhIVEVUQ0NhZGFnejVUbTBtQ283Q2tMWFdDMGlxTFdYLmpwZw==.jpg",
            "http://64.176.220.144:8080/file/media/cHVibGljL2ltYWdlcy9UR2w2RGhmbGtDakwydVR5QmNxRWpBcFJKdjNpY0ZYTVk5SFhjWXM5LnBuZw==.png",
            "http://64.176.220.144:8080/file/media/cHVibGljL2ltYWdlcy9tV2xJR0lsSURSeExkZWJJZ3VsNnNkUVZydmZNbkNvbmhSWGJaTlZzLm1wNA==.mp4"
        ],
        "comment_list": [],
        "created_at": "2024-03-26T07:15:56.707000Z"
    }
]

const getbuyer = cache(async (id: string) => {
    const buyer: any = await getRequest('/buyer/detail?code=' + id)
    return buyer;
});

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}


export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const id = params.id.split("*")[1]
    const buyer: any = await getbuyer(id)

    return {
        title: buyer.buyer.name,
        openGraph: {
            images: [],
        }
    }
}


const BuyerDetail = async ({ params }: any) => {
    const id = params.id.split("*")[1]
    const [countryData] = await Promise.all([
        getRequest('/config/countries')
    ]);
    const countries: any[] = countryData?.data;
    const { buyer, suggest_product_list }: any = await getRequest('/buyer/detail?code=' + id)

    return (
        <div className='container py-20 flex flex-col gap-4'>
            <div className='flex gap-11 flex-col pb-11'>
                <div className='flex gap-8 items-end'>
                    <Image src={buyer.avatar} alt={buyer.name} width={288} height={288} className='w-72 h-72  object-cover' />
                    <div>
                        <p className='font-bold text-4xl'>{buyer.name}</p>
                        <div className='flex gap-4 text-[#8C8585]'>
                            <p className='text-3xl'>Buyer</p>
                            <p className='text-3xl underline'>{buyer.follower_count} Followers</p>
                        </div>
                    </div>
                </div>
                <div className='flex text-xl font-bold'>
                    <p className='p-2 border-b-2 border-black'>Overview</p>
                    <p className='p-2'>Posts</p>
                    <p className='p-2'>Products</p>
                </div>
                <div className='grid grid-cols-3 gap-20 relative'>
                    <div className='col-span-2 flex flex-col gap-4'>
                        <p className='text-3xl font-bold'>About</p>
                        <table className='border-separate border-spacing-1 w-full'>
                            {Object.keys(buyer.company_detail).map((key: any) => (
                                <tbody key={key}>
                                    <tr className='grid grid-cols-3'>
                                        <td className='text-[#8C8585] text-xl col-span-1'>{key}</td>
                                        <td className='text-[#404040] text-xl col-span-2'>{buyer.company_detail[key]}</td>
                                    </tr>
                                </tbody>

                            ))}

                        </table>
                        <p className='text-3xl font-bold flex gap-5 items-center'>Verification Details <p className='text-sm font-bold'>Validated by Tridge</p></p>
                        <p className='font-bold'>Basic Information</p>
                        <table className='border-separate border-spacing-1 w-full'>
                            <tbody>
                                <tr className='grid grid-cols-3'>
                                    <td className='text-[#8C8585] text-xl col-span-1'>Official website</td>
                                    <td className='text-[#404040] text-xl col-span-2 underline'>VITIVALOR WINES</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className='grid grid-cols-3'>
                                    <td className='text-[#8C8585] text-xl col-span-1'>Social media account(s)</td>
                                    <td className='text-[#404040] text-xl col-span-2 underline'>LinkedIn, Instagram, Facebook</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr className='grid grid-cols-3'>
                                    <td className='text-[#8C8585] text-xl col-span-1'>Business registration number</td>
                                    <td className='text-[#404040] text-xl col-span-2'>62378017800033</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className='font-bold'>Basic Information</p>
                        <p>Work email</p>
                        <p>Business registration certificate</p>
                        <p className='text-sm underline'>About Vertification Details</p>

                        <div className='flex justify-between items-center'>
                            <p className='text-3xl font-bold'>Products</p>
                            <p className='flex gap-2 items-center'>View all <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                            </p>
                        </div>
                        <p>Check out the products Tridge Fulfillment Buyer is looking to source for.</p>
                        {
                            suggest_product_list.map((pd: any) => (
                                <div className='flex justify-between items-center'>
                                    <div className='w-full'>
                                        <p className='font-bold pb-5'>{pd.name}</p>
                                        <div className='grid grid-cols-3 w-full'>
                                            <p className='col-span-1 text-lg text-[#8C8585]'>Sourcing Countries</p>
                                            <p className='col-span-2 text-lg text-[#404040]'>{pd.origin_country.name}</p>
                                            <p className='col-span-1 text-lg text-[#8C8585]'>Packaging Type</p>
                                            <p className='col-span-2 text-lg text-[#404040]'>{pd.summary['VARIETY']}</p>
                                        </div>
                                    </div>
                                    <Image src={pd.avatar} alt='buyer' width={112} height={112} className='w-28 h-28 object-cover' />
                                </div>
                            ))
                        }
                        <p className='text-3xl font-bold'>RFQS</p>
                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-3'>
                                <Image src={'/555.png'} alt={'sfd'} width={135} height={128} />
                                <div className='flex flex-col gap-2'>
                                    <p className='italic text-[#6473B1]'>Closed</p>
                                    <p className='text-xl text-[#081342] font-bold'>Popcorn · 500 ton</p>
                                    <p className='flex gap-2 items-start'>
                                        <Image src={'/account.png'} alt='account' width={20} height={20} />
                                        <strong> Reqested by:</strong> Trait d'union consulting </p>
                                    <p className='flex gap-2 items-start'>
                                        <Image src={'/ana.png'} alt='anlisynt' width={20} height={20} />
                                        <strong>Annual Revenue:</strong> USD 50M~100M</p>
                                </div>
                                <div>
                                </div>
                            </div>
                            <Separator className="mb-2 bg-[#081342] w-2/3" />
                            <table className='border-separate border-spacing-1'>
                                <tbody>
                                    <tr>
                                        <td className='text-[#939AA1]'>Product Category</td>
                                        <td className='font-bold'>Popcorn Snack</td>
                                    </tr>
                                    <tr>
                                        <td className='text-[#939AA1]'>Port of Destination</td>
                                        <td className='font-bold'>Damman, Saudi Arabia</td>
                                    </tr>
                                    <tr>
                                        <td className='text-[#939AA1]'>Sourcing Countries</td>
                                        <td className='font-bold'>All countries</td>
                                    </tr>
                                    <tr>
                                        <td className='text-[#939AA1]'>Request Duration</td>
                                        <td className='font-bold'>Dec 26, 2023 ~ Jan 25, 2024 at 14:48 (GMT+07:00)</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='pt-5'>
                                <Button>
                                    Submit Quote
                                </Button>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-3xl font-bold'>Posts</p>
                            <p className='flex gap-2 items-center'>View all <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                            </p>
                        </div>
                        <div className='grid grid-cols-2 gap-16'>
                            {
                                data.map((dt: any, index: any) => (
                                    <PostSocial dt={dt} key={index} />
                                ))
                            }
                        </div>
                        <p className='text-3xl font-bold'>Export History</p>
                        <p className='text-2xl font-bold text-[#939AA1]'>Click on the map or browse the table for more information about VITIVALOR WINES's export history.</p>
                        <p className='text-3xl font-bold'>Our People</p>
                        <p className='text-2xl font-bold text-[#939AA1]'>Representatives</p>
                        <div className='grid grid-cols-2 gap-16'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-3'>
                                    <Image src={buyer.avatar} alt={buyer.name} width={112} height={112} className='w-28 h-28 object-cover' />
                                    <p className='text-xl font-bold text-[#4A4A4A]'>{buyer.name} · buyer</p>
                                </div>
                                <div className='flex gap-4 underline items-center'>
                                    <p>{buyer.follower_count} Followers</p>
                                    <p>{buyer.product_count} Products</p>
                                    <Button>+ Follow</Button>
                                </div>
                                <p>Let's meet and discuss about your needs ! We have exclusive french wines that could fit your customers expectations.</p>
                                <div className='flex gap-5'>
                                    <Button variant={'outline'}>Book a Meeting</Button>
                                    <Button>Send Message</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='sticky h-64 rounded-lg top-4 flex flex-col gap-4'>
                        <p className='text-3xl font-bold'>Contact buyer</p>
                        <p className='text-lg text-[#ACADAF]'>Representative</p>
                        <div className='flex flex-col gap-6'>
                            <div className='flex gap-3 justify-between items-center'>
                                <div className='flex gap-5 items-center'>
                                    <Image src={buyer.avatar} alt={buyer.name} width={64} height={64} className='w-16 h-16' />
                                    <div>
                                        <p className='font-bold text-[#081440]'>{buyer.name}</p>
                                        <p className='font-bold text-[#908E8E]'>Marketing & Sales Proje...</p>
                                        <p className='font-bold text-sm underline text-[#8C8585]'>View detail</p>
                                    </div>
                                </div>
                                <Checkbox />
                            </div>
                                <Button>Send Message</Button>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BuyerDetail