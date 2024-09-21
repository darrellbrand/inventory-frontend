import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {}
export default function RegisterForm() {
    return (

        <div className='flex place-content-center mt-32'>
            <div className='w-1/3'>
                <div className='flex place-content-center'>
                    <h3 className='font-bold p-4'>Register</h3>
                </div>
                <Input type='email' placeholder='email'></Input>
                <div className='flex place-content-center mt-16'>
                    <Button>Register</Button>
                </div>
            </div>
        </div>)
}