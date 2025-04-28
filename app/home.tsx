'use client'
import { VortexDemo } from '@/components/VortexHome';
import React, { useState, useEffect } from 'react';

type Props = {}

const HomePage = (props: Props) => {

  return (
    <div className='relative min-h-screen  w-screen  flex flex-col items-center justify-center text-center '>
      <VortexDemo></VortexDemo>
    </div>
  );
}
export default HomePage