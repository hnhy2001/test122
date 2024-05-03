'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Loading from './Loading'

const LoadingShadown = () => {
    const [loading, setLoading] = useState(false)
    const params = useParams<{ tag: string; item: string }>()


    useEffect(()=>{
        setLoading(true)
    },[params, setLoading])
    return (
        <div>
            {
                loading && <Loading />
            }
        </div>
    )
}

export default LoadingShadown