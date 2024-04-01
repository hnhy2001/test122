import LoadMore from '@/components/LoadMore'
import SearchBar from '@/components/Search'
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
    title: "RFQS",
    description: "RFQS"
};


const RFQ = async (props: any) => {
    const page = +props?.searchParams?.page || 1
    const limit = 4 * page
    const keyword = props?.searchParams?.keyword || ' '

    const [rfqData] = await Promise.all([
        getRequest('/rfq/list?limit=' + limit + "&keyword=" + keyword),
    ]);
    const rfqs: IRFQ[] = rfqData?.data
    return (
        <div className='container'>
            <div className='flex justify-between py-7 items-center'>
                <p className='text-3xl font-bold text-[#081440]'>RFQS</p>
                <Link href={'/rfq/create-rfq'} target='_blank'>
                    <Button>+ Create RFQ</Button>
                </Link>
            </div>
            <div>
                <SearchBar placeholder='Search rfqs' api='/sdf' />
            </div>
            <p className='py-3 text-[#081342]'>{rfqData?.total * rfqs.length + " Results"}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                    rfqs.map((dt) => (
                        <div className='flex flex-col gap-4' key={dt.code}>
                            <div className='flex gap-3'>
                                <Link target='_blank' href={"/rfq/" + dt.name.split(" ").join("-") + "-*" + dt.code}>
                                    <Image src={dt.avatar} alt={dt.name} width={135} height={128} />
                                </Link>
                                <div className='flex flex-col gap-2'>
                                    <p className='italic text-[#6473B1]'>{dt.status}</p>
                                    <p className='text-xl text-[#081342] font-bold'>{dt.name}</p>
                                    <p className='flex gap-2 items-start'>
                                        <Image src={'/account.png'} alt='account' width={20} height={20} />
                                        <strong> Reqested by:</strong> {dt.buyer.name} </p>
                                    <p className='flex gap-2 items-start'>
                                        <Image src={'/ana.png'} alt='anlisynt' width={20} height={20} />
                                        <strong>Annual Revenue:</strong> USD {dt.revenue}M</p>
                                </div>
                                <div>
                                </div>
                            </div>
                            <Separator className="mb-2 bg-[#081342] w-2/3" />
                            <table className='border-separate border-spacing-1'>
                                <tbody>
                                    <tr>
                                        <td className='text-[#939AA1]'>Product Category</td>
                                        <td className='font-bold'>{dt.product_category_name}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-[#939AA1]'>Port of Destination</td>
                                        <td className='font-bold'>{dt.port_destination}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-[#939AA1]'>Sourcing Countries</td>
                                        <td className='font-bold'>{dt.source_country}</td>
                                    </tr>
                                    <tr>
                                        <td className='text-[#939AA1]'>Request Duration</td>
                                        <td className='font-bold'>{dt.shipment_date}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='pt-5'>
                                <Button>
                                    Submit Quote
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-center text-[#081342] py-20'>
                {
                    rfqs.length < rfqData?.total_record  &&
                    <Link scroll={false} href={'/rfq?page=' + (+page + 1)}>
                       <LoadMore />
                    </Link>
                }
            </div>
        </div>
    )
}

export default RFQ