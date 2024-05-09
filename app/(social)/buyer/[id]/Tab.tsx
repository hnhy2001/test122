'use client'
import Loading from '@/components/Loading'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const Tab = () => {
    const [type, setType] = useState(useSearchParams().get('type'))
    const route = useRouter()
    return (
        <div className='container'>
            {
                type != useSearchParams().get('type') && <div className="fixed h-screen w-screen opacity-50 bg-slate-100 z-40 top-0 right-0"><Loading /></div>
            }
            <div className=" flex gap-x-10">
                <div

                    className={`p-2 cursor-pointer ${!type || type == "overview" ? "border-b-2 border-black" : ""
                        }`}
                    onClick={() => {
                        setType('overview')
                        route.push("?type=overview", { scroll: false })
                    }}
                >
                    Overview
                </div>
                <div
                    className={`p-2 cursor-pointer ${type == "posts" ? "border-b-2 border-black" : ""
                        }`}
                    onClick={() => {
                        setType('posts')
                        route.push("?type=posts", { scroll: false })
                    }}

                >
                    Posts
                </div>
                <div
                    className={`p-2 cursor-pointer ${type == "products" ? "border-b-2 border-black" : ""
                        }`}
                    onClick={() => {
                        setType('products')
                        route.push("?type=products", { scroll: false })
                    }}

                >
                    Products
                </div>
                <div
                    className={`p-2 cursor-pointer ${type == "rfqs" ? "border-b-2 border-black" : ""
                        }`}
                    onClick={() => {
                        setType('rfqs')
                        route.push("?type=rfqs", { scroll: false })
                    }}

                >
                    RFQs
                </div>
            </div>
        </div>
    )
}

export default Tab