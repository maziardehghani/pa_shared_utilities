export interface RpcErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}
