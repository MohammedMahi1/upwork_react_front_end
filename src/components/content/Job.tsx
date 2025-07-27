
import type { JobType } from "@/types/JobType";
import { AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";
const Job = ({ job_description, id, postedDate, job_status, job_title }: JobType) => {
  return (
    <Card className="mb-2 py-3 px-4 border-dashed gap-2" key={id}>
      <AlertTitle>{job_title}</AlertTitle>
      <CardContent>
        <CardDescription>
          {job_description}
          {postedDate}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Badge className={cn("bg-amber-300 text-amber-800",job_status === "assigned" ?"bg-blue-300 text-blue-800" : job_status === "completed" && "bg-green-300 text-green-800")}>{job_status}</Badge>
      </CardFooter>
    </Card>
  );
};

export default Job;
