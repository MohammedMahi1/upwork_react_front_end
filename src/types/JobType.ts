export type JobType = {
  id: number | null;
  title: string | null;
  description: string | null;
  status: "pending" | "assigned" | "completed";
  postedDate: string | null;
};