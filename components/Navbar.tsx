'use client'
import React from 'react'

import { UserNav } from './user-nav';
import { ModeToggle } from './ModeToggle';
import { SidebarTrigger } from './ui/sidebar';


const Navbar = () => {

  return (
   
    <div className='fixed top-5 z-20 w-full mx-auto '>
      <nav className='relative max-w-xs md:max-w-xs mx-auto flex gap-2 bg-background  items-center  border rounded-2xl justify-evenly p-1' >
      <SidebarTrigger className="z-30 md:hidden  bg-background"></SidebarTrigger>
        <a href='/'><p className='font-bold my-2'>Home</p></a>
        {/*  <a href='register'><p className='font-bold my-2'>register</p></a>
        <a href='login'><p className='font-bold my-2'>login</p></a> */}
        <a href='/inventory'><p className='font-bold my-2'>About</p></a>
        <ModeToggle></ModeToggle>
        <UserNav></UserNav>
      </nav>
    </div>



  )
}
export default Navbar


