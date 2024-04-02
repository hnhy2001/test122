'use client'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { getRequest } from '@/hook/apiClient';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const formatSearch = (data: any) => {
  const { buyer, post, product, rfq, supplier } = data
  let search: any = []
  product && product.forEach((element: any) => {
    search.push({
      name: element.name,
      href: "/product/" + element.name.split(" ").join("-") + "-*" + element.code
    })
  });
  buyer?.data && buyer?.data.forEach((element: any) => {
    search.push({
      name: element.name,
      href: "/buyer/" + element.name.split(" ").join("-") + "-*" + element.code
    })
  });
  rfq && rfq.forEach((element: any) => {
    search.push({
      name: element.name,
      href: "/rfq/" + element.name.split(" ").join("-") + "-*" + element.code
    })
  });
  supplier?.basic_supplier && supplier?.basic_supplier.forEach((element: any) => {
    search.push({
      name: element.name,
      href: "/supplier/" + element.name.split(" ").join("-") + "-*" + element.code
    })
  });
  return search
}


const SocialMarketplaceSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [select, setSelect] = useState('ALL')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    getRequest(`/social/search?keyword=${event.target.value||' '}&type=${select}`)
      .then((data: any) => {
        setData(formatSearch(data))
        setLoading(false)
      })
  };

  const toggleCommandList = () => {
    setIsOpen(true);
  };
  const handleClickOutside = (event: any) => {
    if (event.target.closest('.command-container')) return;
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="command-container z-10">
      <div className="bg-transparent w-full relative">
        <div className='flex gap-2'>
          <Select onValueChange={(e) => setSelect(e)} value={select} defaultValue='ALL'>
            <SelectTrigger className="w-40 border-b px-7 py-3 bg-[#E7D8D8] rounded-2xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="PRODUCT">Products</SelectItem>
                <SelectItem value="Suppliers">Suppliers</SelectItem>
                <SelectItem value="BUYER">Buyers</SelectItem>
                <SelectItem value="SUPPLIER">RFQs</SelectItem>
                <SelectItem value="POST">Posts</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            type="text"
            className="flex px-8 py-3 bg-[#E7D8D8] rounded-2xl w-full leading-5 pl-8"
            placeholder={'Search social marketplact'}
            onClick={toggleCommandList}
            onChange={handleInputChange}
            startIcon={() => <Search className='h-5 w-5' />}
          />

        </div>
        <ul className={`absolute z-10 w-full bg-white top-12 list-none p-4 rounded-md shadow-md ${isOpen ? '' : 'hidden'}`}>
          {
            loading ? <div className='flex flex-col gap-3'>
              <Skeleton className="h-5 w-full px-3 py-2" />
              <Skeleton className="h-5 w-full px-3 py-2" />
              <Skeleton className="h-5 w-full px-3 py-2" />

            </div> : (
              <div className='flex flex-col max-h-[40vh] overflow-auto'>
                {
                  data.length >0?
                  data.map((d: any, index: any) => <Link key={index} href={d.href} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{d.name}</Link>)
                  :<div>Không có kết quả</div>
                }
              </div>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default SocialMarketplaceSearch;
