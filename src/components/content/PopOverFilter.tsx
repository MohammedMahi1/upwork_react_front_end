import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Filter } from "lucide-react"

export function PopOverFilter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
                <Button
        variant={"ghost"}
        >
          <Filter />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <h1>sdcsdc</h1>
      </PopoverContent>
    </Popover>
  )
}
