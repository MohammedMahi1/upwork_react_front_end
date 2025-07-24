import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from '@/components/ui/link'
import Spinner from '@/components/ui/spinner'
import { useAppSelector } from '@/hooks/storeHooks'
import { AlertCircleIcon } from 'lucide-react'
import React from 'react'

const ForgetPassword = () => {
    const { isLoading, error } = useAppSelector((state) => state.auth);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className='flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-lg items-center'>
        <h1 className='text-xl font-semibold'>You will resive a link on your email !</h1>
                {
          error && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )
        }
        <Input placeholder='Email' />
        <Button  size={"lg"} className='w-full' >
            {isLoading ? <Spinner /> : "Send Reset Link"}
        </Button>
        <div className='flex gap-4 text-sm justify-between w-full'>
           <Link href="/">Back to Login</Link>
           <Link href="/register">I dont have account</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword