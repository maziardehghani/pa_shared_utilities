import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { EntityNotFoundError } from 'typeorm';




@Catch(RpcException, EntityNotFoundError)
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
  
  catch(exception: RpcException | EntityNotFoundError, host: ArgumentsHost): Observable<never> {


    if (exception instanceof EntityNotFoundError) {
      return throwError(() => ({
        code: 5,
        details: 'Resource not found',
      }));
    }

    const error = exception.getError();


    if (typeof error === 'string') {
      return throwError(() => ({
        code: 3,
        details: error,
      }));
    }

    if (typeof error === 'object' && error !== null) {
      return throwError(() => ({
        code: (error as any).code ?? 3,
        details: JSON.stringify(error),
      }));
    }

    return throwError(() => ({
      code: 13,
      details: 'Internal server error',
    }));
  }
}
