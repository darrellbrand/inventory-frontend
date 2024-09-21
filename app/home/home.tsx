import React from 'react'
import Image from 'next/image';
type Props = {}

const HomePage = (props: Props) => {
    return (
        <div className='relative ' style={{width:"100vw", height: "70vh"}}>
            <div className='-z-10'>
          <Image 
            src="/clock-7258194_1280.jpg"
            alt="Banner Image"
            layout="fill"
            objectFit="fill"
            objectPosition='center'
            priority
          />
          </div>
          <div className='relative flex place-content-center'>
          <h2 className='mt-32 font-bold text-6xl'>Inventory Control</h2>
          </div>
          </div>
      );
}
export default HomePage