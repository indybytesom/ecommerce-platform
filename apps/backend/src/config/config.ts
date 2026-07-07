import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(5000),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  JWT_ACCESS_SECRET: z.string().min(1, "JWT_ACCESS_SECRET is required"),

  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),

  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),

  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),

  CLOUDINARY_CLOUD_NAME: z.string().optional(),

  CLOUDINARY_API_KEY: z.string().optional(),

  CLOUDINARY_API_SECRET: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;
