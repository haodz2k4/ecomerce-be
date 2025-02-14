import { CacheKeyEnum } from "src/constants/cache.constant"
import { format } from "util"


export const generateCacheKey = (key: CacheKeyEnum, ...args: string[]): string => {
    return format(key, ...args)
}