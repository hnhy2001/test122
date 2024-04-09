'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'

const LoadMore = () => {
    const [loading, setLoading] = useState(false)
    const params = useParams<{ tag: string; item: string }>()


    useEffect(()=>{
        setLoading(false)
    },[params, setLoading])
    return (
        <div>
            {
                loading ? <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> :
                    <Button onClick={() => setLoading(true)} variant='outline' size={'lg'}>Load more</Button>
            }
        </div>
    )
}

export default LoadMore