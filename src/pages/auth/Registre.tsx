import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from '@/components/ui/link'
import React from 'react'

const Registre = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className='flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-lg items-center'>
        <h1 className='text-2xl font-semibold'>Get started with Registre</h1>
        <Input placeholder='Email' />
        <Input placeholder='Password'/>
        <Button  size={"lg"} className='w-full'>Registre</Button>
        <div className='flex gap-4 text-sm justify-between w-full'>
           <Link href="">I forget password ?</Link>
           <Link href="">I dont have account</Link>
        </div>
      </div>
    </div>
  )
}

export default Registre