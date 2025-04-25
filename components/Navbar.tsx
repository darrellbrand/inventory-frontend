'use client'
import React from 'react'
import Image from 'next/image';

import { useSession } from "next-auth/react"
import { UserNav } from './user-nav';
import { ModeToggle } from './ModeToggle';
type Props = {}

const Navbar = (props: Props) => {

  return (
   
    <div className='fixed top-0 z-10 w-full mx-auto '>
      <nav className='relative max-w-xs md:max-w-xl mx-auto flex gap-2 bg-background  items-center  border rounded-2xl justify-center p-1' >
        <a href='/'><p className='font-bold my-2'>home</p></a>
        {/*  <a href='register'><p className='font-bold my-2'>register</p></a>
        <a href='login'><p className='font-bold my-2'>login</p></a> */}
        <a href='/inventory'><p className='font-bold my-2'>notes</p></a>
       
        <a href='/chat'><p className='font-bold my-2'>chat</p></a>
        <ModeToggle></ModeToggle>
        <UserNav></UserNav>
      </nav>
    </div>



  )
}
export default Navbar


