
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
type SpinnerProps = {} & React.ComponentProps<"div">

const Spinner = ({className,...props}:SpinnerProps) => {
  return (
    <div className={cn("animate-spin",className)} {...props}>
      <LoaderCircle />
    </div>
  );
};

export default Spinner;
