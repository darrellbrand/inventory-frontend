'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
type Props = {}

const HomePage = (props: Props) => {

  useEffect(() => {
    const getToken = async () => {
    const tokenResponse =  fetch('http://localhost:3000/api/storeToken', {
        credentials: 'include',
        cache: 'no-store',
        method: 'GET',


      });
      const data = (await tokenResponse).json()
    }
    getToken()

  }
  ), [];

  return (
    <div className='relative' style={{ width: "100vw", height: "70vh" }}>
      <div className='-z-10'>
        <Image
          src="/clock-7258194_1280.jpg"
          alt="Banner Image"
          layout='fill'
          priority
          style={{ objectFit: 'fill', objectPosition: 'center' }}
        />
      </div>
      <div className='relative flex place-content-start'>
        <h2 className='mt-16 font-bold text-6xl ml-20'>Archon Inventory Control</h2>
      </div>
    </div>
  );
}
export default HomePage