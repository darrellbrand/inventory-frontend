import React from 'react'
import Image from 'next/image';
type Props = {}

const HomePage = (props: Props) => {
    return (
        <div className='relative' style={{width:"100vw", height: "70vh"}}>
            <div className='-z-10'>
          <Image 
            src="/clock-7258194_1280.jpg"
            alt="Banner Image"
            layout='fill'
            priority
            style={{  objectFit: 'fill', objectPosition: 'center'}}
          />
          </div>
          <div className='relative flex place-content-start'>
          <h2 className='mt-16 font-bold text-6xl ml-20'>Archon Inventory Control</h2>
          </div>
          </div>
      );
}
export default HomePage