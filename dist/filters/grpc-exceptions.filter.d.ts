import { ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { EntityNotFoundError } from 'typeorm';
export declare class GrpcExceptionFilter extends BaseRpcExceptionFilter {
    catch(exception: RpcException | EntityNotFoundError, host: ArgumentsHost): Observable<never>;
}
