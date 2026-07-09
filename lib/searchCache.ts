type CacheEntry = {
  timestamp: number;
  data: any;
};

const CACHE_TTL = 1000 * 60 * 2; // 2 minutes

const cache = new Map<string, CacheEntry>();

export function getCache(key: string) {
  const entry = cache.get(key);

  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_TTL;

  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCache(key: string, data: any) {
  cache.set(key, {
    timestamp: Date.now(),
    data,
  });
}

export function createCacheKey(params: Record<string, any>) {
  return JSON.stringify(params);
}