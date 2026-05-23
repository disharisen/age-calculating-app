import z from "zod";

export const dobFormSchema = z.object({
  dob: z.date({ error: "Pick a valid date" }),
});

export type DobFormType = z.infer<typeof dobFormSchema>;
