'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
const Comment = ({ comment_list }: any) => {
    const [isFull, setIsFull] = useState(false)
    return (
        <>
            <div className='flex flex-col gap-5'>
                {comment_list.slice(0, isFull ? comment_list.length : 1)?.map((comment: any, index: any) => (
                    <div className='flex justify-between' key={index}>
                        <div className='flex gap-4'>
                            <Image src={comment.user.avatar} alt='Logo' width={44} height={44} className='h-11 w-11 rounded-full object-cover' />
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
                {
                    !isFull && comment_list.length > 0 &&
                    <div className='flex gap-4'>
                        <div className='h-11 w-11'></div>
                        <div onClick={() => setIsFull(true)} className='underline text-xs text-[#081342] cursor-pointer'>Load more</div>
                    </div>
                }

            </div>
        </>
    )
}

export default Comment