import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Container from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import Link from '@/components/ui/link'
import Spinner from '@/components/ui/spinner'
import { useAppSelector } from '@/hooks/storeHooks'
import { AlertCircleIcon } from 'lucide-react'

const ForgetPassword = () => {
    const { isLoading, error } = useAppSelector((state) => state.auth);
  return (
    <Container>
      <Card>
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
      </Card>
    </Container>
  )
}

export default ForgetPassword