import Job from "@/components/content/Job";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
const DialogAddJob = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-10 border-dashed h-10 rounded-full  "
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Job</DialogTitle>
          <DialogDescription>
            Create a new job listing to attract potential candidates.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Label>Job Title</Label>
          <Input />
          <Label>Job Description</Label>
          <Textarea />

          <Button>Add This Job</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MyJobs = () => {
  return (
    <TabsContent value="my-jobs" className="w-130">
      <Card>
        <CardHeader>
          <CardTitle>My Jobs</CardTitle>
          <CardDescription>View and manage your jobs here.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <DialogAddJob />
        </CardContent>
        <CardFooter>
          <ScrollArea className="h-100 w-full ">
            <Job />
            <Job />
            <Job />
            <Job />
          </ScrollArea>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default MyJobs;
