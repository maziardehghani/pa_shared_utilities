import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export declare class CollectionInterceptor implements NestInterceptor {
    private meta;
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
    protected setMeta(newMeta: object): void;
    protected transformEntity: any;
}
