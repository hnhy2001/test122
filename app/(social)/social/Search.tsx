'use client'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';



const SocialMarketplaceSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [select, setSelect] = useState('All')
  const [data, setData] = useState([])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
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
          <Select onValueChange={(e) => setSelect(e)} value={select} defaultValue='All'>
            <SelectTrigger className="w-32 border-b px-7 py-3 bg-[#E7D8D8] rounded-2xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Products">Products</SelectItem>
                <SelectItem value="Suppliers">Suppliers</SelectItem>
                <SelectItem value="Buyers">Buyers</SelectItem>
                <SelectItem value="RFQs">RFQs</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
            <Input
              type="text"
              className="flex px-7 py-3 bg-[#E7D8D8] rounded-2xl w-full leading-5 pl-8"
              placeholder={'Search social marketplact'}
              onClick={toggleCommandList}
              onChange={handleInputChange}
            />

        </div>
        <ul className={`absolute z-10 w-full bg-white top-12 list-none rounded-md shadow-md ${isOpen ? '' : 'hidden'}`}>
          <li className="px-3 py-2 hover:bg-gray-100 cursor-pointer">sdf</li>
        </ul>
      </div>
    </div>
  );
};

export default SocialMarketplaceSearch;
