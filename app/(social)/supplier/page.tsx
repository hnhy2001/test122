import LoadMore from '@/components/LoadMore'
import SearchBar from '@/components/Search'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { getRequest } from '@/hook/api'
import { ISupplier } from '@/type/supplier.interface'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: "Supplier",
    description: "Supplier"
};


const Supplier = async (props: any) => {
    const page = +props?.searchParams?.page || 1
    const limit = 4 * page
    const keyword = props?.searchParams?.keyword || ' '
    const [supplierData, countryData] = await Promise.all([
        getRequest('/supplier/list?limit=' + limit+ '&keyword=' + keyword),
        getRequest('/config/countries')
    ]);
    const suppliers: ISupplier[] = supplierData?.basic_supplier
    const countries: any[] = countryData?.data;
    return (
        <div className='container'>
            <div className='relative'>
                <Image src={'/banner2.png'} alt='Jeollanamdo' width={1683} height={547} className='w-full h-52 object-cover' />
                <div className='absolute flex flex-col gap-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 text-white text-center'>
                    <p className='font-bold text-2xl'>Jeollanamdo</p>
                    <p>We delivery nature, health, and the taste of Korea </p>
                    <div>
                        <Button className='text-[#081440]' variant={'outline'}>View details</Button>
                    </div>
                </div>
            </div>
            <p className='text-3xl font-bold py-7 text-[#081440]'>Suppliers</p>
            <div>
                <SearchBar placeholder='Search Suppliers' api='/sdf' />
            </div>
            <p className='py-3 text-[#081342]'>{supplierData.total_record + " Results"}</p>
            <div className='grid grid-cols-2  md:grid-cols-4 gap-5'>
                {suppliers.map((pd: ISupplier) => {
                    const country = countries.find(country => country.code == pd.supplier_country.code)
                    return (
                        <div className='flex flex-col gap-4 shadow-lg rounded-lg p-5' key={pd.code}>
                            <Link target='_blank' href={"/supplier/" + pd.supplier_name.split(" ").join("-") + "-*" + pd.supplier_code} className='flex flex-col gap-2'>
                                <Image src={pd.avatar} alt={pd.name} width={266} height={266} className='aspect-video w-full object-cover' />
                                <div className='flex gap-3 justify-between'>
                                    <div>
                                        <p className='font-bold text-[#081440]'>{pd.supplier_name}</p>
                                        <div className='flex gap-2 items-center'>
                                            <Image src={country?.image} alt='flag' width={21} height={18} className='w-6 h-5' />
                                            <p className='font-bold text-xs'>{country?.name}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <Image src={pd.supplier_avatar} alt={pd.supplier_name} width={62} height={62} className='aspect-square w-16 object-cover' />
                                </div>
                                {/* <p className='font-bold text-xs text-[#939AA1]'>{pd.supplier_name}</p> */}
                                {/* <div className='flex gap-1'>
                                    {[1, 2, 3, 4, 5, 6].map((vl: any) => (<Image key={vl} src={pd.supplier_avatar} alt='logo' width={16} height={16} className='w-4 h-4' />))}
                                </div> */}
                                <Link className='flex gap-6 items-center justify-between' href={"/product/" + pd.name.split(" ").join("-") + "-*" + pd.code }>
                                    <div className='flex gap-3 items-center'>
                                        <Image src={pd.avatar} alt={pd.name} width={56} height={56} className='w-14 h-14 aspect-square object-cover' />
                                        <p className='text-xs font-semibold'>{pd.name}</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </Link>

                            <div className='flex gap-2 items-center'>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            Contact now
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className='!max-w-[40%] h-[70vh] p-0'>
                                        <div className='h-[70vh] flex flex-col py-6 p-10'>
                                            <p className='text-xl font-bold '>Choose a Representative</p>
                                            <p className='text-xl py-4 '>Choose a representative to contact.</p>
                                            <div className='p-6 flex-1 h-full overflow-auto flex flex-col gap-8'>
                                                {
                                                    [1, 2, 3, 4, 5].map((_, index: any) => (
                                                        <div className='flex flex-col gap-3' key={index}>
                                                            <div className='flex gap-3 justify-between items-center'>
                                                                <div className='flex gap-5 items-center'>
                                                                    <Image src={pd.supplier_avatar} alt='flag' width={64} height={64} className='w-16 h-16' />
                                                                    <div>
                                                                        <p className='font-bold text-[#081440]'>{pd.name}</p>
                                                                        <p className='font-bold text-[#908E8E]'>Export Manager</p>
                                                                    </div>
                                                                </div>
                                                                <Checkbox />
                                                            </div>
                                                            <p>Hi! I'm Silvia. Send me your business card if you are interested in a collaboration and I will reach out to you!</p>
                                                            <div className='flex gap-1 items-center'>
                                                                {
                                                                    [1, 2, 3, 4, 5].map((_, index: any) => (
                                                                        <Image key={index} src={'/555.png'} alt='555' width={40} height={40} className='w-10 h-10' />
                                                                    ))
                                                                }
                                                                <p>+30</p>
                                                            </div>
                                                            <p className='flex gap-1 items-center'>View products
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                                </svg>
                                                            </p>
                                                        </div>
                                                    ))
                                                }

                                            </div>
                                            <div className='flex gap-1 justify-end pt-8'>
                                                <Button variant={'outline'}>Book a Meeting</Button>
                                                <Button>Send Message</Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                {/* <Image src={'/folder.png'} width={24} height={24} className='h-6 w-6' alt='folder' /> */}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='flex justify-center text-[#081342] py-20'>
                {
                    suppliers.length < supplierData?.total_record &&
                    <Link scroll={false} href={'/supplier?page=' + (+page + 1)}>
                       <LoadMore />
                    </Link>
                }
            </div>
        </div>
    )
}

export default Supplier