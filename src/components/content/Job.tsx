import type { JobType } from "@/types/JobType";
import { AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Check, Clock, Pen } from "lucide-react";
const Job = ({
  job_description,
  id,
  created_at,
  job_status,
  job_title,
}: JobType) => {
  return (
    <Card className="mb-2 py-3 px-4 gap-2" key={id}>
      <div className="flex items-center gap-3">
        <Label>Status</Label>
        <Badge variant={"outline"} className={cn("border-dashed",job_status === "pending"? "border-yellow-500": job_status === "assigned" ? "border-blue-500" : "border-green-500")}>
          {job_status === "pending" ? <Clock /> : job_status === "assigned" ? <Pen/> :job_status === "completed"&&<Check/>}
          {job_status}
        </Badge>
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
