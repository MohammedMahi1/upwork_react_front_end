import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/hooks/storeHooks";
import { filterJobs } from "@/modules/transport/jobSlice";
import { Check, Clock, Filter, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";

export function PopOverFilter() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>
          <Filter />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="flex flex-col gap-2">
          <Badge
          variant={"completed"}
            onClick={() => {
              dispatch(filterJobs("completed"));
              setIsOpen(false);
            }}
          >
            <Check/>Completed</Badge>
          <Badge
          variant={"pending"}
            onClick={() => {
              dispatch(filterJobs("pending"));
              setIsOpen(false);
            }}
          >
           <Clock/> Pending
          </Badge>
          <Badge
            variant={"assigned"}
            onClick={() => {
              dispatch(filterJobs("assigned"));
              setIsOpen(false);
            }}
          >
            <Pen/>Assigned
          </Badge>
        </div>
      </PopoverContent>
    </Popover>
  );
}
