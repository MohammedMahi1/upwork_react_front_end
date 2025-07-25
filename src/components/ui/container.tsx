import { cn } from "@/lib/utils";

type ContainerProps = {
    items?:"center" | "default"
} & React.ComponentProps<"div">

const Container = ({children,items = "center",className,...props}:ContainerProps) => {
  return (
    <div className={cn("dark:bg-black bg-white",items === "center" &&"flex min-h-svh flex-col items-center justify-center" ,className)} {...props}>
        {children}
    </div>
  )
}

export default Container