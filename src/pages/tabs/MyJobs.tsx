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
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { addJobAsync, jobAsync } from "@/modules/transport/jobSlice";
import type { JobType } from "@/types/JobType";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Form, useForm, type SubmitHandler } from "react-hook-form";
type JobTypeForm = {} & Omit<JobType, "id" | "postedDate" | "status">;
const DialogAddJob = () => {
  const { isLoading } = useAppSelector((state) => state.job);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobTypeForm>();
  const onSubmit: SubmitHandler<JobTypeForm> = (data) =>
    dispatch(addJobAsync(data))
      .unwrap()
      .then(() => {
        dispatch(jobAsync());
        setIsOpen(false);
        setValue("job_description", null);
        setValue("job_title", null);
      });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <Label>Job Title</Label>
          <Input
            {...register("job_title", { required: "Title is required" })}
            error={errors.job_title?.message}
          />
          <Label>Job Description</Label>
          <Textarea {...register("job_description")} />

          <Button type="submit" isLoading={isLoading}>
            Add This Job
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const MyJobs = () => {
  const { jobs, isLoading, error } = useAppSelector((state) => state.job);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(jobAsync());
  }, [dispatch]);
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
            {jobs.map((job) => (
              <Job
                id={job.id}
                key={job.id}
                job_title={job.job_title}
                job_description={job.job_description}
                job_status={job.job_status}
                postedDate={job.postedDate}
              />
            ))}
          </ScrollArea>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default MyJobs;
