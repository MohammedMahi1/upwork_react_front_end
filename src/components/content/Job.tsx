
import { AlertTitle } from '../ui/alert'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardFooter } from '../ui/card'

const Job = () => {
  return (
    <Card className='mb-2 py-3 px-4 border-dashed gap-2'>
        <AlertTitle>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque animi quaerat perferendis asperiores maxime ullam amet quidem aspernatur natus, officiis totam. Fugiat doloremque, laboriosam perferendis recusandae in pariatur. Error, ea. </AlertTitle>
        <CardContent>
            <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est nihil quaerat quo eaque ea consectetur expedita sit exercitationem placeat earum beatae accusantium, nemo in minus, velit sapiente rem suscipit quibusdam.
            </CardDescription>

        </CardContent>
         <CardFooter>
                <Badge className='bg-amber-400 text-amber-800'>pendding</Badge>
            </CardFooter>
    </Card>
  )
}

export default Job