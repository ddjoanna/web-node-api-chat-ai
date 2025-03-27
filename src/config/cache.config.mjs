import { LRUCache } from "lru-cache";

const cache = new LRUCache({
  max: 10000, // 设置缓存最大容量
  maxAge: 1000 * 60 * 10, // 缓存项过期时间为10分钟
});

export default cache;
