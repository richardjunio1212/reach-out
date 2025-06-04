import { z } from 'zod';

export const createCounselingSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  remarks: z
    .string()
    .min(10, 'Remarks must be at least 10 characters')
    .max(1000, 'Remarks must not exceed 1000 characters'),
});
