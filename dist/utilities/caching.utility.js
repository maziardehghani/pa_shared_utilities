"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyCodeService = void 0;
class VerifyCodeService {
    constructor(cacheManager, configService) {
        this.cacheManager = cacheManager;
        this.configService = configService;
        this.expireTime = 150;
    }
    generate() {
        const min = this.configService.get('MIN_OTP_DIGITS') ?? '10000';
        const max = this.configService.get('MAX_OTP_DIGITS') ?? '99999';
        return randomInt(parseInt(min), parseInt(max)).toString();
    }
    async store(mobile, code) {
        await this.cacheManager.set(`otp_${mobile}`, code, { ttl: this.expireTime });
    }
    async get(mobile) {
        return await this.cacheManager.get(`otp_${mobile}`);
    }
    async delete(mobile) {
        await this.cacheManager.del(`otp_${mobile}`);
    }
    async check(code, mobile) {
        if (await this.get(mobile) !== code)
            return false;
        await this.delete(mobile);
        return true;
    }
}
exports.VerifyCodeService = VerifyCodeService;
