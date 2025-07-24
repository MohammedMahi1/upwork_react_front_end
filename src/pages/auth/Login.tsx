import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from '@/components/ui/link'
import Spinner from '@/components/ui/spinner'
import { useAppSelector } from '@/hooks/storeHooks'
const Login = () => {
  const {isLoading} = useAppSelector(state => state.auth)
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className='flex flex-col gap-4 w-96 p-4 bg-white rounded-lg shadow-lg items-center'>
        <h1 className='text-2xl font-semibold'>Get started with login</h1>
        <Input placeholder='Email' />
        <Input placeholder='Password'/>
        <Button  size={"lg"} className='w-full'>{isLoading ? <Spinner/>:"Login"}</Button>

        <div className='flex gap-4 text-sm justify-between w-full'>
           <Link href="/reset-password">I forget password ?</Link>
           <Link href="/register">I dont have account</Link>
        </div>
      </div>
    </div>
  )
}

export default Login