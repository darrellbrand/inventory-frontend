import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {}

const LoginForm = (props: Props) => {
  return (
    <div className='flex place-content-center mt-32'>
      <div className='w-1/3'>
        <div className='flex place-content-center'>
          <h3 className='font-bold p-4'>Login</h3>
        </div>
        <Input type='email' placeholder='email'></Input>
        <div className='flex place-content-center mt-16'>
          <Button>Login</Button>
        </div>
        <div className='flex place-content-center mt-6'>
          <a href='register'><p className='text-blue-700'>Sign up for Archon</p></a>
        </div>
      </div>
    </div>
  )
}

export default LoginForm