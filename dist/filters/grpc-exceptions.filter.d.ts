import { ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
export declare class GrpcExceptionFilter extends BaseRpcExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost): Observable<never>;
}
