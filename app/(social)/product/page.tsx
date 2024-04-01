import LoadMore from '@/components/LoadMore'
import SearchBar from '@/components/Search'
import { Button } from '@/components/ui/button'
import { getRequest } from '@/hook/api'
import { IProduct } from '@/type/product.interface'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: "Product",
    description: "Product"
};


const Product = async (props: any) => {
    const page = +props?.searchParams?.page || 1
    const keyword = props?.searchParams?.keyword || ' '
    const limit = 6 * page
    const [productData, countryData] = await Promise.all([
        getRequest('/product/list?limit=' + limit + '&keyword=' + keyword),
        getRequest('/config/countries')
    ]);
    const products: IProduct[] = productData?.data
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
            <p className='text-3xl font-bold py-7 text-[#081440]'>Products</p>
            <div>
                <SearchBar placeholder='Search products' api='/sdf' />
            </div>
            <p className='py-3 text-[#081342]'>{productData?.total_record + " Results"}</p>
            <div className='grid grid-cols-2 md:grid-cols-6 gap-4'>
                {products.map((pd: any) => {
                    const country = countries.find(country => country.code == pd.origin_country.code)
                    return (
                        <Link href={"/product/" + pd.name.split(" ").join("-") + "-*" + pd.code} className='flex flex-col gap-1' key={pd.code}>
                            <Image src={pd.avatar} alt={pd.name} width={266} height={266} className='aspect-square w-full object-cover' />
                            <p className='font-bold text-[#081440]'>{pd.name}</p>
                            {
                                Object.keys(pd.summary).map((key:any)=>(

                                    <p key={key} className='font-bold text-xs text-[#939AA1]'>{key}: {pd.summary[key]}</p>
                                ))
                            }
                            <div className='flex gap-2 items-center'>
                                <Image src={country.image} alt='flag' width={21} height={18} className='w-6 h-5' />
                                <p className='font-bold text-xs'>{country.name}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className='flex justify-center text-[#081342] py-20'>
                {
                    products.length < productData?.total_record &&
                    <Link scroll={false} href={'/product?page=' + (+page + 1)}>
                        <LoadMore />
                    </Link>
                }
            </div>
        </div>
    )
}

export default Product