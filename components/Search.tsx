'use client'
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';


interface PropsSearch {
    placeholder: string;
    api: string
}

const SearchBar = ({ placeholder, api }: PropsSearch) => {
    const route = useRouter()
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        route.push('?keyword=' + event.target.value)
    };


    return (
        <div className="command-container z-10">
            <div className="bg-transparent w-full relative">
                <Input
                    type="text"
                    className="flex px-8 py-3 bg-[#E7D8D8] rounded-2xl w-full leading-5 pl-8"
                    placeholder={placeholder}
                    onChange={handleInputChange}
                    startIcon={() => <Search className='h-5 w-5' />}
                />
            </div>
        </div>
    );
};

export default SearchBar;
