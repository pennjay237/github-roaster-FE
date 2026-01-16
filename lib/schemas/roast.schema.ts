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

// Updated to match your backend response structure
export const roastResponseSchema = z.object({
  roast: z.string(),
  data: z.object({
    username: z.string(),
    name: z.string(),
    bio: z.string(),
    publicRepos: z.number(),
    followers: z.number(),
    following: z.number(),
    createdAt: z.string(),
    accountYears: z.number(),
    recentRepos: z.array(z.object({
      name: z.string(),
      description: z.string().nullable(),
      language: z.string().nullable(),
      stars: z.number(),
      forks: z.number(),
      updatedAt: z.string(),
    })),
    languages: z.record(z.string(), z.number()),
    totalStars: z.number(),
    totalForks: z.number(),
    mostUsedLanguage: z.string(),
    mostStarredRepo: z.string(),
    repoActivity: z.string(),
  }),
  metadata: z.object({
    generatedAt: z.string(),
    model: z.string(),
    temperature: z.number(),
    disclaimer: z.string(),
  }),
});

// Relaxed version for resilience
export const roastResponseSchemaRelaxed = z.object({
  roast: z.string(),
  data: z.object({
    username: z.string().optional().default('Unknown'),
    name: z.string().optional().default('Unknown'),
    bio: z.string().optional().default('No bio available'),
    publicRepos: z.number().optional().default(0),
    followers: z.number().optional().default(0),
    following: z.number().optional().default(0),
    accountYears: z.number().optional().default(0),
    mostUsedLanguage: z.string().optional().default('Unknown'),
    mostStarredRepo: z.string().optional().default('None'),
    repoActivity: z.string().optional().default('unknown'),
  }).optional(),
  metadata: z.object({
    generatedAt: z.string().optional().default(() => new Date().toISOString()),
    model: z.string().optional().default('mock-model'),
    temperature: z.number().optional().default(0.7),
    disclaimer: z.string().optional().default('This roast is AI-generated and intended for entertainment only.'),
  }).optional(),
}).transform((data) => {
  // Ensure we always have required structure
  return {
    roast: data.roast,
    data: data.data || {
      username: 'Unknown',
      name: 'Unknown',
      bio: 'No bio available',
      publicRepos: 0,
      followers: 0,
      following: 0,
      accountYears: 0,
      mostUsedLanguage: 'Unknown',
      mostStarredRepo: 'None',
      repoActivity: 'unknown',
    },
    metadata: data.metadata || {
      generatedAt: new Date().toISOString(),
      model: 'mock-model',
      temperature: 0.7,
      disclaimer: 'This roast is AI-generated and intended for entertainment only.',
    },
  };
});

export type RoastResponseSchema = z.infer<typeof roastResponseSchema>;
export type RoastResponseSchemaRelaxed = z.infer<typeof roastResponseSchemaRelaxed>;