'use client'
import { Skeleton } from '@/components/ui/skeleton';
import { getRequest } from '@/hook/apiClient';
import React, { useEffect, useState } from 'react';
import PostSocial from './PostSocial';

const LoadMore = ({ length, total, user }: any) => {
    const [load, setLoad] = useState(false)
    const [page, setPage] = useState(2);
    const [data, setData] = useState<any>([]);
    const fetchData = () => {
        getRequest("/post/list" + "?limit=3&page=" + page)
            .then((data) => {
                setData((prev: any) => [...prev, ...data?.data]);
                setPage((prev) => prev + 1);

            })
            .catch((err) => console.log(err))
            .finally(() => setLoad(false));
    };
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollHeight - scrollTop - clientHeight < 300) {
                setLoad(true)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (load) {
            fetchData()
        }
    }, [load])

    return (
        <div>
            <div className="flex flex-col gap-3">
                {data.map((dt: any, index: any) => (
                    <PostSocial key={index} user={user} dt={dt} />
                ))}
            </div>
            <div className='py-3'>

                {
                    load && (length + data.length < total) && <div className="flex items-start gap-4 bg-white p-2 rounded-md">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className='w-full flex flex-col gap-3'>
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-[80%]" />
                            <Skeleton className="h-6 w-[70%]" />
                            <Skeleton className="h-6 w-[85%]" />
                            <Skeleton className="h-6 w-[60%]" />
                            <Skeleton className="h-6 w-[80%]" />
                            <Skeleton className="h-6 w-[20%]" />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default LoadMore;
