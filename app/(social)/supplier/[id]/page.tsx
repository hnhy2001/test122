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


const getsupplier = cache(async (id: string) => {
    //   const supplier: any = await getRequest('/supplier/detail?code=' + id)
    return [];
});

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

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

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const id = params.id.split("*")[1]
    const supplier: any = await getsupplier(id)

    return {
        title: params.id,
        openGraph: {
            images: [],
        }
    }
}


const SupplierDetail = async ({ params }: any) => {
    const id = params.id.split("*")[1]
    const [countryData] = await Promise.all([
        getRequest('/config/countries')
    ]);
    const countries: any[] = countryData?.data;
    return (
        <div className='flex flex-col gap-4'>
            <Image src={'/2468.png'} alt='2468' width={1700} height={248} className='w-full h-[40vh] object-cover' />
            <div className='container'>
                <div className='container mx-auto mb-36 -m-36 flex gap-11 flex-col pb-11'>
                    <div className='flex gap-8 items-end'>
                        <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'} alt='2468' width={288} height={288} className='w-72 h-72  object-cover' />
                        <div>
                            <p className='font-bold text-4xl'>VITIVALOR WINES</p>
                            <div className='flex gap-4 text-[#8C8585]'>
                                <p className='text-3xl underline'>0 Follower</p>
                                <p className='text-3xl underline'>80 Products</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex text-xl font-bold'>
                        <p className='p-2 border-b-2 border-black'>Overview</p>
                        <p className='p-2'>Posts</p>
                        <p className='p-2'>Products</p>
                    </div>
                    <div className='flex gap-5 px-4'>
                        <p className='font-bold text-xl'>About</p>
                        <p className='font-bold text-xl text-[#8C8585]'>Posts</p>
                        <p className='font-bold text-xl text-[#8C8585]'>Products</p>
                        <p className='font-bold text-xl text-[#8C8585]'>Photos & Video</p>
                        <p className='font-bold text-xl text-[#8C8585]'>Export History</p>
                        <p className='font-bold text-xl text-[#8C8585]'>Our People</p>
                        <p className='font-bold text-xl text-[#8C8585]'>Why us</p>
                        <p className='font-bold text-xl text-[#8C8585]'>Endorsements</p>
                    </div>
                    <div className='grid grid-cols-3 gap-20 relative'>
                        <div className='col-span-2 flex flex-col gap-4'>
                            <p className='text-3xl font-bold'>About</p>
                            <table className='border-separate border-spacing-1 w-full'>
                                <tbody>
                                    <tr className='grid grid-cols-3'>
                                        <td className='text-[#8C8585] text-xl col-span-1'>Business Type</td>
                                        <td className='text-[#404040] text-xl col-span-2'>Trade</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='grid grid-cols-3'>
                                        <td className='text-[#8C8585] text-xl col-span-1'>Country</td>
                                        <td className='text-[#404040] text-xl col-span-2'>France</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='grid grid-cols-3'>
                                        <td className='text-[#8C8585] text-xl col-span-1'>Year Established</td>
                                        <td className='text-[#404040] text-xl col-span-2'>2021</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='grid grid-cols-3'>
                                        <td className='text-[#8C8585] text-xl col-span-1'>Number of Employees</td>
                                        <td className='text-[#404040] text-xl col-span-2'>1-10 Employees</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='grid grid-cols-3'>
                                        <td className='text-[#8C8585] text-xl col-span-1'>Annual Sales Revenue</td>
                                        <td className='text-[#404040] text-xl col-span-2'>Less than USD 1M</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='grid grid-cols-3'>
                                        <td className='text-[#8C8585] text-xl col-span-1'>Company Website</td>
                                        <td className='text-[#404040] text-xl col-span-2'>https://www.vitivalorwines.com</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='grid grid-cols-3'>
                                        <td className='text-[#8C8585] text-xl col-span-1'>Company Address</td>
                                        <td className='text-[#404040] text-xl col-span-2'>9 Rue de l'Industrie - Bâtiment B 69220 Belleville France</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr className='grid grid-cols-3'>
                                        <td className='text-[#8C8585] text-xl col-span-1'>Company Description</td>
                                        <td className='text-[#404040] text-xl col-span-2'>Vitivalor Wines is accompanying wine estates from the main french producing regions.Contact us in order to discuss and discover our product ranges that will fit your customer needs !</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className='text-3xl font-bold'>Main Products</p>
                            <div className='grid grid-cols-5 gap-1'>
                                <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'} alt='2468' width={288} height={288} className='w-full   object-cover' />
                                <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'} alt='2468' width={288} height={288} className='w-full  object-cover' />

                                <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'} alt='2468' width={288} height={288} className='w-full  object-cover' />

                                <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'} alt='2468' width={288} height={288} className='w-full  object-cover' />

                                <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'} alt='2468' width={288} height={288} className='w-full  object-cover' />
                            </div>
                            <p className='underline font-bold flex gap-1 items-center'>View all 80 products <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                            </p>
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
                            <div className='flex justify-between items-center'>
                                <p className='text-3xl font-bold'>Products</p>
                                <p className='flex gap-2 items-center'>View all <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                                </p>
                            </div>
                            <div className='flex gap-3'>
                                <div>
                                    <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'} alt='2468' width={288} height={288} className='w-72 h-72  object-cover' />
                                    <p className='text-xl font-semibold'>AOC Champagne Brut - Eveil des Senss</p>
                                    <p className='text-xs font-semibold text-[#939AA1]'>Sparkling Wine</p>
                                    <p className='text-xs font-semibold text-[#939AA1]'>Variety: Pinor Noir. Chardonnay | Processed Style: Méthode Traditionelle</p>
                                </div>
                                <div>
                                    <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'} alt='2468' width={288} height={288} className='w-72 h-72  object-cover' />
                                    <p className='text-xl font-semibold'>AOC Champagne Brut - Eveil des Senss</p>
                                    <p className='text-xs font-semibold text-[#939AA1]'>Sparkling Wine</p>
                                    <p className='text-xs font-semibold text-[#939AA1]'>Variety: Pinor Noir. Chardonnay | Processed Style: Méthode Traditionelle</p>
                                </div>
                                <div>
                                    <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'} alt='2468' width={288} height={288} className='w-72 h-72  object-cover' />
                                    <p className='text-xl font-semibold'>AOC Champagne Brut - Eveil des Senss</p>
                                    <p className='text-xs font-semibold text-[#939AA1]'>Sparkling Wine</p>
                                    <p className='text-xs font-semibold text-[#939AA1]'>Variety: Pinor Noir. Chardonnay | Processed Style: Méthode Traditionelle</p>
                                </div>
                                <div>
                                    <Image src={'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg'} alt='2468' width={288} height={288} className='w-72 h-72  object-cover' />
                                    <p className='text-xl font-semibold'>AOC Champagne Brut - Eveil des Senss</p>
                                    <p className='text-xs font-semibold text-[#939AA1]'>Sparkling Wine</p>
                                    <p className='text-xs font-semibold text-[#939AA1]'>Variety: Pinor Noir. Chardonnay | Processed Style: Méthode Traditionelle</p>
                                </div>
                            </div>
                            <p className='text-3xl font-bold'>Videos</p>
                            <p className='text-2xl font-bold'>Videos</p>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/d5vgJ-ko0t0?si=tG-m4mRWJTaPQ5JO" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                            <p className='font-bold text-sm'>Vitivalor Wines | A selection of wines for p...</p>
                            <p className='font-semibold text-xs text-[#939AA1]'>Vitivalor Wines is offering a pure selection of French wines to professional buyers (wine shops, restaurants, online shops) !
                            </p>
                            <p className='text-3xl font-bold'>Export History</p>
                            <p className='text-2xl font-bold text-[#939AA1]'>Click on the map or browse the table for more information about VITIVALOR WINES's export history.</p>
                            <p className='text-3xl font-bold'>Our People</p>
                            <p className='text-2xl font-bold text-[#939AA1]'>Representatives</p>
                            <div className='grid grid-cols-2 gap-16'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center gap-3'>
                                        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='supplier' width={112} height={112} className='w-28 h-28 object-cover' />
                                        <p className='text-xl font-bold text-[#4A4A4A]'>Thomas Lejeune · Supplier</p>
                                    </div>
                                    <div className='flex gap-4 underline items-center'>
                                        <p>0 Followers</p>
                                        <p>3 Products</p>
                                        <Button>+ Follow</Button>
                                    </div>
                                    <p>Let's meet and discuss about your needs ! We have exclusive french wines that could fit your customers expectations.</p>
                                    <div className='flex gap-5'>
                                        <Button variant={'outline'}>Book a Meeting</Button>
                                        <Button>Send Message</Button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center gap-3'>
                                        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='supplier' width={112} height={112} className='w-28 h-28 object-cover' />
                                        <p className='text-xl font-bold text-[#4A4A4A]'>Thomas Lejeune · Supplier</p>
                                    </div>
                                    <div className='flex gap-4 underline items-center'>
                                        <p>0 Followers</p>
                                        <p>3 Products</p>
                                        <Button>+ Follow</Button>
                                    </div>
                                    <p>Let's meet and discuss about your needs ! We have exclusive french wines that could fit your customers expectations.</p>
                                    <div className='flex gap-5'>
                                        <Button variant={'outline'}>Book a Meeting</Button>
                                        <Button>Send Message</Button>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center gap-3'>
                                        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='supplier' width={112} height={112} className='w-28 h-28 object-cover' />
                                        <p className='text-xl font-bold text-[#4A4A4A]'>Thomas Lejeune · Supplier</p>
                                    </div>
                                    <div className='flex gap-4 underline items-center'>
                                        <p>0 Followers</p>
                                        <p>3 Products</p>
                                        <Button>+ Follow</Button>
                                    </div>
                                    <p>Let's meet and discuss about your needs ! We have exclusive french wines that could fit your customers expectations.</p>
                                    <div className='flex gap-5'>
                                        <Button variant={'outline'}>Book a Meeting</Button>
                                        <Button>Send Message</Button>
                                    </div>
                                </div>
                            </div>
                            <p className='text-3xl font-bold'>Why Us?</p>
                            <div className='flex flex-col gap-14'>

                                <div className='flex gap-10 items-center'>
                                    <div>
                                        <div className='text-7xl w-28 text-center font-bold text-[#081440]'>01</div>
                                    </div>
                                    <div>
                                        <p className='text-xl font-bold'>Close Quality Inspection</p>
                                        <p className='font-normal'>Our teams visit every wine estates we work with to evaluate the estates conditions and products. We believe it is our responsibility to know every detail of our estates and the production process with the producers and to also consider outside factors such as local weather conditions. Our wines are elaborated by winegrowers, hence we are confident in the quality of the products we are selling.</p>
                                    </div>
                                </div>
                                <div className='flex gap-10 items-center'>
                                    <div>
                                        <div className='text-7xl w-28 text-center font-bold text-[#081440]'>02</div>
                                    </div>                            <div>
                                        <p className='text-xl font-bold'>Fully Committed Engagement</p>
                                        <p className='font-normal'>Thanks to our technical consulting team, we are engaged throughout the entire production process from harvesting to grading, manufacturing, and packing the product for export. Alos, our administraive team is specifically checking export requirements so that each shipment complies with regional standards.</p>
                                    </div>
                                </div>
                                <div className='flex gap-10 items-center'>
                                    <div>
                                        <div className='text-7xl w-28 text-center font-bold text-[#081440]'>03</div>
                                    </div>                            <div>
                                        <p className='text-xl font-bold'>Market-fit Products</p>
                                        <p className='font-normal'>Our marketing & sales team is analyzing on a daily basis the needs of the final customer in each and every region of the world in order to select and offer products that are adapted to what your customers are looking for.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='sticky h-[30rem] rounded-lg top-4 flex flex-col gap-4 p-4 shadow-lg'>
                            <p className='text-3xl font-bold'>Contact Supplier</p>
                            <p className='text-lg text-[#ACADAF]'>Representative</p>
                            <div className='flex flex-col gap-6'>
                                <div className='flex gap-3 justify-between items-center'>
                                    <div className='flex gap-5 items-center'>
                                        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='flag' width={64} height={64} className='w-16 h-16' />
                                        <div>
                                            <p className='font-bold text-[#081440]'>Thomas Lejeune</p>
                                            <p className='font-bold text-[#908E8E]'>Marketing & Sales Proje...</p>
                                            <p className='font-bold text-sm underline text-[#8C8585]'>View detail</p>
                                        </div>
                                    </div>
                                    <Checkbox />
                                </div>
                                <div className='flex gap-3 justify-between items-center'>
                                    <div className='flex gap-5 items-center'>
                                        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='flag' width={64} height={64} className='w-16 h-16' />
                                        <div>
                                            <p className='font-bold text-[#081440]'>Thomas Lejeune</p>
                                            <p className='font-bold text-[#908E8E]'>Marketing & Sales Proje...</p>
                                            <p className='font-bold text-sm underline text-[#8C8585]'>View detail</p>

                                        </div>
                                    </div>
                                    <Checkbox />
                                </div>
                                <div className='flex gap-3 justify-between items-center'>
                                    <div className='flex gap-5 items-center'>
                                        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='flag' width={64} height={64} className='w-16 h-16' />
                                        <div>
                                            <p className='font-bold text-[#081440]'>Thomas Lejeune</p>
                                            <p className='font-bold text-[#908E8E]'>Marketing & Sales Proje...</p>
                                            <p className='font-bold text-sm underline text-[#8C8585]'>View detail</p>

                                        </div>
                                    </div>
                                    <Checkbox />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <Button>Send Message</Button>
                                    <Button variant={'outline'}>Book a Meeting</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SupplierDetail