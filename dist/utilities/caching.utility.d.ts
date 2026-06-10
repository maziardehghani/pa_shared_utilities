export declare class VerifyCodeService {
    private cacheManager;
    private readonly configService;
    constructor(cacheManager: Cache, configService: ConfigService);
    private expireTime;
    generate(): string;
    store(mobile: string, code: string): Promise<void>;
    get(mobile: string): Promise<string | null>;
    delete(mobile: string): Promise<void>;
    check(code: string, mobile: string): Promise<boolean>;
}
