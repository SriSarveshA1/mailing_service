import Redis from "ioredis";

export const client = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  db: process.env.REDIS_CACHE_DB ? Number(process.env.REDIS_CACHE_DB) : 1,
});


export const setValueToCache = async (key: string, value: any) => {
  const cacheValue = JSON.stringify(value);
  let setCachedValue;
  setCachedValue = await client.set(key, cacheValue, "EX", Number(process.env.TOKEN_EXPIRY));

  return setCachedValue;
};

export const getValueFromCache = async (key: string) => {
  let cachedValue = await client.get(key);
  if (cachedValue) {
    cachedValue = JSON.parse(cachedValue);
    return cachedValue;
  }
  return cachedValue;
};

export const removeValueFromCache = async (key: []) => {
  const removedValue = await client.del(...key);
  return removedValue;
};
