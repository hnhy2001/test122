'use client'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getRequest } from '@/hook/apiClient';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';



const SocialMarketplaceSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [select, setSelect] = useState('ALL')
  const [data, setData] = useState<any>({})

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getRequest(`/social/search?category_code=${event.target.value}&type=${select}`)
      .then(data => setData({ ...data })
      )
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
            <SelectTrigger className="w-32 border-b px-7 py-3 bg-[#E7D8D8] rounded-2xl">
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
            startIcon={() => <Search className='h-5 w-5'/>}
          />

        </div>
        <ul className={`absolute z-10 w-full bg-white top-12 list-none p-4 rounded-md shadow-md ${isOpen ? '' : 'hidden'}`}>
          {
            Object.keys(data).map((dt: any) => {
              return <div className='flex flex-col'>
                {data[dt]?.map((d: any) => <Link href={'/' + d.user_code} target='_blank' className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{d.user_name}</Link>
                )}
              </div>
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default SocialMarketplaceSearch;
