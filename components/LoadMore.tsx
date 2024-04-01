'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

const LoadMore = () => {
    const [loading, setLoading] = useState(false)
    return (
        <div>
            {
                loading ? <Button disabled size={'lg'}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button> :
                    <Button onClick={() => setLoading(true)} variant='outline' size={'lg'}>Load more</Button>
            }
        </div>
    )
}

export default LoadMore