import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class GrpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<never> {
    const error = exception.getError();

    if (typeof error === 'string') {
      return throwError(() => ({
        code: 3, // INVALID_ARGUMENT
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
