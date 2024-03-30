import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#081342]'>
      <div className='container grid grid-cols-1 md:grid-cols-3 items-center gap-16 py-9'>
        <Image src={'/logo2.png'} alt='logo' width={191} height={72} />
        <div className='flex flex-col gap-4 pt-5 col-span-2'>
          <div className='flex gap-16 text-white font-bold'>
            <p>Data & Analytics</p>
            <p>Insights</p>
            <p>Social Marketplace</p>
            <p>Fulfillment Solution</p>
          </div>
          <div className='flex gap-16 text-[#939AA1] font-bold uppercase'>
            <p>FAQ</p>
            <p>Contact Us</p>
            <p>About Tridge</p>
            <p>Expertise exchangwe</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer