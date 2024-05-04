'use client'
import Zoom from 'next-image-zoom'
import React from 'react'

const ImageZoom = ({ src }: any) => {
    return (
        <div className='w-28 h-28 cursor-pointer aspect-square'>
            <Zoom alt='image' objectFit={"contain"} src={src} width={700} height={700} className='object-cover h-full w-full'/>
        </div>
    )
}

export default ImageZoom