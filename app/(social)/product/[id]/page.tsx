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
import Back from '@/components/Back';


const getProduct = cache(async (id: string) => {
  const product: any = await getRequest('/product/detail?code=' + id)
  return product;
});

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const id = params.id.split("*")[1]
  const product: any = await getProduct(id)

  return {
    title: product.product?.name,
    openGraph: {
      images: [],
    }
  }
}


const ProductDetail = async ({ params }: any) => {
  const id = params.id.split("*")[1]
  const { product, supplier, price_per_country, suggest_new_list, suggest_product_list, seasonality_data }: any = await getProduct(id)
  const [countryData] = await Promise.all([
    getRequest('/config/countries')
  ]);
  const countries: any[] = countryData?.data;
  return (
    <div className='py-11 container flex flex-col gap-4'>
      <p className='text-4xl pb-9 font-bold text-[#081440] flex gap-2 items-center'><Back /> Products</p>
      <div className='grid grid-cols-2 gap-6'>
        <Image key={product.galleries[0]} src={product.galleries[0]} alt={product.name} width={2000} height={2000} className='w-full aspect-square object-cover' />
        {
          product.galleries.slice(1,).map((pd: any) => (<Image key={pd} src={pd} alt={product.name} width={200} height={200} className='w-full h-auto object-contain' />))
        }
      </div>
      <p className='text-4xl text-[#4A4A4A] pt-7 font-bold'>{product.name}</p>
      <p className='text-3xl text-[#908E8E]'>{product.category_code}</p>
      <div className='flex gap-5 items-center'>
        <Image src={'/product-1.png'} alt={supplier.name} width={112} height={112} className='w-28 h-28' />
        <p className='text-2xl font-bold flex items-center gap-1'>{supplier.name}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg></p>
      </div>
      <div className='grid grid-cols-1  md:grid-cols-5 gap-14 relative'>
        <div className='col-span-3 flex flex-col gap-4'>
          <p className='text-3xl font-bold text-[#404040] pt-4'>Product Details</p>
          <p className=' text-[#404040] text-xl '>One of Items is high demand by Korea market Color: green skin or yellowish green skin Brix: 12 up Size: 6-10 pcs per carton box Packing: 12kg netweight</p>
          <table className='border-separate border-spacing-1 w-full'>
            <tbody>
              {
                Object.keys(product.detail).map((key: any) => (
                  <tr key={key} className='grid grid-cols-3'>
                    <td className='text-[#8C8585] text-xl col-span-1'>{key}</td>
                    <td className='text-[#404040] text-xl col-span-2'>{product.detail[key]}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          {
            supplier.company_detail && (
              <>
                <p className='text-3xl font-bold text-[#404040]'>Certifications</p>
                <div className='flex gap-5 items-center'>
                  <Image src={'/product-1.png'} alt={supplier.name} width={112} height={112} className='w-28 h-28' />
                  <p className='text-3xl font-bold flex items-center gap-1'>{supplier.name}</p>
                </div>
                <table className='border-separate border-spacing-1 w-full'>
                  <tbody>
                    {
                      Object.keys(supplier.company_detail).map((key: any) => (
                        <tr key={key} className='grid grid-cols-3'>
                          <td className='text-[#8C8585] text-xl col-span-1'>{key}</td>
                          <td className='text-[#404040] text-xl col-span-2'>{supplier.company_detail[key]}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </>
            )
          }
          <p className='text-3xl font-bold text-[#404040]'>About the Supplier</p>
          <div className='flex gap-5 items-center'>
            <Image src={'/product-1.png'} alt={supplier.name} width={112} height={112} className='w-28 h-28' />
            <div>
              <p className='text-2xl font-bold flex items-center gap-1'>{supplier.name}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
              </p>
              <div className='flex justify-between items-center'>
                <p>{supplier.follower_count} Followers</p>
                <Separator className='h-5 bg-gray-500' orientation="vertical" />
                <p>{supplier.product_count} Products</p>
              </div>
            </div>
          </div>
          <table className='border-separate border-spacing-1 w-full'>
            <tbody>
              {
                supplier.company_detail && Object.keys(supplier.company_detail).map((key: any) => (
                  <tr key={key} className='grid grid-cols-3'>
                    <td className='text-[#8C8585] text-xl col-span-1'>{key}</td>
                    <td className='text-[#404040] text-xl col-span-2'>{supplier.company_detail[key]}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>

          <p className='text-3xl font-bold text-[#404040]'>Relevant Data</p>
          <p className='text-2xl font-bold text-[#404040]'>Price data</p>
          <Image src='/855.png' alt='855' width={855} height={855} className="w-full h-auto" />
          <Table>
            <TableHeader className='text-lg font-semibold'>
              <TableRow>
                <TableHead>Market</TableHead>
                <TableHead>Product / Variety</TableHead>
                <TableHead>Other Conditions</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Last Reported Price</TableHead>
                <TableHead>Last Reported Date</TableHead>
                <TableHead>Price Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='text-lg'>
              {price_per_country.map((ppc: any, index: any) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{ppc.country}</TableCell>
                  <TableCell>{ppc.info.product_name}</TableCell>
                  <TableCell>{ppc.info.other_condition}</TableCell>
                  <TableCell>{ppc.info.origin}</TableCell>
                  <TableCell>{ppc.info.last_reported_price}</TableCell>
                  <TableCell>{ppc.info.last_reported_date}</TableCell>
                  <TableCell>{ppc.info.price_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className='text-3xl font-bold text-[#404040]'>Seasonality Data</p>
          <div className='px-14 flex flex-col gap-16'>
            {
              seasonality_data.map((seasonality: any, index: any) => {
                const country = countries.find(country => country.name == seasonality.country)
                return <div className='flex flex-col gap-7' key={index}>
                  <div className='flex justify-between items-center'>
                    <p className='text-xl font-bold flex gap-1 items-center'>
                      <Image src={country?.image} alt='flag' width={21} height={18} className='w-7 h-6' />
                      {seasonality.country}</p>
                    {
                      index == 0 ?
                        <Button>Hight Season</Button>
                        : <Button variant={'ghost'}>Off Season</Button>
                    }
                  </div>
                  <div className='grid grid-cols-12 gap-1'>
                    {Object.keys(seasonality.month_status).map((key: any, index: any) => (
                      <div key={index}>
                        <p className='font-bold text-xl text-center'>{MONTH[index]}</p>
                        <div className={`w-full h-3 ${seasonality.month_status[key] == 0 ? 'bg-white' : 'bg-[#081440]'} rounded-lg`}></div>
                      </div>
                    ))}
                  </div>
                  <p>VARIETIES: 1</p>
                </div>
              })
            }
          </div>
          <p className='text-3xl font-bold text-[#404040]'>Relevant Content</p>
          <div className='flex flex-col gap-14'>
            {suggest_new_list.map((news: any) => (
              <div className='flex flex-col gap-2' key={news.title}>
                <div>
                  <Badge>News</Badge>
                </div>
                <p className='font-bold text-2xl'>{news.title}</p>
                <div className='flex justify-between text-[#939AA1]'>
                  <p className='flex gap-1 items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg> Gabriela Cabezas
                  </p>
                  <p className='flex gap-1 items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                    {news.post_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='col-span-2 hidden md:block'>
          <div className='sticky h-80 rounded-lg top-4 flex flex-col gap-4'>
            <p className='text-3xl font-bold text-[#404040]'>Contact Supplier</p>
            <p className='text-2xl text-[#404040]'>Send to:</p>
            <div className='flex items-center gap-3'>
              <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='supplier' width={112} height={112} className='w-28 h-28 object-cover' />
              <p className='text-xl font-bold text-[#4A4A4A]'>{supplier.name + " . Supplier"}</p>
            </div>
            <div className='flex gap-5'>
              <Button className='w-full'>Send Message</Button>
              <Button className='w-full' variant={'outline'}>Book a Meeting</Button>
            </div>
          </div>
        </div>
      </div>
      <p className='text-3xl font-bold text-[#404040]'>Other products from the supplier</p>
      <div className='grid grid-cols-5 gap-4'>
        {suggest_product_list.map((pd: any) => {
          const country = countries.find(country => country.code == pd.origin_country.code)
          return (
            <Link target='_blank' href={"/product/" + pd.name.split(" ").join("-") + "-*" + pd.code} className='flex flex-col gap-1' key={pd.code}>
              <Image src={pd.avatar} alt={pd.name} width={266} height={266} className='aspect-square w-full object-cover' />
              <p className='font-bold text-[#081440]'>{pd.name}</p>
              <p className='font-bold text-xs text-[#939AA1]'>Variety: {pd.summary?.VARIETY}</p>
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
      <p className='text-3xl font-bold text-[#404040]'>Representatives</p>
      <div className='flex items-center gap-3'>
        <Image src={'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-rose-blackpink-cute-06.jpg'} alt='supplier' width={112} height={112} className='w-28 h-28 object-cover' />
        <p className='text-xl font-bold text-[#4A4A4A]'>{supplier.name + " . Supplier"}</p>
      </div>
      <div className='flex gap-4 underline items-center'>
        <p>{supplier.follower_count} Followers</p>
        <p>{supplier.product_count} Products</p>
        <Button>+ Follow</Button>
      </div>
      <p>Hi, you can contact me to request information on our products.</p>
      <div className='flex gap-5'>
        <Button variant={'outline'}>Book a Meeting</Button>
        <Button>Send Message</Button>
      </div>
    </div>
  )
}

export default ProductDetail