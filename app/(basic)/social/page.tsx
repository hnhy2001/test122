import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandInput, CommandList } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'

const Social = () => {
    return (
        <div className='container'>
            <div className='pt-16'>
                <Command className='bg-transparent w-full'>
                    <CommandInput placeholder="Search social marketplact" />
                    <CommandList></CommandList>
                </Command>
            </div>
            <div className='grid grid-cols-5 gap-16 pt-8'>
                <div className='flex flex-col gap-3'>
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
                <div className='col-span-2'>
                    <div className='flex gap-2 w-full'>
                        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='Logo' width={45} height={45} className='p-1 h-[45px] w-[45px] rounded-full object-cover' />
                        <div className='w-full'>
                            <Input className='w-full rounded-2xl bg-[#E7D8D8]' placeholder='Laodiha, create a post' />
                            <div className='flex justify-around py-4'>
                                <div className='flex gap-3 items-center text-[#515151]'><Image src={'/img.png'} alt='imgIcon' width={24} height={24} />Photo</div>
                                <div className='flex gap-3 items-center text-[#515151]'><Image src={'/videocam.png'} alt='videocam' width={24} height={24} />Video</div>
                                <div className='flex gap-3 items-center text-[#515151]'><Image src={'/text_snippet.png'} alt='text_snipper' width={24} height={24} />RFQ</div>
                            </div>
                        </div>
                    </div>
                    {
                        Array.from({ length: 10 }).map((_, index) => (
                            <div className='pb-6' key={index}>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-4'>
                                            <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='Logo' width={45} height={45} className='h-[45px] w-[45px] rounded-full object-cover' />
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-sm font-bold text-[#081342] flex gap-1 items-center'>Mkisa <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                                </svg></p>
                                                <div className='flex gap-1'>
                                                    <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='Logo' width={15} height={15} className='h-[15px] w-[15px] rounded-full object-cover' />
                                                    <p className='text-xs'>Jenifer Anna</p>
                                                    <p className='text-xs text-[#8C8585]'>2h</p>

                                                </div>
                                            </div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </div>
                                    <p>Mkisa participated in yet another international trade exhibition held in Berlin, Germany, from February 7th to 9th. This event focused on the global trade of fresh produce, providing Mkisa with a platform to showcase and advocate for its almon ... </p>
                                    <div className='flex flex-col gap-1'>
                                        <Image src={'/i71.png'} alt='Logo' width={600} height={300} className='w-full object-cover' />
                                        <div className='grid grid-cols-2 gap-1'>
                                            <Image src={'/i72.png'} alt='Logo' width={600} height={300} className='w-full object-cover' />
                                            <Image src={'/i72.png'} alt='Logo' width={600} height={300} className='w-full object-cover' />
                                        </div>
                                    </div>
                                    <div className='px-5 flex justify-between'>
                                        <p className='text-[#081342]'>20 Likes</p>
                                        <div className='flex gap-4 text-[#4A4A4A]'>
                                            <p>2 comments</p>
                                            <p>3 shares</p>
                                        </div>
                                    </div>
                                    <Separator className="mb-1 bg-[#8C8585] w-full" />
                                    <div className='flex px-5 justify-between'>
                                        <div className='flex gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                            </svg>
                                            Like
                                        </div>
                                        <div className='flex gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                            </svg>

                                            Comment
                                        </div>
                                        <div className='flex gap-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                            </svg>

                                            Share
                                        </div>

                                    </div>
                                    <Separator className="mb-1 bg-[#8C8585] w-full" />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='col-span-2'>
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
                    <div className='grid grid-cols-2 gap-6'>
                        {
                            Array.from({ length: 10 }).map((_, index) => (
                                <div className='flex flex-col gap-1' key={index}>
                                    <Image src={Math.random() > 0.5 ? '/18.png' : '/19.png'} alt='Logo' width={266} height={266} className='aspect-square w-full object-cover' />
                                    <p className='font-bold text-[#081440]'>Arabic Gum - Sudan · Sudan</p>
                                    <p className='font-bold text-xs text-[#939AA1]'>Variety: Hashab - Acacia Senegal</p>
                                    <div className='flex gap-2'>
                                        <Image src={'/flagCL.png'} alt='flag' width={21} height={18} />
                                        <p className='font-bold text-xs'>Linklab Itd</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Social