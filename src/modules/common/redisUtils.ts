import Redis from "ioredis";

export const client = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  db: process.env.REDIS_CACHE_DB ? Number(process.env.REDIS_CACHE_DB) : 1,
});


