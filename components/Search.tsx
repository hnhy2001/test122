'use client'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getRequest } from '@/hook/apiClient';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


interface PropsSearch {
    placeholder: string;
    api: string
}

const SearchBar = ({ placeholder, api }: PropsSearch) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>({})

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        getRequest(`${api}${event.target.value}`)
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
                <Input
                    type="text"
                    className="flex px-8 py-3 bg-[#E7D8D8] rounded-2xl w-full leading-5 pl-8"
                    placeholder={placeholder}
                    onClick={toggleCommandList}
                    onChange={handleInputChange}
                    startIcon={() => <Search className='h-5 w-5' />}
                />

                <ul className={`absolute z-10 w-full bg-white top-12 list-none p-4 rounded-md shadow-md ${isOpen ? '' : 'hidden'}`}>
                    {
                        Object.keys(data).map((dt: any, index:any) => {
                            return <div key={index} className='flex flex-col'>
                                {data[dt]?.map((d: any, index:any) => <Link key={index} href={'/' + d.user_code} target='_blank' className="px-3 py-2 hover:bg-gray-100 cursor-pointer">{d.user_name}</Link>
                                )}
                            </div>
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default SearchBar;
