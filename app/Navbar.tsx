'use client'
import React from 'react'
import Image from 'next/image';

import { useSession } from "next-auth/react"
import { UserNav } from './user-nav';
type Props = {}

const Navbar = (props: Props) => {
  
  return (
    <nav className='sticky top-0  border-b rounded-md  bg-black z-20' >
      <div className='flex place-content-center  gap-4 p-2 '>
      <Image className=''
            src="/logo-white.png"
            alt="Banner Image"
            width={100}
            height={20}
            style={{ height: 'auto' , width: 'auto'
            }}
          />
        <a href='/'><p className='font-bold my-2'>home</p></a>
      {/*  <a href='register'><p className='font-bold my-2'>register</p></a>
        <a href='login'><p className='font-bold my-2'>login</p></a> */}
        <a href='/inventory'><p className='font-bold my-2'>notes</p></a>
        <a href='/addNote/-1'><p className='font-bold my-2'>add note</p></a>
        <a href='/chat'><p className='font-bold my-2'>chat</p></a>
       <UserNav></UserNav>
      </div>
    </nav>
  )
}
export default Navbar


 