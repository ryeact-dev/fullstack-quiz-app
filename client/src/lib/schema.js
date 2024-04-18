import { z } from 'zod';

// Question Schema
export const questionSchema = z.object({
  question: z.string().trim().min(1, {
    message: 'Question must not be empty.',
  }),
  answer: z.string().trim().min(1, {
    message: 'Question must not be empty.',
  }),
  subjectId: z.string().trim().min(1, {
    message: 'Subject must not be empty.',
  }),
});

// Subject Schema
export const subjectSchema = z.object({
  title: z.string().trim().min(1, {
    message: 'Subject Title must not be empty.',
  }),
});
