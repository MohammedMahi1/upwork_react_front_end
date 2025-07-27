export type JobType = {
  id: number | null;
  job_title: string | null;
  job_description: string | null;
  job_status: "pending" | "assigned" | "completed";
  created_at: Date | string | number;
};