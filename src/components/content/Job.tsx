
import type { JobType } from "@/types/JobType";
import { AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";
const Job = ({ description, id, postedDate, status, title }: JobType) => {
  return (
    <Card className="mb-2 py-3 px-4 border-dashed gap-2" key={id}>
      <AlertTitle>{title}</AlertTitle>
      <CardContent>
        <CardDescription>
          {description}
          {postedDate}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Badge className="bg-amber-400 text-amber-800">{status}</Badge>
      </CardFooter>
    </Card>
  );
};

export default Job;
