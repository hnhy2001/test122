'use client'
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


interface PropsSearch {
    placeholder: string;
    api: string
}


const SearchBar = ({ placeholder, api }: PropsSearch) => {
    const [loading, setLoading] = useState(false)
    const route = useRouter()
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true)
        route.push('?keyword=' + event.target.value, { scroll: false })
        setTimeout(() => {
            setLoading(false);
        }, 1000)
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
                    endIcon={() => loading ? <Loader2 className='h-5 w-5 animate-spin' /> : <div></div>}
                />
            </div>
        </div>
    );
};

export default SearchBar;
