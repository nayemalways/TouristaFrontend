import { z } from "zod";

// Form Zod Schema
export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least  characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least  characters.",
  }),
  division: z.string().min(24, {
    message: "Please select a division",
  }),
  tourType: z.string().min(24, {
    message: "Please select a Tour Type",
  }),
  startDate: z.date({ message: "Start date required" }),
  endDate: z.date({ message: "End date required" }),
  included: z.array(
    z.object({
      value: z.string().min(1, "Please include something or remove this filed!")
    })
  )
});