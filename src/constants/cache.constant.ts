

export enum CacheKeyEnum {
    REFRESH_BLACKLIST = `auth:refresh-blacklist:%s`, //%s = sessionId
    FORGOT_PASSWORD = `auth:forgot-password:%s`, //%s = userId
}