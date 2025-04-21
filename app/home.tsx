'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { fetchToken, getToken } from './actions/actions'
type Props = {}

const HomePage = (props: Props) => {

  useEffect(() => {
    fetchToken()
  },
    []);

  return (
    <div className='relative bg-red-50 min-h-screen w-full flex flex-col items-start justify-start'>
      <Image className='object-cover object-center'
        src="/clock-7258194_1280.jpg"
        alt="Banner Image"
        fill
        priority
      />
      <h2 className='z-10  mt-40 font-bold text-6xl ml-32 '>Archon Inventory Control</h2>
    </div>
  );
}
export default HomePage