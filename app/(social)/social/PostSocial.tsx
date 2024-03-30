import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { ISocial } from '@/type/social.interface'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import Image from 'next/image'
import React from 'react'
import Comment from './Comment'

const PostSocial = ({ dt }: { dt: ISocial }) => {
    return (
        <div className='pb-6'>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <Image src={dt.user_avatar} unoptimized alt='Logo' width={45} height={45} className='h-[45px] w-[45px] rounded-full object-cover' />
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm font-bold text-[#081342] flex gap-1 items-center'>{dt.user_name} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg></p>
                            <div className='flex gap-1'>
                                <Image unoptimized src={dt.user_avatar} alt='Logo' width={15} height={15} className='h-[15px] w-[15px] rounded-full object-cover' />
                                <p className='text-xs'>{dt.user_name}</p>
                                <p className='text-xs text-[#8C8585]'>{formatDistanceToNow(new Date((dt.created_at)), { addSuffix: true, locale: vi })}</p>

                            </div>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </div>
                <p>{dt.content}</p>
                <div className='flex flex-col gap-1'>
                    {
                        dt.galleries.map(img => (
                            <Image unoptimized key={img} src={img} alt={dt.content} width={600} height={300} className='w-full object-contain' />
                        ))
                    }
                </div>

                <div className='px-5 flex justify-between'>
                    <p className='text-[#081342]'>{dt.like} Likes</p>
                    <div className='flex gap-4 text-[#4A4A4A]'>
                        <p>{dt.comment_list?.length || 0} comments</p>
                        <p>{dt.share} shares</p>
                    </div>
                </div>
                <Separator className=" bg-[#8C8585] w-full" />
                <div className='flex px-5 justify-between'>
                    <Button variant="ghost">
                        <div className='flex gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                            </svg>
                            Like
                        </div>
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost">
                                <div className='flex gap-1 items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>

                                    Comment
                                </div>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='!max-w-[60%] h-[70vh] p-0'>
                            <div className='grid grid-cols-2 h-[70vh] py-3 pl-10'>
                                <div className='flex flex-col gap-1'>
                                    <Carousel className='h-full'>
                                        <CarouselContent className='h-full'>
                                            {dt.galleries.map((data: any, index: any) => (
                                                <CarouselItem key={index} className='h-full'>
                                                    <Image key={data} src={data} alt={dt.content} width={600} height={300} className='w-full h-full object-cover' />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious src='/left.png' />
                                        <CarouselNext src='/right.png' />
                                    </Carousel>
                                </div>
                                <div className='flex flex-col gap-3 overflow-auto h-full px-10'>
                                    <div className='flex justify-between w-full'>
                                        <div className='flex gap-4'>
                                            <Image src={dt.user_avatar} alt='Logo' width={45} height={45} className='h-[45px] w-[45px] rounded-full object-cover' />
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-sm font-bold text-[#081342] flex gap-1 items-center'>{dt.user_name} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                                </svg></p>
                                                <div className='flex gap-1'>
                                                    <Image src={dt.user_avatar} alt='Logo' width={16} height={16} className='h-4 w-4 rounded-full object-cover' />
                                                    <p className='text-xs'>{dt.user_name}</p>
                                                    <p className='text-xs text-[#8C8585]'>{formatDistanceToNow(new Date((dt.created_at)), { addSuffix: true, locale: vi })}</p>

                                                </div>
                                            </div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </div>
                                    <p>{dt.content}</p>
                                    <div className='flex justify-between'>
                                        <p className='text-[#081342]'>{dt.like} Likes</p>
                                        <div className='flex gap-4 text-[#4A4A4A]'>
                                            <p>{dt.comment_list?.length || 0} comments</p>
                                            <p>{dt.share} shares</p>
                                        </div>
                                    </div>
                                    <Separator className=" bg-[#8C8585] w-full" />
                                    <div className='flex justify-between'>

                                        <Button variant="ghost">
                                            <div className='flex gap-1 items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                                </svg>
                                                Like
                                            </div>
                                        </Button>
                                        <Button variant="ghost">
                                            <div className='flex gap-1 items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                                </svg>

                                                Comment
                                            </div>
                                        </Button>
                                        <Button variant="ghost">
                                            <div className='flex gap-1 items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                                </svg>

                                                Share
                                            </div>
                                        </Button>
                                    </div>
                                    <Separator className=" bg-[#8C8585] w-full" />
                                    <div className='flex flex-col gap-5'>
                                        {dt.comment_list?.map((comment: any, index: any) => (
                                            <div className='flex justify-between' key={index}>
                                                <div className='flex gap-4'>
                                                    <Image src={comment.user.avatar} alt='Logo' width={45} height={45} className='h-[45px] w-[45px] rounded-full object-cover' />
                                                    <div className='flex flex-col gap-1'>
                                                        <p className='text-sm font-bold text-[#081342] flex gap-1 items-center'>{comment.user.last_name} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                                        </svg>
                                                            <p className='text-xs text-[#8C8585]'>{formatDistanceToNow(new Date((comment.created_at)), { addSuffix: true, locale: vi })}</p>
                                                        </p>
                                                        <div className='flex gap-1'>
                                                            {comment?.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost">
                        <div className='flex gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg>

                            Share
                        </div>
                    </Button>

                </div>
                <Separator className=" bg-[#8C8585] w-full" />
                <Comment comment_list={dt.comment_list}/>
            </div>
        </div>
    )
}

export default PostSocial