import type { JobType } from "@/types/JobType";
import { AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";
import { Check, Clock, Pen } from "lucide-react";
const Job = ({
  job_description,
  id,
  created_at,
  job_status,
  job_title,
}: JobType) => {
  return (
    <Card className="mb-2 py-3 px-4 gap-1" key={id}>
      <div className="flex items-center flex-row justify-between gap-3">
        <Badge variant={"outline"} className={cn("border-dashed ",job_status === "pending"? "border-yellow-500": job_status === "assigned" ? "border-blue-500" : "border-green-500")}>
          {job_status === "pending" ? <Clock /> : job_status === "assigned" ? <Pen/> :job_status === "completed"&&<Check/>}
            {job_status}
        </Badge>
              <span className="text-[12px] text-muted-foreground">
        {new Date(created_at).toLocaleDateString("en-US")}
      </span >
      </div>

      <AlertTitle className="text-2xl">{job_title}</AlertTitle>
      <CardContent>
        <CardDescription>{job_description}</CardDescription>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default Job;
