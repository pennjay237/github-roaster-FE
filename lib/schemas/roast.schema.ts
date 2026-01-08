import { z } from 'zod';
import { VALIDATION_CONSTANTS } from '../constants/validation.constants';

export const roastSchema = z.object({
  username: z
    .string()
    .min(VALIDATION_CONSTANTS.GITHUB_USERNAME.MIN_LENGTH, {
      message: VALIDATION_CONSTANTS.GITHUB_USERNAME.ERROR_MESSAGES.REQUIRED,
    })
    .max(VALIDATION_CONSTANTS.GITHUB_USERNAME.MAX_LENGTH, {
      message: VALIDATION_CONSTANTS.GITHUB_USERNAME.ERROR_MESSAGES.TOO_LONG,
    })
    .regex(VALIDATION_CONSTANTS.GITHUB_USERNAME.PATTERN, {
      message: VALIDATION_CONSTANTS.GITHUB_USERNAME.ERROR_MESSAGES.INVALID,
    })
    .trim()
    .transform((val) => val.toLowerCase()),
  
  temperature: z
    .number()
    .min(VALIDATION_CONSTANTS.TEMPERATURE.MIN, {
      message: VALIDATION_CONSTANTS.TEMPERATURE.ERROR_MESSAGES.INVALID,
    })
    .max(VALIDATION_CONSTANTS.TEMPERATURE.MAX, {
      message: VALIDATION_CONSTANTS.TEMPERATURE.ERROR_MESSAGES.INVALID,
    })
    .default(VALIDATION_CONSTANTS.TEMPERATURE.DEFAULT)
    .transform((val) => parseFloat(val.toFixed(1))),
  
  customInstructions: z
    .string()
    .max(VALIDATION_CONSTANTS.CUSTOM_INSTRUCTIONS.MAX_LENGTH, {
      message: VALIDATION_CONSTANTS.CUSTOM_INSTRUCTIONS.ERROR_MESSAGES.TOO_LONG,
    })
    .optional()
    .nullable()
    .transform((val) => val?.trim() || null),
});

export type RoastSchema = z.infer<typeof roastSchema>;

// Additional schemas for API responses
export const roastResponseSchema = z.object({
  roast: z.string(),
  githubData: z.object({
    username: z.string(),
    name: z.string().nullable(),
    bio: z.string().nullable(),
    avatarUrl: z.string(),
    profileUrl: z.string(),
    publicRepos: z.number(),
    followers: z.number(),
    following: z.number(),
    accountAge: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    recentRepos: z.array(z.any()),
    languages: z.record(z.string(), z.number()),
    totalStars: z.number(),
    totalForks: z.number(),
    mostUsedLanguage: z.string().nullable(),
  }),
  disclaimer: z.string(),
  generatedAt: z.string(),
  model: z.string(),
  temperature: z.number(),
});

export type RoastResponseSchema = z.infer<typeof roastResponseSchema>;