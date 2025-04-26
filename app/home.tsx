'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { fetchToken } from './actions/actions'
type Props = {}

const HomePage = (props: Props) => {

  useEffect(() => {
    fetchToken()
  },
    []);

  return (
    <div className='relative min-h-screen  w-screen  flex flex-col items-center justify-center bg-background text-center '>
      <h2 className='  font-bold text-4xl '>Archon Inventory Control</h2>
    </div>
  );
}
export default HomePage