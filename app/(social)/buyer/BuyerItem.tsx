import SendMessage from '@/components/SendMessage'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BuyerItem = ({ pd, country }: any) => {
    return (
        <div className='flex flex-col gap-2 p-2 rounded-lg shadow-sm justify-between' key={pd.code}>
            <Link target='_blank' href={"/buyer/" + pd.name.split(" ").join("-") + "-i." + pd.code} className='flex flex-col gap-2'>
                <div className='flex gap-3 justify-between'>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <p className='font-bold text-[#081440] text-xl'>{pd.name}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Image src={country?.image} alt='flag' width={21} height={18} className='w-6 h-5' />
                            <p className='font-bold text-xs'>{country?.name}</p>

                        </div>
                    </div>
                    <Image src={pd.avatar} alt='Logo' width={62} height={62} className='aspect-square w-16 object-cover' />
                </div>
                <p className='font-bold text-base text-gray-700 line-clamp-2'>{Object.keys(pd.summary).map((key: any) => `${key}: ${pd.summary[key]}`).join(', ')}</p>


            </Link>
            <div className='flex gap-2 items-center'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            Contact now
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='!max-w-[80%] md:!max-w-[40%] h-[40vh] p-0'>
                        <div className='h-[40vh] flex flex-col py-10 p-10'>
                            <p className='text-xl font-bold '>Choose a Representative</p>
                            <p className='text-xl py-4 '>Choose a representative to contact.</p>
                            <div className='p-6 flex-1 h-full overflow-auto flex flex-col gap-8'>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex gap-3 ring-1 ring-blue-600 rounded-lg p-6 justify-between items-center'>
                                        <div className='flex gap-5 items-center'>
                                            <Image src={pd.representative.avatar} alt='flag' width={64} height={64} className='w-16 h-16 object-cover' />
                                            <div>
                                                <p className='font-bold text-[#081440]'>{pd.representative.last_name}</p>
                                                <p className='font-bold text-[#908E8E]'>Export Manager</p>
                                            </div>
                                        </div>
                                        <Checkbox />
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-1 justify-end pt-8'>
                                <SendMessage />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default BuyerItem