import { z } from "zod";

export const AssessmentFilterSchema = z.object({
  category: z.enum(["All", "Screening Test", "Aptitude"]).optional(),
  search: z.string().trim().max(100).optional(),
});

export const CodeExecutionInputSchema = z.object({
  language: z.enum(["Java", "Python", "C++", "JavaScript", "TypeScript"]),
  code: z.string().min(1).max(20000),
  input: z.string().max(5000).optional(),
});
