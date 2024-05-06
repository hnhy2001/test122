'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import Image from 'next/image'
import { ChevronsUpDown, Loader2 } from 'lucide-react'
import { Input } from './ui/input'
import { getRequest } from '@/hook/apiClient'
import { Skeleton } from './ui/skeleton'

const ProductCategory = ({ category, setCategory }: any) => {
    const [openCombobox, setOpenCombobox] = useState(false)
    const [input, setInput] = useState<any>('')
    const [loadingSearch, setLoadingSearch] = useState(false)
    const [categories, setCategoryies] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState<any>(999);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchData = () => {
        getRequest(`/product/list-category-level-3?keyword=${input}&page=${page}&limit=5`)
            .then(data => {
                setPage(prev => prev + 1)
                setTotal(() => data?.total_records);
                setCategoryies((prev: any) => [...prev, ...data?.data]);
                setLoading(false)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        const handleScroll = () => {
            const container = document.getElementById('myContainer');
            if (container) {
                const { scrollTop, scrollHeight, clientHeight } = container;
                if (scrollHeight - scrollTop - clientHeight < 200) {
                    if (!loading && categories.length < total) {
                        setLoading(true);
                    }
                }
            }
        };

        const container = document.getElementById('myContainer');
        if (container && openCombobox) { // Thêm điều kiện kiểm tra popover đã mở hay chưa
            container.addEventListener('scroll', handleScroll);

            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [loading, categories, total]);
    useEffect(() => {
        if (loading) {
            fetchData()
        }
    }, [loading])
    useEffect(() => {
        if (openCombobox && categories.length == 0) {
            setPage(2)
            setLoadingSearch(true)
            getRequest(`/product/list-category-level-3?keyword=&page=1&limit=5`).then((data: any) => {
                setTotal(() => data?.total_records);
                setCategoryies(data.data)
                setLoadingSearch(false)
            }
            );
        }
    }, [openCombobox]);

    return (
        <Popover open={openCombobox} onOpenChange={setOpenCombobox} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCombobox}
                    className="w-full justify-between h-14"
                >
                    {category
                        ? <div className="flex gap-3 items-center justify-between w-full">
                            <div className="flex flex-col items-start">
                                <strong>{category.name}</strong>
                            </div>
                            <Image
                                src={category.avatar}
                                alt={category.name}
                                width={24}
                                height={24}
                            />
                        </div>
                        : <div className='text-[#acafb3] font-normal text-xl'>Select category...</div>}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-6rem)] xs:w-[calc(60vw-6rem)] p-0">
                <div className="w-full p-4">
                    <div className="pb-4">
                        <Input placeholder="Type keyword then hit enter to search" onChange={e => {
                            setInput(e.target.value)
                        }} onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setPage(2)
                                setLoadingSearch(true)
                                getRequest(`/product/list-category-level-3?keyword=${input}&page=1&limit=5`).then((data: any) => {
                                    setCategoryies(data.data)
                                    setLoadingSearch(false)
                                }
                                );
                            }
                        }} />

                    </div>
                    {/* <CommandInput /> */}
                    <div id='myContainer' className="overflow-auto h-[18rem]" ref={containerRef}>
                        {
                            !loadingSearch && (categories.length == 0) && <div className="text-xl font-bold text-center py-7">No category found.</div>
                        }
                        {
                            loadingSearch ?
                                <div className="flex items-center justify-center pt-6">
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                </div>
                                :
                                categories.map((category: any, index: any) => (
                                    <div
                                        key={category.code + "*" + index}
                                        // value={category.code + "*" + index}
                                        className="w-full border-b border-gray-200 cursor-pointer"
                                        onClick={(e: any) => {
                                            setCategory(
                                                categories.find((c: any) => c.code == category.code)
                                            );
                                            setOpenCombobox(false)
                                        }}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex flex-col">
                                                <strong>{category.name}</strong>
                                                <p className="text-gray-400 break-all">{category.description}</p>
                                                <p className="text-gray-400 break-words">{category.category_path}</p>
                                            </div>
                                            <Image
                                                src={category.avatar}
                                                alt={category.name}
                                                width={32}
                                                height={32}
                                                className="h-20 w-20 object-contain"
                                            />
                                        </div>
                                    </div>
                                ))
                        }
                        {loading && (
                            <div className="flex flex-col gap-3 w-full">
                                <Skeleton className="h-5 w-full px-3 py-2" />
                                <Skeleton className="h-5 w-full px-3 py-2" />
                                <Skeleton className="h-5 w-full px-3 py-2" />
                            </div>
                        )}
                    </div>



                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ProductCategory