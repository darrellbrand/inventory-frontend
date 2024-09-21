
import React from 'react'
import Image from 'next/image';

import { useSession } from "next-auth/react"
import { UserNav } from './user-nav';
type Props = {}

const Navbar = (props: Props) => {
  
  return (
    <nav className=' border-b rounded-md mr-1 ml-2 h-22' >
      <div className='flex place-content-center  gap-4 p-2'>
      <Image className=''
            src="/logo-white.png"
            alt="Banner Image"
            width={100}
            height={20}
            style={{ height: 'auto' , width: 'auto'
            }}
          />
        <a href='home'><p className='font-bold my-2'>home</p></a>
        <a href='register'><p className='font-bold my-2'>register</p></a>
        <a href='login'><p className='font-bold my-2'>login</p></a>
        <a href='inventory'><p className='font-bold my-2'>test inventory</p></a>
       <UserNav></UserNav>
      </div>
    </nav>
  )
}
export default Navbar


 